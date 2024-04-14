import React, {FC, useEffect, useState} from "react";
import QRCode from "react-qr-code";
import InputMask from "react-input-mask";
import Progress from "../../utils/Progress";
import axios from "axios";
import {ClientJS} from 'clientjs'


interface IProps {

}

const clientJs = new ClientJS()
const MFAEnrollment: FC<IProps> = (props: IProps) => {
    const [details, setDetails] = useState<any>(),
        [codeError, setCodeError] = useState<{ msg: string, isBrowser?: boolean }>(),
        [regenerate, setRegenerate] = useState<boolean>(undefined)

    useEffect(() => {
        if (regenerate || regenerate === undefined) axios.get("/api/authenticator/enrollment", {
            params: {
                fingerprint: clientJs.getFingerprint(),
                regenerate: regenerate
            }
        }).then((rep: any) => {
            setDetails(rep.data);
            setRegenerate(false)
        }).catch((err) => {
            setRegenerate(false)
        })
    }, [regenerate])

    const handleEnrollment = (e: any) => {
        setCodeError(undefined)
        if (e.target.value.length === 7) {
            axios.post("/api/authenticator/enrollment", {
                code: e.target.value.replace(" ", ''),
                fingerprint: clientJs.getFingerprint()
            }).then((rep: any) => {
                if(rep.data.status === "success") location.reload();
            }).catch((error) => {
                setCodeError({msg: error.response.data.msg, isBrowser: error.response.data.type === "browser"})
            })
        }
    }

    return <>
        {!details || regenerate && <Progress style={regenerate ? "skype" : undefined}/>}
        <div className={`"col-md-0 col-12"} mx-auto`}>
            <p className="" style={{ marginBottom: ".5em" }}>
                Accédez à l'App Store de votre téléphone puis téléchargez Google Authenticator.
            </p>
        </div>
        <div className="d-flex justify-content-center">
            <QRCode bgColor="transparent" value={!details ? 'Please wait' : details.data}/>
        </div>
        <div className={`"col-md-0 col-12" mx-auto mt-2`}>
            <p className="">
                Scannez ce code et entrez le code généré par votre application dans le champ ci-dessous.
            </p>
        </div>
        <div className="QuestionBody col-12 mx-auto">
            <div className="ChoiceStructure">
                <div className="form-group">
                    <InputMask type="text" name="phone" required={true} mask="999 999" maskPlaceholder={null}
                               onChange={handleEnrollment}
                               placeholder="Authenticator app code" className={`form-control${codeError && !codeError?.isBrowser ? " is-invalid" : ""}`}
                    />
                    {codeError?.msg && <p className="text-danger mt-2">{codeError.msg}</p>}
                    {/*<input autoComplete="name" required={true} name="authenticator"*/}
                    {/*       id="authenticator" type="text"*/}
                    {/*       onChange={(e: any) => props._2faCode(e.target.value)}*/}
                    {/*       placeholder="Add code from Google Authenticator" className="fill_inited"/>*/}
                </div>
                <div className="mt-3 text-center">
                    <button className="btn btn-dark" onClick={() => setRegenerate(true)}>Régénérer le code QR</button>
                </div>
            </div>
        </div>
    </>
}
export default MFAEnrollment
