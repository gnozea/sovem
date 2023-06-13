import React, {FC, useEffect, useState} from "react"
import BrowserTitle from "../../utils/BrowserTitle";
import Select2 from "../../utils/form-components/Select2";
import styled from "styled-components";
import {motion} from "framer-motion";
import axios from "axios";
import Progress from "../../utils/Progress";
import {toast} from "react-toastify";

interface IProps {
    default?: {providers?: any, service?: any},
    onBack?: any
}
export const Add: FC<IProps> = (props: IProps) => {
    const [providers, setProviders] = useState<any[]>(props.default.providers ? props.default.providers : []),
        [selected, setSelected] = useState<any[]>([]),
        [loading, setLoading] = useState<boolean>(),
        [name, setName] = useState<string>()

    const handleAddSpecialist = (e: any) => {
        e.preventDefault()
        const form = new FormData();
        form.append("name", name)
        form.append("service_id", props.default.service.id)
        let id: any[] = []
        setLoading(true)
        providers.map((provider: any) => {
            id = [...id, provider.id]
            form.append("providers[]", provider.id)
        })
        toast.success("Le nouveau spécialiste a été ajouté.")
        axios.post("/api/dashboard/specialist", form).then((rep: any) => {
            setLoading(false)
            props.onBack(rep.data)
        })
    }

    const providerSelected = () => {
        if (selected.length > 0) {
            return <div className="tags mt-3 mb-2">
                {selected.map((provider: any, index: number) => {
                    return <div className="pt-1 pt-1 pe-1 d-inline-block" key={index}>
                        <span className="tag" key={index}>
                            {provider?.name} <button type="button" style={{border: "none"}} className="tag-addon"><i className="fe fe-x" onClick={() => {
                            setSelected((prevState: any) => {
                                const all: any = [...prevState]
                                all.splice(index, 1)
                                return all
                            })
                        }}></i></button>
                          </span>
                    </div>
                })}
            </div>
        }else {
            return <></>
        }
    }

    const handleProviderSelect = (e: any) => {
        setSelected((prevState) => [...prevState, e])
    }

    return <Select initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
        {loading && <Progress/>}
        <BrowserTitle title={"Ajouter spécialité"}/>
        <div className="form-label m-0 mb-2">Ajouter spécialiste</div>
        <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: "-1px", marginLeft: "-22px" }}/>
        {props.default.providers && <div className="mb-3 mt-2">
            <span style={{ cursor: "pointer" }} onClick={() => props.onBack()}>
                <i className="fe fe-arrow-left"></i> Back
            </span>
        </div>}
        <form onSubmit={handleAddSpecialist}>
            <fieldset className="mt-2">
                <div className="form-group mb-2">
                    <label className="form-label">Nom<span className="form-required">*</span></label>
                    <input onChange={(e: any) => setName(e.target.value)} defaultValue={name} type="text" name="name" required={true} placeholder="Nom du service" className="form-control"/>
                </div>
            </fieldset>
            <label className="form-label">Choisir prestataire</label>
            {props.default.providers && <Select2 classes="service-form" multiple={false} selectedValue={undefined} data={providers} onSelect={handleProviderSelect} searchable={true} placeholder="Nom du prestataire" id="names"/>}
            {!props.default.providers &&
                <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/dashboard/service/${props.default.service.id}/search_specialist`}
                         onSelect={handleProviderSelect}
                         searchable={true} placeholder="Nom du prestataire" id="pname"
                />
            }
            {selected.length > 0 && <List className="pt-2" haveItem={selected.length}>
                <label className="form-label">Vos sélections</label>
                {providerSelected()}
            </List>}
            <div className="mt-2 text-center">
                <button disabled={name && name.trim() === ""} className="btn btn-primary btn-sm">{`Enregistrer`}</button>
            </div>
        </form>
    </Select>
}

const List = styled.div<{haveItem: boolean|number, seeMore?: boolean}>`
    label{
        border: ${props => props.haveItem ? "1px solid rgba(0, 40, 100, 0.12)" : "none"};
        padding: ${props => props.haveItem ? ".5rem" : 0};
        border-radius: ${props => props.haveItem ? "3px 3px 0 0" : 0};
        margin: 0;
    }
    .tags{
        margin: 1rem 0 2rem;
        border: 1px solid rgba(0, 40, 100, 0.12);
        font-size: 0.9375rem;
        max-height: 40rem;
        overflow: auto;
        background: #fcfcfc;
        border-top: none;
        margin-top: 0!important;
        border-radius: 0 0 3px 3px;
        padding: .5rem!important;
        max-height: 62px;
        padding-top: 0!important;
        position: relative;
        overflow: hidden;
        &:after{
            position: absolute;
            content: "Voir plus"
            font-size: 12px;
        }
        &:before{
            position: absolute;
            content: ""
            width: 100%;
            height: 5px;
            background: "#000";
        }
    }
`

const Select = styled(motion.div)`
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
