import React, {FC, useState} from "react";
import Select2 from "../../utils/form-components/Select2";
import Popup from "../../utils/Popup";
import styled from "styled-components";
import Progress from "../../utils/Progress";
import axios from "axios";
import {toast} from "react-toastify";

interface IProps {
    provider: any,
    service: any,
    onClose: any
}



const AddSpecialist: FC<IProps> = (props: IProps) => {
    const [specialistSelected, setSpecialistSelected] = useState<any[]>([]),
        [error, setError] = useState<string>(),
        [isLoading, setIsLoading] = useState<boolean>()

    const handleSpecialistSelect = (e: any) => {
        setError("")
        setSpecialistSelected((prevState) => [...prevState, e])
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const form = new FormData()
        let id: any[] = []
        setIsLoading(true)
        specialistSelected.map((specialist: any) => {
            id = [...id, specialist.id]
            form.append("specialists[]", specialist.id)
        })
        axios.post(`/api/dashboard/provider/${props.provider.id}/add-specialist`, form).then((rep: any) => {
            if (rep.data.status === "success"){
                toast.success(`Vous avez ajouté ${specialistSelected.length} spécalité${specialistSelected.length > 1 ? "s" : ''}.`)
            }else{
                toast.error("Votre requête n'a pas été effectuée.")
            }
            setIsLoading(false)
            props.onClose()
        })
    }

    const specialistSelectedList = () => {
        if (specialistSelected.length > 0) {
            return <div className="tags mt-3 mb-2">
                {specialistSelected.map((provider: any, index: number) => {
                    return <div className="pt-1 pt-1 pe-1 d-inline-block" key={index}>
                        <span className="tag" key={index}>
                            {provider?.name} <button type="button" style={{border: "none"}} className="tag-addon">
                            <i className="fe fe-x" onClick={() => {
                            setSpecialistSelected((prevState: any) => {
                                const all: any = [...prevState]
                                all.splice(index, 1)
                                return all
                            })}
                            }></i></button>
                          </span>
                    </div>
                })}
            </div>
        }else {
            return <></>
        }
    }

    if (isLoading) return <Progress/>
    return <Popup onPopupClose={() => typeof props.onClose === "function" ? props.onClose() : undefined} isSmall={true} parentId={"24341123"}>

        <label className="form-label">Ajouter spécialité pour {props.provider.name_short}</label>

        <Select className="">
            <label className="form-label">Rechercher spécialist<span className="form-required">*</span></label>
            <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/dashboard/service/${props.service.id}/search_specialist`}
                     onSelect={handleSpecialistSelect}
                     searchable={true} placeholder="Nom du spécialiste" id="sname"
            />
        </Select>
        {specialistSelected.length > 0 && specialistSelectedList()}

        <div className="mt-3 text-center">
            <button disabled={!specialistSelected.length} onClick={handleSubmit}
                    className="btn btn-primary btn-sm">{`Enregistrer`}</button>
        </div>
    </Popup>
}
export default AddSpecialist

const Select = styled.div`
    margin-top: 30px;
    .select2.select2-container{
        width: 100%!important;
        border: 1px solid rgba(0, 40, 100, 0.12);
    }
    .select2-selection__arrow{
        top: 4px!important;
    }
    .select2-selection.select2-selection--single{
        padding: 0!important;
    }
`
