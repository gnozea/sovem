import React, {Fragment} from "react";
import styled from "styled-components";
import {CheckBox, CheckBoxHead} from "./Checkbox";
const borderColor = '#d0d4e4',
    indicatorColor = 'rgb(87, 155, 252)',
    indicatorLastColor = 'rgba(87, 155, 252, .63)',
    indicatorLastAfterColor = 'rgb(150 192 254)'
const TreeWrapper = styled.div`
    position: relative;
    .treeItemLast {
       border-top: none!important;
    }
    &:before {
        content: '';
        background: ${indicatorColor};
        position: absolute;
        width: 1px;
        height: 00%;
        top: 4px;
        left: 3px;
    }
`

const Header = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
`
const Row = styled.div`
    display: flex;
    border-left: none;
    height: 36px;
    user-select: none;
    &:first-of-type{
        flex: 1 1 auto;
        max-width: unset;
    }
`
const Column = styled.div`
    display: flex;
    flex-basis: 400px;
    overflow: hidden;
    width: 400px;
    justify-content: center;
    transition: .3s ease;
    align-items: center;
    border-right: 1px solid ${borderColor};
    &:focus{
        background-color: rgba(204, 229, 255, .97);
    }
    &:last-of-type {
        flex: 1 1 auto;
        max-width: unset;
    }
`

const ItemsRow = styled(Row)`
    border-top: 1px solid ${borderColor}!important;
    border-bottom: 1px solid ${borderColor}!important;
    transition: .3s ease;
    &:hover{
        box-shadow: 4px 6px 15px -8px #c3c6d4;
        background: #F5F6F8;
    }
`

const ExtraItemsRow = styled(Row)`
    border-top: 1px solid ${borderColor}!important;
    transition: .3s ease;
    &:hover{
        box-shadow: 4px 6px 15px -8px #c3c6d4;
        background: #F5F6F8;
    }
`
const SubItemColumnHeader = styled(Column)`
    border-bottom: none;
    cursor: default;
`
const ItemColumn = styled(Column)`
    cursor: pointer;
`
const ItemColumSubItems = styled(Column)`
    border-bottom: none;
`
const HeaderMain = styled(Header)`
    border-top-left-radius: 6px;
    overflow: hidden;
`
const RowMain = styled(Row)`
    border-top: 1px solid ${borderColor}!important;
`
const SubItemsRow = styled(Row)`
    border-top: 1px solid ${borderColor}!important;
    border-bottom: 1px solid ${borderColor}!important;
    transition: .3s ease;
    &:hover{
        box-shadow: 4px 6px 15px -8px #c3c6d4;
        background: #F5F6F8;
    }
`

const HeaderMainSubItem = styled(Header)`
    border-top-left-radius: 6px;
    overflow: hidden;
    div:not(.indicator):hover{
        box-shadow: none!important;
        background: transparent!important;
    }
`
const HeaderExtra = styled(Header)`
    width: 100%;
    border-bottom-left-radius: 6px;
    // overflow: hidden;
`
const SubItem = styled.div`
    margin: 20px 0 20px 30px;
    div {transition: .2s cubic-bezier(0, 1.02, 0.42, 0.37);}
    position: relative;
    &.groupSiblingHidden{
        display: none;
    }
    & div:not(:first-of-type):before{
        content: '';
        position: absolute;
        width: 27px;
        height: 1px;
        background: ${indicatorColor};
        top: 49%;
        left: -27px;
        z-index: 1;
    }
    > div:first-of-type:after{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: ${borderColor};
        top: 0;
        left: 0;
        z-index: -1;
    }
`

const LeftIndicator = styled.div`
    background-color: ${indicatorColor};
    color: rgb(87, 155, 252);
    flex: 0 0 6px;
    margin: 0 !important;
    top: -1px;
    height: 106%;
    transition: flex-basis .1s ease-in;
    position: relative;
    &:hover{
        background: ${indicatorColor};
    }
