import React, {FC, useContext, useEffect, useRef, useState} from "react"
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import Select2 from "../../utils/form-components/Select2";
import styled from "styled-components";
import ServiceContext from "../../../context/ServiceContext";
import axios from "axios";
import Progress from "../../utils/Progress";
import {Add as SpecialistAdd} from "../specialist/Add"
import BrowserTitle from "../../utils/BrowserTitle";

interface IProps {

}

const Add: FC<IProps> = (props: IProps) => {
    const [addProviders, setAddProviders] = useState<boolean>(),
        [providers, setProviders] = useState<any[]>([]),
        [name, setName] = useState<string>(),
        [query, setQuery] = useState<string[]>([]),
        [addSpecialist, setAddSpecialist] = useState<boolean>(),
        [loading, setLoading] = useState<boolean>(),
        url = `/api/dashboard/provider/search?names=${JSON.stringify(query)}`,
        [showServiceAdd, setShowServiceAdd] = useState<any>(),
        {dispatch} = useContext(ServiceContext)


    const handleAddService = (e: any) => {
        e.preventDefault()
        const form = new FormData();
        form.append("name", name)
        let id: any[] = []
        providers.map((provider: any) => {
            id = [...id, provider.id]
            form.append("providers[]", provider.id)
        })
        setLoading(true)
        axios.post("/api/dashboard/service", form).then((rep: any) => {
            setLoading(false)
            setShowServiceAdd({
                service: {...rep.data.data},
                providers: providers
            })
            dispatch({type: "ADD_SERVICE", payload: {...rep.data.data, providers_count: providers.length}})
            setProviders([])
            setName(undefined)
            setName(undefined)
        })
    }

    const handleProviderSelect = (e: any) => {
        setProviders((prevState) => [...prevState, e])
        if (query.indexOf(e.name_short) < 0) setQuery((prevQuery: any) => [...prevQuery, `${e.name_short}`])
    }

    const providerSelected = () => {
        if (providers.length > 0) {
            return <div className="tags mt-3 mb-2">
                {providers.map((provider: any, index: number) => {
                    return <div className="pt-1 pt-1 pe-1 d-inline-block" key={index}>
                        <span className="tag" key={index}>
                               {provider?.name} <button type="button" style={{border: "none"}} className="tag-addon"><i className="fe fe-x" onClick={() => {
                               setProviders((prevState: any) => {
                                   const all: any = [...prevState]
                                   all.splice(index, 1)
                                   return all
                               })
                            setQuery((prevState: any) => {
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

    const handleBack = (data: any) => {
        setShowServiceAdd(undefined)
    }

    return <>
        <BrowserTitle title={"Ajouter service"}/>
        {loading && <Progress/>}
        {showServiceAdd && <SpecialistAdd default={showServiceAdd} onBack={handleBack}/>}
        {!showServiceAdd && <form action="" onSubmit={handleAddService}>
            {!addProviders && <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
                <div className="form-label m-0 mb-2">Ajouter service</div>
                <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: "-1px", marginLeft: "-22px" }}/>
                <fieldset className="mt-2">
                    <div className="form-group mb-2">
                        <label className="form-label">Nom<span className="form-required">*</span></label>
                        <input onChange={(e: any) => setName(e.target.value)} defaultValue={name} type="text" name="name" required={true} placeholder="Nom du service" className="form-control"/>
                    </div>
                </fieldset>
                <List haveItem={providers.length}>
                    <Link to="#" className="form-label" onClick={(e: any) => setAddProviders(!addProviders)}>Lier à des prestataires?</Link>
                    {providerSelected()}
                </List>
                <div className="form-check mt-3">
                    <input onChange={(e: any) => setAddSpecialist(e.target.checked)} defaultChecked={addSpecialist} className="form-check-input" type="checkbox" id="addSpecialist"/>
                    <label className="form-check-label" htmlFor="addSpecialist">Ajouter spécialiste</label>
                </div>
                <div className="mt-2 text-center">
                    <button disabled={name && name.trim() === ""} className="btn btn-primary btn-sm">{`Enregistrer${addSpecialist ? " & ajouter spécialiste" : ""}`}</button>
                </div>
            </motion.div>}
            {addProviders && <Select initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
                <div className="form-label m-0 mb-2">Sélectionner prestataire</div>
                <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: "-1px", marginLeft: "-22px" }}/>
                <div className="mb-3 mt-2">
                    <span style={{ cursor: "pointer" }} onClick={() => setAddProviders(false)}>
                        <i className="fe fe-arrow-left"></i> Back
                    </span>
                </div>
                <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={url}
                         onSelect={handleProviderSelect}
                         searchable={true} placeholder="Nom du prestataire" id="pname"
                />
                {providerSelected()}
            </Select>}
        </form>}
    </>
}
export default Add

const List = styled.div<{haveItem: boolean|number, seeMore?: boolean}>`
    a{
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
