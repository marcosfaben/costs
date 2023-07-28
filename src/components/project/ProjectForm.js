import styles from './ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import { useState, useEffect } from 'react';
import { FaChessKnight } from 'react-icons/fa';


function ProjectForm({btnText, post}){

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



        const [project, setProject] = useState({})

        const submit = (e) => {
            e.preventDefault()
            //handleSubmit(project)
            post(project)
        }

        function handleOnChange(e){
            setProject({...project, [e.target.name]: e.target.value})
            //console.log(e.target.value)
            //console.log(project)
        }

        function handleSelect(e){
            setProject({...project, category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }})
            //console.log(e.target.value)
            //console.log(e.target.options[e.target.selectedIndex].text)
            //console.log(project)
        }

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleOnChange}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleOnChange}
            />
            
            
            <Select
                name="category_ig"
                text="Selecione a categoria"
                option={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}
                />
            
            <SubmitButton text={btnText} />

        </form>
    )
}

export default ProjectForm;