`
const header = [
    {
        text: 'Code',
        style: { flexBasis: "100px", width: "100px", justifyContent: "start", paddingLeft: "10px" },
        class: "",
    },
    {
        text: 'Name',
        style: { flexBasis: "100px", width: "100px", paddingLeft: "10px" },
        class: "",
    },
]
const testItems = [
    [
        {
            text: <>2012-1161</>,
            style: { flexBasis: "100px", width: "100px", justifyContent: "start", paddingLeft: "10px" },
            class: "",
            sub: {
                head: <span>Sub head 1</span>,
                text: <>Sub item 1</>,
                //style: { flexBasis: "200px", width: "200px", justifyContent: "start", paddingLeft: "10px" }

            }
        },
        {
            text: <>Hugues Ebert Mertilus</>,
            class: "",
            style: {  },
            sub: {
                head: <span>Sub head 2</span>,
                text: <span>Sub item 2</span>
            },
        },
        {
            style: {  },
            text: "Year one",
            class: "",
            sub: {
                head: <span>Sub head 3</span>,
                text: <span>Sub Item 3</span>
            },
        }
    ],
    [
        {
            text: <>2012-1161</>,
            style: { flexBasis: "100px", width: "100px", justifyContent: "start", paddingLeft: "10px" },
            class: "",
            sub: {
                head: <span>Sub head 1</span>,
                text: <>Sub item 1</>,
                //style: { flexBasis: "200px", width: "200px", justifyContent: "start", paddingLeft: "10px" }

            }
        },
        {
            text: <>Hugues Ebert Mertilus</>,
            class: "",
            style: {  },
            sub: {
                head: <span>Sub head 2</span>,
                text: <span>Sub item 2</span>
            },
        },
        {
            style: {  },
            text: "Year one",
            class: "",
            sub: {
                head: <span>Sub head 3</span>,
                text: <span>Sub Item 3</span>
            }
        }
    ]
]
const caret = <svg viewBox="0 0 20 20" fill="currentColor" style={{pointerEvents: "none"}} width="16" height="16" role="button" tabIndex={0} aria-hidden="false" className="">
    <path d="M12.5303 9.46967L12 10L12.5303 10.5303C12.8232 10.2374 12.8232 9.76256 12.5303 9.46967ZM10.9393 10L7.46967 13.4697C7.17678 13.7626 7.17678 14.2374 7.46967 14.5303C7.76256 14.8232 8.23744 14.8232 8.53033 14.5303L12.5303 10.5303L12 10L12.5303 9.46967L8.53033 5.46967C8.23744 5.17678 7.76256 5.17678 7.46967 5.46967C7.17678 5.76256 7.17678 6.23744 7.46967 6.53033L10.9393 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

const Caret = styled.div`
    &.rotate-90 svg {
        transform: rotate(90deg);
    }
    svg{
        transform-origin: center center;
        transform: rotate(0);
        transition: transform .2s;
        width: 22px;
        height: 22px;
        font-size: 16px;
        outline: none;
        position: relative;
    }
