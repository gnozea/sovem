import React, {FC} from "react";

interface IProps {
    defaultValue?: undefined,
    defaultChecked?: boolean,
    id: string,
    onChange?: any,
    labelValue?: string,
    name?: string,
    setRef?: React.Ref<any>
}
export const Radio: FC<IProps> = (props: IProps) => {
    const defaultChecked = props.defaultChecked ? { defaultChecked: props.defaultChecked } : null
  return <>
      <input ref={props.setRef} aria-labelledby="8-label" onChange={(e: any) => typeof props.onChange === "function" ? props.onChange(e) : undefined} className="radio QRadio" type="radio" name={props.name} id={props.id} { ...defaultChecked }/>
      <label htmlFor={props.id} className="q-radio" aria-hidden="true"></label>
      <span className="LabelWrapper">
        <label htmlFor={props.id} id={`${props.id}-label`} className="SingleAnswer ChoiceTextPositionLeft">
            <span>{ props.labelValue ? props.labelValue : props.defaultValue }</span>
        </label>
    </span>
  </>
}
export const Checkbox: FC<IProps> = (props: IProps) => {
    const defaultChecked = props.defaultChecked ? { defaultChecked: props.defaultChecked } : null
  return <>
      <input ref={props.setRef} aria-labelledby="8-label" onChange={(e: any) => typeof props.onChange === "function" ? props.onChange(e) : undefined} className="checkbox" type="checkbox" name={props.name} id={props.id} { ...defaultChecked }/>
      <label htmlFor={props.id} className="q-checkbox" aria-hidden="true"></label>
      <span className="LabelWrapper">
        <label htmlFor={props.id} id={`${props.id}-label`} className="MultipleAnswer ChoiceTextPositionLeft">
            <span>{ props.labelValue ? props.labelValue : props.defaultValue }</span>
        </label>
    </span>
  </>
}
