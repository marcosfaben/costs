import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'

import { useNavigate } from "react-router-dom";

const NewProject = () => {

    const enderecoProjetos = 'http://localhost:5000/projects'
    const navegate = useNavigate()

        function createPost(project){

            //inicializar cost e serviços

            project.cost = 0
            project.services = []

            fetch(enderecoProjetos, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(project)
            }).then((resp)=>{
                return resp.json()
            }).then((data)=>{
                //redirecionar para a página de projetos
                navegate('/projects', {state: {message: 'Projeto criado com sucesso!', type: "sucess"}})
            }).catch((err)=>{
                navegate('/projects', {state: {message: 'Erro ao criar o projeto', type:"error"}})
                return console.log(err)
            })
        }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar projeto" post={createPost}/>
            
        </div>
    )
}

export default NewProject;