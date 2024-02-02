import {parse, v4 as uuid} from 'uuid' 

import { useEffect, useReducer } from 'react';
import styles from './Project.module.css'

//usar o hook useParams para pegar o id passado na url
import { useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import Conteiner from '../layout/Conteiner';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard';

function Project(){

    const {id} = useParams()
    
    const reducer = (state, action) => {
        switch(action.type){
            case 'setProject':
                return {...state, project: action.payload}
            case 'setServices':
                return {...state, services: action.payload}
            case "setShowProjectForm":
                return {...state, showProjectForm: !state.showProjectForm}
            case "setShowServices":
                return {...state, showServices: !state.showServices}
            case "setMsg":
                return {...state, msg: action.payload}
            case "setTypeMsg":
                return {...state, typeMsg: action.payload}
            default:
                return "This action doens't exist"
        }
    }

    const [state, dispatch] = useReducer((state, action)=>reducer(state, action), {
        project: {},
        services: [],
        showProjectForm: false,
        showServices: false,
        msg: '',
        typeMsg: '',
    })

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>resp.json())
        .then((data)=>{
            dispatch({type: 'setProject', payload: data})
            dispatch({type: 'setServices', payload: data.services})
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }, [id])

    function editPost(project){
        dispatch({type: 'setMsg', payload: ''})

        if(project.budget < project.cost){
            dispatch({type: 'setMsg', payload: 'O orçamento não pode ser menor que os custos do projeto!'})
            dispatch({type: 'setTypeMsg', payload: 'error'})
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            //setProject(data)
            dispatch({action: 'setProject', payload: project})
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
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data)=> dispatch({action: 'setServices', payload: data.services})/*setServices(data.services)*/)
        .catch((err)=>console.log("Erro na atualização dos serviços do projeto" + err))

    }

    function handleRemoveService(idService, idProject){

       let proj = state.project

       proj.services = proj.services.filter((service)=> service.id !== idService)

       fetch(`http://localhost:5000/projects/${idProject}`,{
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proj)
        }).then((resp)=>resp.json())
        .then((data)=>{
            // setProject(proj)
            //setServices(data.services)
            dispatch({action: 'setProject', payload: proj})
            dispatch({action: 'setServices', payload: data.services})
            dispatch({type: 'setMsg', payload: 'Serviço excluido com sucesso'})
            dispatch({type: 'setTypeMsg', payload: 'sucess'})
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }

    return(
        <>
        {console.log(state.project)}
            {typeof(state.project.name) != "undefined"? (
                    <div className={styles.project_details}>
                        <Conteiner customClass="column">

                            {state.msg && (
                                <Message msg={state.msg} type={state.typeMsg} />    
                            )}

                            <div className={styles.details_container}>
                            <h1>Projeto: {state.project.name}</h1>
                                <button className={styles.btn} onClick={()=>{dispatch({type: 'setShowProjectForm'})}}>
                                    {state.showProjectForm ? 'Fechar projeto' : 'Editar projeto'}
                                </button>
                                {!state.showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                        <span>Categoria:</span> {state.project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento:</span> R${state.project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${state.project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    
                                    <div className={styles.project_info}>
                                        <ProjectForm handleSubmit={editPost} btnText="Atualizar projeto" projectData={state.project}/>
                                    </div>
                                )}
                            </div>
                            <div className={styles.service_form_container}>
                                    <h2>Adicione um serviço:</h2>
                                    <button className={styles.btn} onClick={()=>{dispatch({type:'setShowServices'})}}>
                                        {state.showServices ? 'Fechar serviço' : 'Adicionar'}
                                    </button>
                                    <div className={styles.project_info}>
                                        {state.showServices ? (
                                            <>
                                                <p>Aqui vai os serviços</p>
                                                <ServiceForm handleOnSubmit={insertServices} projectData={state.project}/>
                                                
                                            </>
                                        ): (
                                            <></>
                                        )}
                                    </div>
                            </div>
                                <h2>Serviços:</h2>
                            <div className={styles.service_form_container}>
                                {state.services.length===0 && (
                                            <p>Não há serviços</p>
                                )}
                                {state.services.length>0 &&
                                    state.services.map((service)=>(
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