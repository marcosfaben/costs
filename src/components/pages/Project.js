import {parse, v4 as uuid} from 'uuid' 

import { useEffect, useState } from 'react';
import styles from './Project.module.css'

//usar o hook useParams para pegar o id passado na url
import { useParams } from 'react-router-dom';

import Loading from '../layout/Loading';
import Conteiner from '../layout/Conteiner';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
//import ServiceForm from '../service/ServiceForm';
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard';

function Project(){

    const {id} = useParams()

    const[project, setProject] = useState({})

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServices, setShowServices] = useState(false)

    const [msg, setMsg] = useState('')
    const [typeMsg, setTypeMsg] = useState('')

    const [services, setServices] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>resp.json())
        .then((data)=>{
            setProject(data)
            setServices(data.services)
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServices(){
        setShowServices(!showServices)
    }


    function editPost(project){
        setMsg('')

        if(project.budget < project.cost){
            setMsg('O orçamento não pode ser menor que os custos do projeto!')
            setTypeMsg('error')
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
            setProject(data)
            setShowProjectForm(false)
            setMsg('Projeto atualizado!')
            setTypeMsg('sucess')
        })
        .catch((err)=>{
            console.log('Erro ao atualizar o projeto: ' + err)
            setMsg('Erro na atualização!')
            setTypeMsg('error')
        })
       console.log(project)
    }

    function insertServices(project){
        setMsg('')
        
        const lastService = project.services[project.services.length - 1]
        
        lastService.id = uuid()

        const sumCost = project.services.reduce((a, b)=>a+parseFloat(b.cost), 0)
        
        if(sumCost > parseFloat(project.budget)){
            setMsg("Orçamento ultrapassado, verifique o valor do serviço")
            setTypeMsg('error')
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
        .then((data)=> setServices(data.services))
        .catch((err)=>console.log("Erro na atualização dos serviços do projeto" + err))

    }

    function handleRemoveService(idService, idProject){

       let proj = project

       proj.services = proj.services.filter((service)=> service.id !== idService)

       //atualizar custo
       //proj.cost = proj.reduce

       fetch(`http://localhost:5000/projects/${idProject}`,{
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proj)
        }).then((resp)=>resp.json())
        .then((data)=>{
            setProject(proj)
            setServices(data.services)
            setMsg("Serviço excluido com sucesso")
            setTypeMsg('sucess')
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de projetos: " + err)
        })
    }

    return(
        <>
            {project.name ? (
                    <div className={styles.project_details}>
                        <Conteiner customClass="column">

                            {msg && (
                                <Message msg={msg} type={typeMsg} />    
                            )}

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
                                        <ProjectForm handleSubmit={editPost} btnText="Atualizar projeto" projectData={project}/>
                                    </div>
                                )}
                            </div>
                            <div className={styles.service_form_container}>
                                    <h2>Adicione um serviço:</h2>
                                    <button className={styles.btn} onClick={toggleServices}>
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