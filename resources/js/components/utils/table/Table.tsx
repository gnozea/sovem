import React, {Component} from "react";
import {CheckBox, CheckBoxHead} from "./Checkbox";
import ContextMenu from "./ContextMenu";
import { motion } from "framer-motion";
import TableFilter from "./TableFilter";
import {Link} from "react-router-dom";

let options = { //Would remove them but a lot of other components are using them
    hasLink: false,
    contextMenu: false
}

interface IState {
    allChecked: boolean,
    body: any,
    checked: object
}

interface IProps {
    children?: {
        body: React.ReactNode
    },
    title: string,
    head: ({title: string, class?: string}|string) [],
    body: any[],
    checkbox: boolean,
    showRowNumber?: boolean,
    handleChecked?: any,
    options?: {},
    tableButtons?: any[],
    onSelect?: any,
    onRowClick?: any,
    hasLink?: boolean,
    contextMenu?: boolean,
    onSelectAll?: any,
    filters?: {title: string, filterTitle: any, value: React.ReactNode}[],
    onApplyFilter?: any,
    selectedFilters?: any,
    onClearFilters?: any
}

/**
 * To create a table body, send body as
 * head = ['First name', {title: 'Last name', class: 'td_class'}]
 * body = [{title: 'Hugues Ebert', class: 'td_class', link: URL}, "I'm valid too", {title: 'Mertilus', class: 'td_class'}, {class: 'td_class', contextMenu: [ {item: <div>Ipsum</div>, shortcut: true}, ... ] } ]
 * filters = [
 * {title: 'Hello', value: '<div>Hello world</div>'}
 * ]
 */
class Table extends Component<IProps, IState> {
    private ref = React.createRef<any|HTMLElement>()
    constructor(props: IProps) {
        super(props);
        options = {...options, ...this.props.options}
        this.state = {
            allChecked: false,
            body: null,
            checked: {}
        }
    }

