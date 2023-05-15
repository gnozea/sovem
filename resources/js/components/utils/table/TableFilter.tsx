import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import {createPopper, offset} from "@popperjs/core";

const Tab = styled.div`
    display: flex;
    margin: 5px auto 20px auto;
    justify-content: space-between;
    align-items: baseline;
    position: relative;
`
const ContextMenu = styled.div`
    width: 270px;
    padding-left: 12px!important;
    padding-right: 12px!important;
    padding-bottom: 15px!important;
    position: absolute;
    top: 35px;
    input, select, .select2.select2-container .select2-selection, .select2.select2-container{
        // height: 24px!important;
        font-size: 15px;
    }
    // .select2-container .select2-selection--single .select2-selection__rendered{
    //     margin: -10px 0!important;
    // }
    // .select2-container--default .select2-selection--single .select2-selection__arrow{
    //     bottom: -4px!important;
    // }
    .select2.select2-container .select2-selection{
        // padding: 8px 0 15px 0!important;
        font-size: 15px;
    }
`
const applied = 'faf--' + Math.random().toString(36).substring(7)
const Filter = styled.div`
    text-decoration: none;
    display: flex;
    font-size: 13px;
    margin: 0 5px;
    color: #6a7383;
    font-weight: 600;
    background: transparent;
    user-select: none;
    position: relative;
    &.${applied}:not(.clearance) {
        border-style: solid;
        background: #f6f8fa;
    }
    &.clearance button {
        border: none;
        &:hover{
            background: #f6f8fa;
            color: #6a7383;
        }
    }
`
const ActionButton = styled.button`
    cursor: pointer;
    column-gap: 6px;
    height: 25px;
    overflow: hidden;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    outline: none;
    border: none;
    color: #4f5153;
    border: 1px dashed #c0c8d2;
    border-radius: 5px;
    transition: .3s ease;
    &:disabled{
        color: #c0c2c6!important;
        cursor: default;
        svg{
            fill: #c0c2c6;
        }
        &:hover{
            background: transparent!important;
        }
    }
    &:hover {
        background: #f6f8fa;
        color: #6a7383;
    }
    span {
        padding-right: 2px;
        font-weight: 600;
    }
    svg {
        fill: #4f5153;
        height: 12px;
        width: 12px;
    }
`

const Title = styled.span`
    color: #4A92B6;
`

const Separator = styled.span`
    background-color: #c0c8d2;
    height: 12px;
    width: 1px;
    padding: 0!important;
`

const SingleClear = styled.span`
    cursor: pointer;
    &:hover svg{
        fill: #f44336;
    }
`

interface IProps {
    filterUrl?: string,
    ajax?: boolean,
    children: {title: string, value: React.ReactNode}[],
    onApplyFilter: any,
    selectedFilters?: any,
    onClearFilters?: any
}


const TableFilter: React.FunctionComponent<IProps> = (props) => {
    const [showPortal, setShowPortal] = useState<boolean>(false)
    const [portalData, setPortalData] = useState<any>(undefined)
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [selectedFilters, setSelectedFilters] = useState({})
    const [arrowElement, setArrowElement] = useState(null);

    let popper: any = undefined

    const triggerRef = React.createRef<any>();
    const popupRef = React.createRef<any>();


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPortal(false)
                //if(popper) popper.destroy();
            }
        }
        if (popupRef.current) document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ popupRef ])

    const createPortal = (data: any, e: any) => {
        e.stopPropagation()
        setPortalData({...data})
        setShowPortal(true)
        setReferenceElement(e.currentTarget.parentElement.parentElement)
        popper = createPopper(
            triggerRef.current,
            popupRef.current,
            {
                placement: 'top',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 20]
                        }
                    },
                    { name: 'arrow', options: { element: arrowElement } },
                ],
            }
        )
    }

    useEffect(() => {
        setSelectedFilters( props.selectedFilters );
    }, [props.selectedFilters])

    const handleClearFilter = () => {
        setSelectedFilters( {} );
        if (props.onClearFilters && typeof props.onClearFilters === 'function') props.onClearFilters(true)
    }

    const singleClear = (e: any, index: any) => {
        e.stopPropagation();
        //console.log(selectedFilters, index);
    }

    return <>
        <Tab className="table-filters-buttons">
            <div className="flex filter-button-group position-relative" style={{padding: "10px 0"}}>
                {props.children.map((filter: any, index: number) =>
                    <Filter key={index}>
                        <div>
                            <ActionButton style={{borderStyle: filter.filter ? 'solid' : 'dashed'}} ref={triggerRef} onClick={(e) => createPortal(filter, e)}>
                                {!filter.filter && <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"
                                     role="presentation">
                                    <path fillRule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 7H4a1 1 0 1 0 0 2h3v3a1 1 0 0 0 2 0V9h3a1 1 0 0 0 0-2H9V4a1 1 0 1 0-2 0z"></path>
                                </svg>}
                                {filter.filter && <SingleClear onClick={(e: any) => singleClear(e, index)}>
                                    <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" role="presentation">
                                        <path fillRule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1.414-8l2.293 2.293a1 1 0 0 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 1.414-1.414L8 6.586l2.293-2.293a1 1 0 0 1 1.414 1.414z"></path>
                                    </svg>
                                </SingleClear>}
                                <span>{filter.title}</span>{filter.filter ? <><Separator/> <Title>{filter.filter}</Title></> : ''}
                            </ActionButton>
                        </div>
                    </Filter>
                    )
                }
            </div>
            <Filter className="clearance">
                <ActionButton onClick={handleClearFilter} disabled={!(selectedFilters && Object.keys(selectedFilters).length)}>
                    <svg aria-hidden="true" className="" height="12" width="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 6.585 4.593-4.592a1 1 0 0 1 1.415 1.416L9.417 8l4.591 4.591a1 1 0 0 1-1.415 1.416L8 9.415l-4.592 4.592a1 1 0 0 1-1.416-1.416L6.584 8l-4.59-4.591a1 1 0 1 1 1.415-1.416z" fillRule="evenodd"></path>
                    </svg>
                    <span>Clear filters</span>
                </ActionButton>
            </Filter>
        </Tab>
        {showPortal && ReactDOM.createPortal(<ContextMenu ref={popupRef} className="ContextualLayer-container">
            <div className="ContextualPopover-arrowContainer" style={{marginLeft: "16px"}}>
                <div className="ContextualPopover-arrow" ref={setArrowElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="9" role="presentation">
                        <g fill="none" fillRule="evenodd">
                            <path className="ContextualLayer-border" fill="#8898AA" fillOpacity="0.1"
                                  d="M1 9.092h19l-6.402-6.74c-1.717-1.806-4.485-1.8-6.196 0L1 9.093zM20.342 8l-6.02-6.336c-2.108-2.22-5.538-2.218-7.645 0L.658 8h19.684z"></path>
                            <path className="ContextualLayer-inner" d="M7.402 2.353c1.711-1.801 4.48-1.807 6.196 0L20 9.093H1l6.402-6.74z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div className="mb-1" style={{fontSize: '1.1rem'}}>Filter by {portalData.title.toLowerCase()}</div>
            {portalData.value}
        </ContextMenu>, referenceElement)}
    </>
}
export default TableFilter
