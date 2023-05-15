import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";


const DragOverBounce = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
`

const Label = styled.label`
    display: flex;
    position: relative;
    align-items: center;
    background: none;
    border: none;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    min-height: 100px;
    border-radius: 5px;
    border: none;
    transition: background-color 160ms ease, border-color 400ms ease;
    cursor: pointer;
    &.DragOver{
        animation: ${DragOverBounce} 1s ease infinite;
        img{
            transform: scale(1.2);
        }
    }
    img{
        width: 50%;
        transition: .3s ease;
    }
`

const Illustration = styled.div`
    width: 55%;
    position: absolute;
    height: 100%;
    background: url(/images/dots--uploads.svg) no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: .3s ease;
    margin-left: auto;
    margin-right: auto;
    @media all and (max-width: 768px){
        width: 35%;
    }
`

const Hints = styled.div`
    margin-top: 8px;
    position: absolute;
    bottom: -20px;
    transition: .3s ease;
    text-align: center;
    p{
        margin-bottom: 0.5rem;
        line-height: 0;
        transition: .3s ease;
    }
    span{
        color: #6c757d;
        font-size: 14px;
    }
`

interface IProps {
    fileTypes: any,
    handleChange: any,
    multiple?: boolean,
    name: string,
    labelTitle: string,
    _base64?: any,
    maxMBSize: number,
    styles: {},
    onFinished: any,
    previousImage?: any
}

const DragAndDrop: React.FunctionComponent<IProps> = (props) => {

    const [dragOver, setDragOver] = useState(false)
    const [uploaded, setUploaded] = useState<number>(undefined)
    let ref = useRef<any>()

    useEffect(() => {
        if (props.previousImage && ref.current) ref.current.src = props.previousImage

    }, [])

    const onDrop = (event: any) => {
        event.preventDefault()
        const files = event.dataTransfer.files;
        setUploaded(files.length)
        setDragOver(false)
        readURL(event.dataTransfer)
        if (typeof props.onFinished === 'function') props.onFinished(files)
    }

    const handleInputChange = (event: any) => {
        const files = event.target.files
        setUploaded(files.length)
        readURL(event.target)
        if (typeof props.onFinished === 'function')  props.onFinished(files)
    }

    //Disable browser default behavior
    const onDragOver = (event: any) => {
        event.preventDefault();
        setDragOver(true)
    }

    const startDrag = (event: any) => {
        event.preventDefault()
    }

    const id = Math.random().toString(36).substring(7)

    const styles = {minHeight: '150px', ...props.styles}


    const readURL = (input: any): any => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let src = undefined;
            reader.onload = function(e) {
                src = e.target.result;
                if (ref.current) ref.current.src = src
                if (props && props._base64 && typeof props._base64 === 'function') props._base64(src)
            }
            reader.readAsDataURL(input.files[0]); // convert to base64 string
            return src;
        }
    }

    return (
        <Label htmlFor={id} className={`d-flex flex-column drag-and-drop${dragOver ? ' DragOver' : ''}`} style={styles}
               onDragOver={e => onDragOver(e)}
               onDragLeave={() => setDragOver(false)}
               onDrop={e => onDrop(e)}
               onChange={e => handleInputChange(e)}
               onDragStart={e => startDrag(e)}>
            <input type="file" multiple={props.multiple}
                   name={props.name} id={id}
                   accept={fileTypes(props.fileTypes)}
                   style={{position: 'absolute', left: '-300px', opacity: '0'}}
            />
            <Illustration>
                <span className="d-block" style={{width: "210px", zIndex: "-1", textAlign: "center"}}>
                    <img ref={ref} src="/images/upload--inner.png" alt=""/>
                </span>
            </Illustration>
            <Hints>
                {!dragOver && !uploaded &&
                    <>
                        <p>{props.labelTitle ? props.labelTitle : 'Select or drop file here'}</p>
                        <span>{props.fileTypes.join(', ')} {props.maxMBSize ? ` up to ${props.maxMBSize}MB` : ''}</span>
                    </>
                }
                {uploaded &&
                    <>
                        <p>{`${uploaded} file${uploaded > 1 ? 's' : ''} selected`}</p>
                        {!uploaded && <span>{props.fileTypes.join(', ')} {props.maxMBSize ? ` up to ${props.maxMBSize}MB` : ''}</span>}
                    </>
                }
                {dragOver && <p style={{marginTop: '1.2em'}}>Drop your here</p>}
            </Hints>
        </Label>
    )
}

const fileTypes = (filesType: []) => {
    const extensions: any = { "jpg": 'image', "png": 'image', "gif": 'image', "jpeg": 'image', "svg": 'image' }
    let accepts: [] = []
    filesType.forEach((type: string) => {
        if (extensions[type.toLowerCase()]) { // @ts-ignore
            accepts.push(`${extensions[type.toLowerCase()]}/${type}`)
        }
    })
    return accepts.join(', ')
}
export default DragAndDrop
