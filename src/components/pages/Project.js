import { useEffect, useState } from 'react';
import styles from './Project.module.css'

//usar o hook useParams para pegar o id passado na url
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import Conteiner from '../layout/Conteiner';

function Project(){

    const {id} = useParams()

    const[project, setProject] = useState({})

    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>resp.json())
        .then((data)=>{
            setProject(data)
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }, [id])

    function toggleProjectForm(){
        console.log(showProjectForm)
        setShowProjectForm(!showProjectForm)
    }
    

    return(
        <>
            {project.name ? (
                    <div className={styles.project_details}>
                        <Conteiner customClass="column">
                            <div className={styles.details_container}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {showProjectForm ? 'Fechar projeto' : 'Editar projeto'}
                                </button>
                                {!showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento:</span> R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    
                                    <div className={styles.project_info}>
                                        <p>Detalhes do projeto</p>
                                    </div>
                                )}
                            </div>
                        </Conteiner>
                    </div>
                )
                    : (<Loading/>)
            }
        </>
    )
}

export default Project;