    render() {
        return (
            <motion.div initial={{ x: 5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -5, opacity: 0 }}>
                <>
                {this.props.title &&
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="dataset-title mb-3">
                                <span>{this.props.title}</span>
                            </div>
                            <div>
                                {this.props.tableButtons && this.props.tableButtons.length > 0 && this.props.tableButtons}
                            </div>
                        </div>
                        {this.props.filters && this.props.filters[0] !== undefined && <TableFilter onClearFilters={this.props.onClearFilters} selectedFilters={this.props.selectedFilters} onApplyFilter={(e: any) => this.props.onApplyFilter(e)}>
                            {this.props.filters}
                        </TableFilter>}
                    </>
                }
                <div className={`table ${(options.hasLink || this.props.hasLink) ? '--hasLink' : ''}`}>
                    <div className="table-head">{/*TABLE HEAD STARTS HERE*/}
                        <div className="table-row">
                            {this.props.checkbox && <div className="table-data table-checkbox">
                                    <CheckBoxHead onSelectAll={this.handleCheckAll} checked={this.state.allChecked} handleCheckAll={this.handleCheckAll}/>
                                </div>
                            }
                            {this.props.showRowNumber && <div className="table-data table-checkbox">#</div>}
                            {this.props.head.map((h, i) => {
                                const title = (typeof h === 'object') ? (h.title ? h.title : '') : h,
                                    _class = (typeof h === 'object') ? (h.class ? h.class : '') : h
                                return <div key={`thd--${i}-`} className={`table-data ${_class}`}>{title}</div>
                            })}
                            { (options.contextMenu || this.props.contextMenu) && <div className="table-data ctx"></div> }
                        </div>
                    </div>{/*TABLE HEAD ENDS HERE*/}
                    <div className="table-body" ref={this.ref}>{/*TABLE BODY STARTS HERE*/}
                        {this.props.body.map((items: any, rows, arr) => {
                            const isChecked: boolean = !!(typeof this.state.checked[rows] === 'object' && this.state.checked[rows].checked)
                            return <div onClick={this.handleRowClick} className={`table-row${isChecked ? " TableItem--selected" : ""}`} key={`trh--${rows}-`}>
                                {this.props.checkbox &&
                                    <div className="table-data table-checkbox" key={`chk--${rows}--`}>{/*TABLE CHECKBOXES STARTS HERE*/}
                                        <CheckBox
                                            forTable={true}
                                            disabled={this.state.checked[rows]?.disabled}
                                            checked={isChecked}
                                            onSelect={this.handleCheckFieldElement} key={`chk--${rows}-`} id={`chk--${rows}-`} {...items}/>
                                    </div>
                                }
                                {this.props.showRowNumber && <div className="table-data table-checkbox" key={`chk--${rows}--`}>{rows+1}</div>}
                                {items.map((item: any, row: number) => {
                                    if (item.contextMenu) {
                                        if((!options.contextMenu || !this.props.contextMenu) && !item.contextMenu.length) return <React.Fragment key={row}></React.Fragment>
                                        return <div key={`tdb--${row}-`} className={`table-data ${item.class ? item.class : ''} table--td--width--40 table-menu`}>
                                            <ContextMenu items={item.contextMenu} key={`ckh---${row++}-`}/>
                                        </div>
                                    }else{
                                        return <div key={`tdb--${row}-`} className={`table-data ${item.class ? item.class : ''}`}>
                                        {item.title
                                            ? (((this.props.hasLink || options.hasLink) && item.link) ? <Link to={item.link}>{item.title}</Link> : item.title)
                                            : item
                                        }
                                        </div>
                                    }
                                })}
                            </div>
                        })}
                    </div>{/*TABLE BODY ENDS HERE*/}
                </div>
            </>
            </motion.div>
        );
    }

    handleRowClick = (event: any) => {
        const index = Array.prototype.indexOf.call(event.currentTarget.parentElement.children, event.currentTarget)
        if (typeof this.props.onRowClick === 'function') this.props.onRowClick(index)
    }

    handleChecked = (event: any) => {

    }

    handleCheckAll = (event: any) => {
        let checked = this.state.checked

        Object.values(this.state.checked).map((item: any, index: number) => {
            const disabled = this.ref.current.querySelectorAll('input.inp-cbx')[index].disabled
            checked = { ...checked, [index]: {index: index, checked: event.target.checked, disabled: disabled} }
        });
        let _checked: {}[] = [],
            onlyChecked: {}[] = []

        Object.values(checked).map((element, key) => { //Remove unchecked items
            if (element['checked']) _checked = [..._checked, element]
            if (element.checked) onlyChecked.push(element)
        })

        this.setState({
            allChecked: event.target.checked
        })

        this.setState(prevState => {
            return {...prevState, checked: checked}
        })

        if (typeof this.props.onSelectAll === 'function') this.props.onSelectAll({
            allChecked: event.target.checked,
            checked: onlyChecked
        })//Send checked elements back to parent via its callback
    };

    handleCheckFieldElement = (event: any) => {
        const index = Array.prototype.indexOf.call(event.target.parentElement.parentElement.parentElement.parentElement.children, event.target.parentElement.parentElement.parentElement)

        const checked = { ...this.state.checked, [index]: { index: index, checked: event.target.checked } }

        let onlyChecked: {}[] = []

        let allChecked = true
        Object.values(checked).map((item: any) => {
            allChecked = allChecked && item.checked
            if (item.checked) onlyChecked.push(item)
        })

        this.setState({
            allChecked: allChecked,
            checked: checked
        })
        if (typeof this.props.onSelect === 'function') this.props.onSelect(onlyChecked)//Send checked elements back to parent via its callback
    };

    componentDidMount() {
        let _checked = {}
        this.props.body.forEach((item, index) => {
            _checked = {..._checked, [index]: {index: index, checked: false}}
        })
        this.setState({
            checked: _checked
        })
    }
}
export default Table;
