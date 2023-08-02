import { useEffect, useState } from 'react';
import styles from './Project.module.css'

//usar o hook useParams para pegar o id passado na url
import { useNavigate, useParams } from 'react-router-dom';

function Project(){

    const {id} = useParams()

    const[project, setProject] = useState({})

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


    

    return(
        <p>{project.name}</p>
    )
}

export default Project;