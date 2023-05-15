import React, {useEffect} from "react";
const scriptFile = document.createElement("script");
scriptFile .src = "/js/table-scripts.js";//your js file path

const ContextMenu = props => {
    useEffect(() => {
        document.body.appendChild(scriptFile)
    }, [])

    useEffect(() => {
        window.onclick = function(e){//Close menu when clicked outside
            if (!e.target.matches('.menu-target') && !e.target.matches('.dropdown-table')) {
                let dropdowns = document.querySelectorAll(".dropdown-table ul[aria-hidden=false], .other-table-context-menu, .menu-target ul[aria-hidden=false], .dropdown-table div[aria-hidden=false]");
                let i;
                dropdowns.forEach(function (el) {
                    if (el.getAttribute('aria-hidden') === 'false') {
                        el.setAttribute('aria-hidden', 'true');
                    }
                })
            }
        };
    }, [])

    return (
        <>
            <div className="context-menu inline-target" onMouseEnter={showTableInlineMenu} onMouseLeave={hideTableInlineMenu}>
                <ul>
                    {props.items.map((item, key) =>
                        item.shortcut && <li key={`ctx-${key}-short`}>{item.item}</li>
                    )}
                    <li className="more-menu-trigger">
                        <button type="button" key={`default--more`} onClick={showTableContextMenu} className="context-submenu-trigger">
                            <i className="mdi mdi-dots-horizontal"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div aria-hidden="true" className="other-table-context-menu">
                <div className="ContextualPopover-arrow"></div>
                {props.items.map((item, key) =>
                    !item.divider
                        ? <div className="list" key={`non_short-${key}`}><span>{item.item}</span></div>
                        : <div key={`non_short-${key}`} className="divider"></div>
                )}
            </div>
        </>
    )
}
const hideTableInlineMenu = (event) => {
    event.currentTarget.classList.remove('hovered');
    event.currentTarget.classList.remove('single');
}
const showTableInlineMenu = (event) => {
    const li = event.currentTarget.querySelectorAll('li').length;
    event.currentTarget.className += (' hovered' + (li === 1 ? ' single' : ''));
}
const showTableContextMenu = (event) => {
    const currentEl = event.currentTarget, ulMenu = currentEl.parentNode.parentNode.parentNode.parentNode.querySelector('.other-table-context-menu')
    if (!event.currentTarget.matches('.context-submenu-trigger')) return

    const w_size = {w: window.innerWidth, h: (window.innerHeight)}, tableContextMenu = document.querySelectorAll('.table-menu .other-table-context-menu')
    ulMenu.querySelectorAll('li').forEach(function (el) {
        el.classList.remove('topMenu')
        el.className += ' bottomMenu'
    })

    setTimeout(function () {
        const currentElBound = currentEl.getBoundingClientRect()
        ulMenu.setAttribute('aria-hidden', 'false')
        const mPositionHeight = (ulMenu.offsetHeight + 40) + currentElBound.top;
        if (mPositionHeight >= w_size.h){
            ulMenu.className += ' topMenu'
            ulMenu.style.bottom = currentElBound.height + 20 + 'px'
        }else{
            ulMenu.className += ' bottomMenu'
            ulMenu.style.top = currentElBound.height + 20 + 'px'
        }
    }, 50)
}
export default ContextMenu
