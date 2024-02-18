import {parse, v4 as uuid} from 'uuid' 

import { useEffect, useReducer, useState } from 'react';
import styles from './Project.module.css'

//usar o hook useParams para pegar o id passado na url
import { useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import Conteiner from '../layout/Conteiner';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from '../../redux/root-reducer';
import projectActionTypes from '../../redux/project/actionTypes';

function Project(){

    const {id} = useParams()
    
    const dispatch = useDispatch()

    const {project, msg, typeMsg, showProjectForm, showServices, services} = useSelector(rootReducer=>rootReducer.projectReducer)
    
    const [cont, setCont] = useState(0)
    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>resp.json())
        .then((data)=>{
            dispatch({type: 'setProject', payload: data})
            dispatch({type: projectActionTypes.EDIT, payload: data.services})
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }, [id, cont])

    function editPost(project){
        dispatch({type: 'setMsg', payload: ''})

        if(project.budget < project.cost){
            dispatch({type: 'setMsg', payload: 'O orçamento não pode ser menor que os custos do projeto!'})
            dispatch({type: 'setTypeMsg', payload: 'error'})
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setCont((cont)=>cont+1)
            dispatch({action: projectActionTypes.EDIT, payload: data})
            dispatch({type: 'setShowProjectForm'})
            dispatch({type: 'setMsg', payload: 'Projeto atualizado!'})
            dispatch({type: 'setTypeMsg', payload: 'sucess'})
        })
        .catch((err)=>{
            console.log('Erro ao atualizar o projeto: ' + err)
            dispatch({type: 'setMsg', payload: 'Erro na atualização!'})
            dispatch({type: 'setTypeMsg', payload: 'error'})
        })
    }

    function insertServices(project){
        dispatch({type: 'setMsg', payload: ''})

        const lastService = project.services[project.services.length - 1]
        
        lastService.id = uuid()

        const sumCost = project.services.reduce((a, b)=>a+parseFloat(b.cost), 0)
        
        if(sumCost > parseFloat(project.budget)){
            dispatch({type: 'setMsg', payload: 'Orçamento ultrapassado, verifique o valor do serviço'})
            dispatch({type: 'setTypeMsg', payload: 'error'})

            //esse pop retira o ultimo elemento de serviços
            project.services.pop()
            return false
        }

        project.cost = sumCost

        fetch(`http://localhost:5000/projects/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data)=> {
            dispatch({action: projectActionTypes.EDIT, payload: data.services})})
        .catch((err)=>console.log("Erro na atualização dos serviços do projeto" + err))

    }

    function handleRemoveService(idService, idProject){

       let proj = project

       proj.services = proj.services.filter((service)=> service.id !== idService)
       
       proj.cost = proj.services.reduce((a, b)=>a+parseFloat(b.cost), 0)
       
       fetch(`http://localhost:5000/projects/${idProject}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proj)
        }).then((resp)=>resp.json())
        .then((data)=>{
            setCont((cont)=>cont+1)
            dispatch({action: projectActionTypes.EDIT, payload: proj})
            dispatch({action: 'setServices', payload: data.services})
            dispatch({type: 'setMsg', payload: 'Serviço excluido com sucesso'})
            dispatch({type: 'setTypeMsg', payload: 'sucess'})
        })
        .catch((err)=>{
            console.log("Erro ao remover dados do banco de projetos: " + err)
        })
    }

    return(
        <>
            {project ? (
                    <div className={styles.project_details}>
                        <Conteiner customClass="column">

                            {msg && (
                                <Message msg={msg} type={typeMsg} />    
                            )}

                            <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={()=>{dispatch({type: 'setShowProjectForm'})}}>
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
                                        <ProjectForm handleSubmit={editPost} btnText="Atualizar projeto" projectData={project}/>
                                    </div>
                                )}
                            </div>
                            <div className={styles.service_form_container}>
                                    <h2>Adicione um serviço:</h2>
                                    <button className={styles.btn} onClick={()=>{dispatch({type:'setShowServices'})}}>
                                        {showServices ? 'Fechar serviço' : 'Adicionar'}
                                    </button>
                                    <div className={styles.project_info}>
                                        {showServices ? (
                                            <>
                                                <p>Aqui vai os serviços</p>
                                                <ServiceForm handleOnSubmit={insertServices} projectData={project}/>
                                                
                                            </>
                                        ): (
                                            <></>
                                        )}
                                    </div>
                            </div>
                                <h2>Serviços:</h2>
                            <div className={styles.service_form_container}>
                                {services.length===0 && (
                                            <p>Não há serviços</p>
                                )}
                                {services.length>0 &&
                                    services.map((service)=>(
                                        <ServiceCard 
                                                idService={service.id}
                                                idProject={id}
                                                name={service.name}
                                                cost={service.cost}
                                                description={service.description}
                                                handleRemove={handleRemoveService}
                                                key={service.id}
                                            />
                                    ))
                                }

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