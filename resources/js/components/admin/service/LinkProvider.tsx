import React, {FC, useState} from "react"
import Progress from "../../utils/Progress";
import BrowserTitle from "../../utils/BrowserTitle";
import Select2 from "../../utils/form-components/Select2";
import {motion} from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify";


interface IProps {
    service: any,
    onDone: any
}

const LinkProvider: FC<IProps> = (props: IProps) => {
    const [providers, setProviders] = useState<any[]>([]),
        [loading, setLoading] = useState<boolean>()

    const handleProviderSelect = (e: any) => {
        setProviders((prevState) => [...prevState, e])
    }

    const handleSubmitLink = (e: any) => {
        const form = new FormData()
        providers.map((provider: any) => form.append("providers[]", provider.id))
        form.append("service_id", props.service.id)
        setLoading(true)
        axios.post("/api/dashboard/service/link-provider", form).then((rep: any) => {
            setLoading(false)
            props.onDone()
            toast.success("Le nouveau prestataire a été lié.")
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

  return <Select initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
      {loading && <Progress/>}
      <BrowserTitle title={"Lier à des prestataires"}/>
      <div className="form-label m-0 mb-2">Lier prestataires</div>
      <div style={{ boxShadow: "rgb(227, 232, 238) 0px -1px inset", width: "100%", height: "1px", marginTop: "-1px", marginLeft: "-22px" }}/>
      <motion.div className="mt-3" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }}>
          <label className="form-label">Choisir prestataires</label>
          <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={'/api/dashboard/provider/search'}
                   onSelect={handleProviderSelect}
                   searchable={true} placeholder="Nom du prestataire" id="pname"
          />
          {providerSelected()}
          <div className="mt-3 text-center">
              <button onClick={handleSubmitLink} disabled={providers.length === 0} className="btn btn-primary btn-sm">{`Enregistrer`}</button>
          </div>
      </motion.div>
  </Select>
}
export default LinkProvider

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
