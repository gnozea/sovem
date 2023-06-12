import React, {createRef, useEffect, useRef} from "react";
import '/js/select2/dist/css/select2.min.css'
const $ = require('jquery')

type dataType = {
    text: string,
    id: string|number
}

type IProps = {
    name?: string,
    selectedValue?: []|string,
    //defaultSelected?: []|string,
    id?: string,
    placeholder?: string
    allowClear?: boolean,
    disabled?: boolean,
    dropdownAutoWidth?: boolean,
    multiple?: boolean,
    tags?: boolean|{}[],
    searchable?: true|false,
    minimumResultsForSearch?: number,
    dropdownParent?: any,
    templateResult?: any,
    templateSelection?: any,
    matcher?: any,
    classes?: string,
    onSearch?: any,
    searchKeys?: {
        id: string,
        text: string|[arg: string, ...args: string[]],
        moreQueryParams?: any
    }
    searchUrl?: string,
    closeOnSelect?: boolean,
    data?: { text?: string, id?: string|number }[],
    onSelect: any,
    onOpening?: any,
    required?: boolean,
    children?: React.ReactNode
}

interface IState {
    data: any,
    options: object|any
}

require('/js/select2/dist/js/select2')

class Select2 extends React.Component<IProps, IState> {
    private ref = createRef<any>()
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: props.data,
            options: {}
        }
    }

    componentDidMount() {
        let __cache: any = [],
            __lastQuery: any = null
        if (this.props.searchable === false) this.setState((prevState: IState) => {
            const options = { ...prevState.options, minimumResultsForSearch: -1 }
            return {options}
        })
        if (!this.props.minimumResultsForSearch === false) this.setState((prevState: IState) => {
            const options = { ...prevState.options, minimumResultsForSearch: 10 }
            return {options}
        })//options = { ...options, minimumResultsForSearch: 10 }
        if (this.props.templateResult) this.setState((prevState: IState) => {
            const options = { ...prevState.options, templateResult: this.props.templateResult }
            return {options}
        })//options = { ...options, templateResult: this.props.templateResult }
        if (this.props.dropdownParent) this.setState((prevState: IState) => {
            const options = { ...prevState.options, dropdownParent: this.props.dropdownParent }
            return {options}
        })//options = { ...options, dropdownParent: this.props.dropdownParent }

        if (typeof this.props.onSearch === 'function') {
            const _this = this
            this.setState((prevState: IState) => {
                const options = { ...prevState.options, ajax: {
                        url: this.props.searchUrl,
                        delay: 700,
                        data: ((params: any) => {
                            let query: any = {q: params.term}
                            if (this.props.searchKeys.moreQueryParams){
                                for (let q in this.props.searchKeys.moreQueryParams){
                                    query[q] = this.props.searchKeys.moreQueryParams[q]
                                }
                            }
                            return query
                        }),
                        cache: true,
                        //cache results
                        transport: (params: any, success: any, failure: any) => {
                            //retrieve the cached key or default to _ALL_
                            let __cacheKey = params.data.q || '_ALL_';
                            if (__lastQuery !== __cacheKey) {
                                //remove caches not from last query
                                __cache = [];
                            }
                            __lastQuery = __cacheKey;
                            if ('undefined' !== typeof __cache[__cacheKey]) {
                                if('undefined' !== typeof params.data.search){
                                    // @ts-ignore
                                    success(_this.matchCustom(params, __cache[__cacheKey]));
                                    return;
                                }
                                //display the cached results
                                success(__cache[__cacheKey]);
                                return; /* noop */
                            }
                            let $request = $.ajax(params);
                            $request.then(function(data: any) {
                                //store data in cache
                                __cache[__cacheKey] = data;
                                //display the results
                                success(__cache[__cacheKey]);
                            });
                            $request.fail(failure);
                            return $request;
                        },
                        processResults: (data: any) => {
                            this.setState({ data: data.data })
                            let temp: any[] = this.handleAjax(data)
                            return {
                                results: temp
                            }
                        }
                    },
                    minimumInputLength: 1,
                    placeholder: this.props.placeholder
                }
                return {options}
            }, this.initSelect)
        }else {
            this.initSelect()
        }
    }
    initSelect = () => {
        $(this.ref.current).select2(this.state.options).on('select2:open', (e: any) => {
            const input = document.querySelector(`[aria-controls="select2-${e.target.id}-results"]`) as HTMLElement | null
            input.focus();
        })
        $(this.ref.current).select2(this.state.options).on('select2:select', (event: any) => {
            // if (typeof this.props.onSearch === 'function') return self.props.onSelect(event.params.data)
            let index = Array.prototype.indexOf.call(event.params.originalEvent.currentTarget.parentElement.children, event.params.originalEvent.currentTarget)
            if (typeof this.props.onSelect === 'function') this.props.onSelect({ ...this.state.data[index], ...event.params.data });
        })

        $(this.ref.current).select2(this.state.options).on('select2:opening', (event: any) => { //Creating the placeholder
            const input = document.querySelector(`[aria-controls="select2-${event.target.id}-results"]`) as HTMLElement | null,
                string = event.target.getAttribute('data-select2-id').replace('-data', ''),
                input2 = document.querySelector(`[aria-controls="${string}-results"]`) as HTMLElement | null
            if (input) input.setAttribute('placeholder', this.props.placeholder ? this.props.placeholder : 'Type text here')
            if (input2) input2.setAttribute('placeholder', this.props.placeholder ? this.props.placeholder : 'Type text here')
            if (this.props.onOpening && typeof this.props.onOpening === 'function')this.props.onOpening()
        })
    }

    renderOptions = (option_items: any) => {
        if (this.props.children) return this.props.children
        if(option_items) {
            return Object.values(option_items).map((item: any, key) => {
                return <option key={key} disabled={item?.disabled} value={item?.id}>{item?.text}</option>
            })
        }
    }

    componentDidUpdate(prevProps: IProps) {

        if(prevProps.searchUrl !== this.props.searchUrl) this.setState((prevState) => {
            const options = {...prevState.options}
            options.ajax.url = this.props.searchUrl
            options.url = this.props.searchUrl
            return {options}
        }, () => $(this.ref.current).select2(this.state.options))

        $(this.ref.current).trigger("change")

    }

    render() {
        return <select required={this.props.required} onChange={() => {}}
                       className={`js-select ${this.props.classes}`} id={this.props.id}
                       data-placeholder={this.props.placeholder} multiple={this.props.multiple} name={this.props.name}
                       value={this.props.selectedValue ? this.props.selectedValue : undefined}
                       disabled={this.props.disabled} ref={this.ref}>
            {this.props.placeholder && <option></option>}
            {this.props.data && this.renderOptions(this.props.data)}
        </select>
    }

    handleAjax = (data: any): any[] => {
        let temp: any[] = []
        data.data.forEach((item: any) => {
            temp.push({
                text: typeof this.props.searchKeys.text === 'string' ? item[this.props.searchKeys.text] : this.getString(item),
                id: item[this.props.searchKeys.id]
            })
        })
        return temp
    }

    getString = (item: any): string => {
        let concat: any = []
        if (typeof this.props.searchKeys.text !== "string") {
            // @ts-ignore
            this.props.searchKeys.text.forEach((key: any) => {
                let title: any[] = []
                const keys = key.split('.')
                keys.length > 1 && keys.forEach((_item: any, index: number) => {
                    if (item[_item] !== undefined && !title.length) title = {...item[_item]}

                    if (index+1 === keys.length) concat = [ ...concat, title[_item] ]
                })
                if (item[key] && keys.length === 1) concat.push(item[key])
            })

            // this.props.searchKeys.text.forEach((_item) => {
            //     if (item[_item]) concat.push(item[_item])
            // })
        }
        return concat.join(' ')
    }

    matchCustom = (params: any, data: any) => {
        if ($.trim(params.data.search) === '') {
            return data;
        }
        // Do not display the item if there is no 'text' property
        if (typeof params.data.search === 'undefined') {
            return null;
        }
        let searching = $.map(data.data, function (obj: any) {
            let index = obj.descripcion.indexOf(params.data.search.toUpperCase())//change for you item obj.description
            if(index >= 0) {
                return obj;
            }
        });

        if (typeof searching[0] === 'undefined') {
            searching[0]='';
        }
        return {data:[searching[0]],page:1};
    }
}

export default Select2
