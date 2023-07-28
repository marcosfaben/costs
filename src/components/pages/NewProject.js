import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'

const NewProject = () => {

    const enderecoProjetos = 'http://localhost:5000/projects'

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
                console.log(data)
                //depois de inserir um novo projeto vamos redirecionar
            }).catch((err)=>{
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