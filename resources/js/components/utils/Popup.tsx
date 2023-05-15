import React from "react";
// @ts-ignore
import ReactDOM from 'react-dom'
// @ts-ignore
import styled from "styled-components";
import Progress from "./Progress";

const Header = styled.div`
    box-shadow: inset 0 -1px #ebeef1;
    height: 45px;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Closable = styled.div`
    display: flex;
    margin-left: initial!important;
    gap: 7px;
    align-items: center;
    span{
        font-size: 14px;
        color: #797979;
    }
`

const Separator = styled.span`
    width: 1px;
    height: 10px;
    background-color: #797979;
`
const Esc = styled.span`
    padding: 3px 0;
`

const CloseButton = styled.div`
    display: flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    //background: #272727;
`

const LogoIdentity = styled.div`
    display: flex;
    width: 80px;
    img.school-logo {
        display: initial;
    }
`

let options = {
    class: '',
    bodyClass: '',
    containerClass: '',
    isSmall: false,
    isModal: false,
    modalFooter: false,
    style: {},
    closable: true,
    position: '',
    title: '',
    showHeader: true,
    loading: false,
    fullWidth: false
}

interface IProps {
    onPopupClose: any,
    parentId: string|number,
    closable?: boolean,
    title?: string,
    loading?: boolean,
    position?: string,
    popup?: any|null|Element,
    children?: React.ReactNode
    isSmall?: boolean,
    fullWidth?: boolean,
    escToClose?: boolean,
    isModal?: boolean,
    modalFooter?: undefined,
    options?: {
        position?: string,
        containerClass?: string,
        class?: string,
        loading?: boolean,
        title?: string,
        showHeader?: boolean,
        bodyClass?: string,
        closable?: boolean,
        style?: object,
        fullWidth?: boolean
    },
    container?: string,
    allowReRender?: boolean
}

class Popup extends React.Component<IProps> {
    private readonly id = this.props.parentId
    private _id = Math.random().toString(36).substring(7)
    private readonly options = options
    private readonly close
    private el: HTMLDivElement|React.ReactNode|any

    constructor(props: IProps) {
        super(props)
        this.id = "a" + this.props.parentId + "b"
        this.options = {...this.options, ...props.options}
        this.props.container ? this.createPortal(this.props.container)/*When a specific container is set*/ : this.createPortal()
        this.close = new CustomEvent('onPopupClose', {})
        this.props.title ? this.options.title = this.props.title : this.options.title
    }

    // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) { //IF SOMETHING GOES WRONG DELETE LINE
    //     this.el.className = `overlay-popup${this.props.isModal ? ' modal-popup' : ''} visible${((this.options.class) ? ' ' + this.options.class : '')}${((this.props.container ? ' inner-popup' : ''))}${((this.options.fullWidth || this.props.fullWidth) ? ' full-width': '')}`;
    // }

    createPortal = (container?: string) => {
        this.props.position ? this.options.position = this.props.position : this.options.position
        this.el = document.createElement("div")
        this.el.className = `overlay-popup${this.props.isModal ? ' modal-popup' : ''} visible${((this.options.class) ? ' ' + this.options.class : '')}${((container ? ' inner-popup' : ''))}${((this.options.fullWidth || this.props.fullWidth) ? ' full-width': '')}`;
        this.el.id = this.id
        //this.el.style.cssText = 'z-index: 1021'
        this.el.setAttribute('data-position', this.options.position ? this.options.position : '');
        this.el.setAttribute('tabindex', '0');


        if (container){
            // @ts-ignore
            document.querySelector(container).appendChild(this.el)
            return false
        }
        setTimeout(() => {
            document.body.appendChild(this.el)
            let id = this.id as string,
            _id = document.getElementById(id)
           if ((this.props.escToClose === undefined || this.props.escToClose) && _id) window.addEventListener('keyup', (event: any) => {
                if (event.keyCode === 27 || event.key === 'Escape' && _id) {
                    this.closePopup(event)
                    window.removeEventListener('keyup', () => {})
                }
            })
        }, 300)
    }

    componentDidMount() {
        document.body.className += ' overflow-hidden '
        if (this.props.popup) { // @ts-ignore
            if (document.getElementById(this.id.toString())) this.props.popup(document.getElementById(this.id.toString()).parentNode)
        }
    }

    // shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    //     return this.props.parentId !== nextProps.parentId || this.props.allowReRender
    // }

    componentWillUnmount() {
        if (document.getElementById(this.id.toString())) { // @ts-ignore
            document.querySelectorAll(`#${this.id.toString()}`).forEach((item: any, index: number) => {
                if (index !== document.querySelectorAll(`#${this.id.toString()}`).length-1) item.remove()
            })
        }
        const navBar = document.querySelector('.navbar.sticky-top')

        document.body.classList.remove('overflow-hidden')
    }

    render() {
        const isSmall = this.props.options?.containerClass === "slim-window"
        const op = (this.props.isSmall || this.props.isModal || isSmall) ? ' slim-window' : ''

        let styles = {}
        let children = [
            <div key={this._id}>
                <div className="backdrop" onClick={this.closePopup}></div>
                <div id={this._id} data-id={this.options.showHeader || (this.options.title && this.options.title !== '')} className={`overlay-container hidden-overflow${op}`}>
                    <>
                        {(this.options.showHeader || (this.options.title && this.options.title !== '')) && !this.options.fullWidth &&
                            <div style={{zIndex: '1'}} className={`overlay-header${!this.options.title || this.options.title === '' ? ' no-box-shadow' : ''} ${(!this.options.title && this.options.title === '') ? ' position-absolute right-0' : ''}`}>
                                {(!this.options.fullWidth && !this.props.fullWidth) && <span className="label-big-title" style={{fontWeight: '400'}}>
                                    {this.options.title}
                                </span>}
                                {((this.options.closable === true || this.props.closable === true) && (this.options.fullWidth !== true && this.props.fullWidth !== true)) &&
                                    <CloseButton className="overlay-close" onClick={this.closePopup}
                                          title="Close window">
                                        <svg
                                            className="card-close SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--cancel-svg Icon-color-svg Icon-color--gray-svg"
                                            height="12" width="12" viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 6.585l4.593-4.592a1 1 0 0 1 1.415 1.416L9.417 8l4.591 4.591a1 1 0 0 1-1.415 1.416L8 9.415l-4.592 4.592a1 1 0 0 1-1.416-1.416L6.584 8l-4.59-4.591a1 1 0 1 1 1.415-1.416z"></path>
                                        </svg>
                                    </CloseButton>
                                }
                            </div>
                        }
                        {/*{(this.options.fullWidth || this.props.fullWidth) && this.fullWidthHeader()}*/}
                        <div className={`overlay-body${this.options.bodyClass}`} style={{...styles}}>{this.props.children}</div>
                        {this.props.isModal && this.props.modalFooter &&
                            <div className="overlay-footer">{this.props.modalFooter}</div>
                        }
                    </>
                </div>
            </div>
        ]

        let loadingChildren = [
            <div className="overlay-body" onClick={this.closePopup} key={this._id}>
                <div className="backdrop"></div>
                {this.props.children ? this.props.children : <Progress/>}
            </div>
        ]

        return ReactDOM.createPortal(this.options.loading || this.props.loading ? loadingChildren : children, this.el)
    }

    fullWidthHeader = () => {
        return <>
            <Header className="popup-full-header">
                <Closable className="overlay-close" onClick={this.closePopup} title="Close window">
                    {this.props.escToClose === undefined || this.props.escToClose && <><Esc>Esc</Esc>
                        <Separator></Separator>
                    </>}
                    <svg
                        className="card-close SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--cancel-svg Icon-color-svg Icon-color--gray-svg"
                        height="12" width="12" viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 6.585l4.593-4.592a1 1 0 0 1 1.415 1.416L9.417 8l4.591 4.591a1 1 0 0 1-1.415 1.416L8 9.415l-4.592 4.592a1 1 0 0 1-1.416-1.416L6.584 8l-4.59-4.591a1 1 0 1 1 1.415-1.416z"></path>
                    </svg>
                </Closable>
            </Header>
        </>
    }

    closePopup = (event: any|Event) => {
        if (this.options.closable === false) return false
        if (this.props.closable === false) return false
        event.target.addEventListener('onPopupClose', (_event: Event) => {
            this.props.onPopupClose ? this.props.onPopupClose(_event) : false;
        })
        event.target.dispatchEvent(this.close);
        // @ts-ignore
        if (this.el) document.getElementById(this.id).parentNode.removeChild(this.el)
        document.body.classList.remove('overflow-hidden')
    }
}
export default Popup
