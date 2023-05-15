import React, {FC, useContext} from "react";

interface IProps {
    title: string
}
const BrowserTitle: FC<IProps> = (props: IProps) => {
    const title = `Global communication`
    document.title = `${props.title} | ${title}`
    return (
        <></>
    )
}

export default BrowserTitle
