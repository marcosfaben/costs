import Message from "../layout/Message";
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton";
import Conteiner from "../layout/Conteiner";

import ProjectCard from "../project/ProjectCard";

const Projects = () => {

    const location = useLocation()
    let message = ''
    let type = ''
    if(location.state){
        message = location.state.message
        type = location.state.type
    }

    const [projetos, setProjetos] = useState([])

    useEffect(()=>{

        const bdprojetos = 'http://localhost:5000/projects'

        fetch(bdprojetos, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then((data)=>{
            setProjetos(data)
        })
        .catch((err)=>console.log("Erro ao conectar com o banco de dados: " + err))  
    }, [])
   

    
    
    return(
        <div className={styles.project_Container}>
            <div className={styles.title_Container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" texto="Criar projeto"/>
            </div>


            {message && (
                <Message msg={message} type={type} />
            )}


            <Conteiner customClass="start">

                {projetos.length>0 && (
                    projetos.map((projeto)=>{
                        return (<ProjectCard
                            id={projeto.id}
                            name={projeto.name}
                            budget={projeto.budget}
                            category={projeto.category.name}

                            key={projeto.id}
                            />)
                    }
                        
                    )
                )}                

            </Conteiner>

        </div>
    )
}

export default Projects;