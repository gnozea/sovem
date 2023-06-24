import React, {CSSProperties, FC, useCallback, useEffect, useRef, useState} from "react";
import QRCode from "react-qr-code";
import InputMask from "react-input-mask";
import axios from "axios";

interface IProps {
    value: any,
    _2faCode: any,
    user_email?: string,
    onVerify: any,
}

const MFAForm: FC<IProps> = (props: IProps) => {
    const [isCodeValid, setIsCodeValid] = useState<boolean>(),
        [code, setCode] = useState<string>(),
        codeRef = useRef<any>()

    useEffect(() => {
        codeRef.current.focus()
    }, [])
    const handleCheckAuthenticator = (e: any) => {
        setCode(undefined)
        if (e.target.value.length === 7){

            let arr: any = {
                code: e.target.value.replace(" ", '')
            }
            setCode( e.target.value.replace(" ", ''))
            if (props.user_email) arr['email'] = props.user_email
            axios.post('/api/authenticator/verify', arr).then((res) => {
                props.onVerify({
                    valid: true
                })
                setIsCodeValid(res.data.status === "success")
            });
        }
    }

    const border: any = code && isCodeValid ? undefined : { borderColor: "#d73c4e" }

    return <>
        <div className="col-md-7 col-12 mx-auto">
            <p className="" style={{ marginBottom: ".5em" }}>
                Accédez à l'App Store de votre téléphone puis téléchargez Google Authenticator.
            </p>
        </div>
        <div className="d-flex justify-content-center">
            <QRCode bgColor="transparent" value={props.value}/>
        </div>
        <div className="col-md-7 col-12 mx-auto mt-2">
            <p className="">
                Scannez ce code et entrez le code généré par votre application dans le champ ci-dessous.
            </p>
        </div>
        <div className="QuestionBody col-12 col-md-4 mx-auto">
            <div className="ChoiceStructure">
                <div className="dk-speakout-full">
                    <InputMask ref={codeRef} type="text" style={{...border}} name="phone" required={true} mask="999 999" maskPlaceholder={null}
                               onChange={handleCheckAuthenticator}
                               placeholder="Authenticator app code" className="fill_inited"
                    />
                    {/*<input autoComplete="name" required={true} name="authenticator"*/}
                    {/*       id="authenticator" type="text"*/}
                    {/*       onChange={(e: any) => props._2faCode(e.target.value)}*/}
                    {/*       placeholder="Add code from Google Authenticator" className="fill_inited"/>*/}
                </div>
            </div>
        </div>
    </>
}
export default MFAForm
