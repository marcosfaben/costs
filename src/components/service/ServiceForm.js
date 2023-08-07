import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";

import styles from '../project/ProjectForm.module.css'

function ServiceForm({handleOnSubmit, projectData}){

    const [service, setService] = useState({})

    function handleOnChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleOnSubmit(projectData)
    }

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Contratar um Scrum Master"
                handleOnChange={handleOnChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="500"
                handleOnChange={handleOnChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="O Scrum Master deve liderar a implementação do ..."
                handleOnChange={handleOnChange}
            />
            <SubmitButton text='Criar pedido'/>
        </form>
    )
}

export default ServiceForm;