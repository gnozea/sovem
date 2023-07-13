import React, {FC, useEffect, useState} from "react"
import BrowserTitle from "../../utils/BrowserTitle";
import Select2 from "../../utils/form-components/Select2";
import styled from "styled-components";
import {motion} from "framer-motion";
import axios from "axios";
import Progress from "../../utils/Progress";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

interface IProps {
    service: any,
    onBack: any
}
export const AddFromService: FC<IProps> = (props: IProps) => {
    const [providers, setProviders] = useState<any[]>([]),
        [specialistSelected, setSpecialistSelected] = useState<any[]>([]),
        [loading, setLoading] = useState<boolean>(),
        [error, setError] = useState<string>(),
        [chooseExisting, setChooseExisting] = useState<boolean>(true),
        [name, setName] = useState<string>("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (name.trim().length === 0 && specialistSelected.length === 0) return setError("Veuillez choisir ou entrer le nom d'au moins un spécialiste")

        const form = new FormData()
        if (!chooseExisting){
            form.append("name", name)
            form.append("new", "1")
        }else {
            let id: any[] = []
            specialistSelected.map((specialist: any) => {
                id = [...id, specialist.id]
                form.append("specialist[]", specialist.id)
            })
        }

        form.append("service_id", props.service.id)

        if (providers){
            let id: any[] = []
            providers.map((provider: any) => {
                id = [...id, provider.id]
                form.append("providers[]", provider.id)
            })
        }
        setLoading(true)
        axios.post("/api/dashboard/specialist/add_from_service", form).then((rep: any) => {
            setLoading(false)
            toast.success("Service mis à jour avec succès.")
            props.onBack()
        })
    }
    const providerSelected = () => {
        if (providers.length > 0) {
            return <div className="tags mt-2 mb-2">
                {providers.map((provider: any, index: number) => {
                    return <div className="pt-1 pt-1 pe-1 d-inline-block" key={index}>
                        <span className="tag" key={index}>
                               {provider?.name} <button type="button" style={{border: "none"}} className="tag-addon"><i className="fe fe-x" onClick={() => {
                            setProviders((prevState: any) => {
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
    const specialistSelectedList = () => {
        if (specialistSelected.length > 0) {
            return <div className="tags mt-3 mb-2">
                {specialistSelected.map((provider: any, index: number) => {
                    return <div className="pt-1 pt-1 pe-1 d-inline-block" key={index}>
                        <span className="tag" key={index}>
                            {provider?.name} <button type="button" style={{border: "none"}} className="tag-addon"><i className="fe fe-x" onClick={() => {
                            setSpecialistSelected((prevState: any) => {
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
        setProviders((prevState) => [...prevState, e])
    }

    const handleSpecialistSelect = (e: any) => {
        setError("")
        setSpecialistSelected((prevState) => [...prevState, e])
    }

    return <Select initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
        {loading && <Progress/>}
        <BrowserTitle title={"Ajouter spécialiste"}/>
        <div className="form-label m-0 mb-2">Ajouter spécialiste</div>
        <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: "-1px", marginLeft: "-22px" }}/>
        <form onSubmit={handleSubmit}>
            <fieldset className="mt-2">
                <div className="form-group mb-2">
                    {!chooseExisting && <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}>
                        <label className="form-label">Nom spécialiste<span className="form-required">*</span></label>
                        <input onChange={(e: any) => {
                            setName(e.target.value)
                            setError("")
                        }} defaultValue={name} type="text" name="name" required={true} placeholder="Nom du spécialiste" className="form-control"/>
                    </motion.div>}
                    {chooseExisting && <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
                        <label className="form-label">Rechercher existant<span className="form-required">*</span></label>
                        <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/dashboard/service/${props.service.id}/search_specialist`}
                                 onSelect={handleSpecialistSelect}
                                 searchable={true} placeholder="Nom du spécialiste" id="sname"
                        />
                    </motion.div>}
                </div>
                {specialistSelected.length > 0 && chooseExisting && specialistSelectedList()}
                <label className="form-label">ou <button  type="button" className="btn-link p-0" style={{border: "none", background: "none", outline: "none"}}
                                                          onClick={() => setChooseExisting(prevState => !prevState)}>{!chooseExisting ? `choisir existant` : `créer un nouveau`}</button></label>
                {error && <span className="text-danger" style={{fontSize: "13px"}}>{error}</span>}
            </fieldset>
            <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: ".5em", marginBottom: ".5em" }}/>
            <label className="form-label">Choisir prestataire</label>
            <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={'/api/dashboard/provider/search'}
                     onSelect={handleProviderSelect}
                     searchable={true} placeholder="Nom du prestataire" id="pname"
            />
            {providerSelected()}
            <div className="mt-3 text-center">
                <button className="btn btn-primary btn-sm">{`Enregistrer`}</button>
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
