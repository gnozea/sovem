import React, {FC, useEffect, useState} from "react";
import QRCode from "react-qr-code";
import InputMask from "react-input-mask";
import Progress from "../../utils/Progress";
import axios from "axios";


interface IProps {

}

const MFAEnrollment: FC<IProps> = (props: IProps) => {
    const [details, setDetails] = useState<any>(),
        [codeError, setCodeError] = useState<string>(),
        [busy, setBusy] = useState<boolean>()

    useEffect(() => {
        axios.get("/api/authenticator/enrollment").then((rep: any) => {
            setDetails(rep.data);
        }).catch((err) => {

        })
    }, [])

    const handleEnrollment = (e: any) => {
        setCodeError(undefined)
        if (e.target.value.length === 7) {
            axios.post("/api/authenticator/enrollment", {
                code: e.target.value.replace(" ", '')
            }).then((rep: any) => {
                if(rep.data.status === "success") location.reload();

                setCodeError("Ce code n'est pas valide")
            }).catch((err) => {
                setCodeError("Veuillez ressayer.")
            })
        }
    }

    return <>
        {!details && <Progress/>}
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
                               placeholder="Authenticator app code" className={`form-control${codeError ? " is-invalid" : ""}`}
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
export default MFAEnrollment