`

type IProps = {
    head: {
        text: string,
        style: object,
        class?: string,
    }[],
    data: any | [{
        text: any,
        style?: {},
        class?: string
        sub?: {
            head: any,
            text: any,
            style?: {},
            class: string
        },
        onCheckAll?: any,
        onCheck?: any
    }][],
    rowNumber?: boolean,
    checkbox?: boolean,
    canAdd?: boolean
}

interface IState {

}

class TreeTable extends React.Component<IProps, IState> {
    private caret: any[] = [];
    constructor(props: IProps) {
        super(props);
    }


    setTCaretRef = (element: any, index: number) => {
        this.caret[index] = element;
    };

    render() {
        if (!testItems) return <h3>No data has been found.</h3>
        return <TreeWrapper className="--treetable-master">
            {this.createHeader(this.props.head ? this.props.head : header)}
            {!this.props.data && testItems.map((items: any, key: number) => this.createItems(key, items))}
            {this.props.data && this.props.data.map((items: any, key: number) => this.createItems(key, items))}
            {this.props.canAdd && this.extraRow()}
        </TreeWrapper>
    }

    createHeader = (items: {}[] = null) => {
        return <HeaderMain className="sticky-top">
            <RowMain>
                <LeftIndicator className="head-indicator"></LeftIndicator>
                {this.props.checkbox && <Column style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                    <CheckBoxHead title={false} onSelectAll={(e: any) => console.log(e)} checked={false}/>
                </Column>}
                {this.props.rowNumber && <Column style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                        <span>#</span>
                </Column>}
                {items.map((item: any, key: number) => <Column style={{...item.style, paddingLeft: key === 0 ? '15px' : ''}} className={item.class} key={key}>{item.text}</Column>)}
            </RowMain>
        </HeaderMain>
    }

    createItems = (index: number, items: {}[] = null) => {
        return <Fragment key={index}>
            <Header className="treeItem">
                <ItemsRow className={items.length-1 === index+1 ? 'treeItemLast' : ''}>
                    <LeftIndicator className="indicator"></LeftIndicator>
                    {this.props.checkbox && <Column style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                        <CheckBox title={false} onSelectAll={(e: any) => console.log(e)} defaultChecked={false}/>
                    </Column>}
                    {this.props.rowNumber && <Column style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                        <span>{index+1}</span>
                    </Column>}
                    {items.map((item: any, key: number) => {
                        return <ItemColumn style={item.style ? item.style : ''} className={item.class} key={key}>
                            {items && items[0] && items[0]['sub'] && key === 0 && <Caret onClick={(e: any) => this.handleShowSubItemsClick(e, index)}>{caret}</Caret> }
                            { item.text}
                        </ItemColumn>
                    })}
                </ItemsRow>
            </Header>
            {items && items[0] && items[0]['sub'] && this.createSubItems(index, items)}
        </Fragment>
    }

    createSubItems = (index: number, items: {}[] = null) => {
        return <>
            {items && items[0] && items[0]['sub'] && <SubItem className="groupSiblingHidden subItem" ref={(e: any) => this.setTCaretRef(e, index)}>
                <HeaderMainSubItem>
                    <SubItemsRow>
                        <LeftIndicator className="indicator" style={{borderTopLeftRadius: '6px'}}></LeftIndicator>
                        <SubItemColumnHeader style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                        {this.props.checkbox && <CheckBox title={false} onSelectAll={(e: any) => console.log(e)} defaultChecked={false}/>}
                        </SubItemColumnHeader>
                        {items && items.map((item: any, key: number) => {
                            return <ItemColumSubItems style={item.sub ? item.sub?.style : item.style} className={item.class} key={key}>
                                {item.sub.head}
                            </ItemColumSubItems>
                        })}
                    </SubItemsRow>
                </HeaderMainSubItem>
                {this.props.canAdd && this.extraRow()}
            </SubItem>}
        </>
    }

    handleShowSubItemsClick = (e: any, index: number) => {
        const papa = e.target.parentElement.parentElement.parentElement.parentElement,
            brother = e.target.parentElement.parentElement

        e.target.classList.toggle('rotate-90')
        this.caret[index].classList.toggle('groupSiblingHidden')
        papa.classList.toggle('groupSiblingHiddenParent')

    }

    extraRow = () => {
        return <HeaderExtra>
            <ExtraItemsRow>
                <LeftIndicator style={{background: indicatorLastColor, borderBottomLeftRadius: '6px'}}></LeftIndicator>
                {this.props.checkbox && <Column style={{width: '30px', flexBasis: '30px', justifyContent: 'center'}}>
                    <CheckBox title={false} disabled={true} onSelectAll={(e: any) => console.log(e)} defaultChecked={false}/>
                </Column>}
                <ItemColumn style={{}} className=""></ItemColumn>
            </ExtraItemsRow>
        </HeaderExtra>
    }

    componentDidMount() {

    }

}

export default TreeTable
