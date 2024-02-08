import Message from "../layout/Message";
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton";
import Conteiner from "../layout/Conteiner";

import ProjectCard from "../project/ProjectCard";

import Loading from '../layout/Loading'

import { useSelector, useDispatch } from "react-redux";
import rootReducer from "../../redux/root-reducer";
import projectActionTypes from "../../redux/project/actionTypes";

const Projects = () => {

    const location = useLocation()
    let message = ''
    let type = ''

    const {projects} = useSelector(rootReducer=>rootReducer.projectReducer)
    const {currentUser} = useSelector(rootReducer=>rootReducer.useReducer)
    const dispatch = useDispatch()

    if(location.state){
        message = location.state.message
        type = location.state.type
    }
    const bdprojetos = 'http://localhost:5000/projects'
    useEffect(()=>{

        fetch(bdprojetos, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then((data)=>{
            dispatch({type: projectActionTypes.INSERT, payload:data})
            setRemoveLoading(true)
        })
        .catch((err)=>console.log("Erro ao conectar com o banco de dados: " + err))  
    }, [])

    const [msgRemove, setMsgRemove] = useState('')
    const [typeRemove, setTypeRemove] = useState('')
   
    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res)=>res.json())
        .then(()=>{
            dispatch({type: projectActionTypes.DELET, payload: id})
            setMsgRemove('Projeto removido com sucesso!')
            setTypeRemove('sucess')
        })
        .catch((err) => console.log("Erro ao tentar remover projeto: "+err))
    }

    const [removeLoading, setRemoveLoading] = useState(false)
    
    return(
        <div className={styles.project_Container}>
            <div className={styles.title_Container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" texto="Criar projeto"/>
            </div>


            {message && (
                <Message msg={message} type={type} />
            )}

            {msgRemove && (
                    <Message msg={msgRemove} type={typeRemove} />
            )}

            <Conteiner customClass="start">
                {currentUser.adm ? (
                    <>
                        {projects.length > 0 && (
                            projects.map((projeto) => {
                                return (<ProjectCard
                                    id={projeto.id}
                                    name={projeto.name}
                                    budget={projeto.budget}
                                    category={projeto.category.name}
                                    handleRemove={removeProject}
                                    key={projeto.id}
                                />)
                            }))}
                    </>
                ) : (
                        <>
                            {projects.length > 0 && (
                                projects.map((projeto) => {
                                    return (
                                        <>
                                            {currentUser.id == projeto.idUser ? (
                                                <>
                                                    <ProjectCard
                                                        id={projeto.id}
                                                        name={projeto.name}
                                                        budget={projeto.budget}
                                                        category={projeto.category.name}
                                                        handleRemove={removeProject}
                                                        key={projeto.id}
                                                    />
                                                </>
                                            ) : (<></>)}

                                        </>
                                    )
                                }))}
                        </>
                )}

                {!removeLoading && (
                    <Loading/>
                )}

                {removeLoading && projects.length===0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Conteiner>

        </div>
    )
}

export default Projects;