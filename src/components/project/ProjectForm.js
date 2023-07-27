import styles from './ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import { useState, useEffect } from 'react';


function ProjectForm({btnText}){

    const oi = 'oi'

    const [categories, setCategories] = useState([]);

    const bdTemporario = "http://localhost:5000/categories"

    useEffect(
        () => {
            fetch(bdTemporario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((categorias) => {
                return categorias.json()
            })
            .then((categoriasJson) => {
                setCategories(categoriasJson)
            })
            .catch(err=>console.log("Deu erro: " + err))
        }, [])

    return(
        <form className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
            />
            
            
            <Select name="category_ig" text="Selecione a categoria" option={categories}/>
            
            <SubmitButton text={btnText}/>

        </form>
    )
}

export default ProjectForm;