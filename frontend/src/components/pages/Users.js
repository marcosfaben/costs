import styles from '../project/ProjectCard.module.css'
import { useDispatch, useSelector } from "react-redux"
import rootReducer from "../../redux/root-reducer"
import UserCard from "../user/userCard"
import Conteiner from "../layout/Conteiner"
import UserActionTypes from '../../redux/user/actionTypes'
import { useEffect } from 'react'
import projectActionTypes from '../../redux/project/actionTypes'

function Users(){
    const dispatch = useDispatch()
    const { users } = useSelector(rootReducer=>rootReducer.useReducer)
    const { projects } = useSelector(rootReducer=>rootReducer.projectReducer)

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((resp)=>resp.json()
        ).then((data)=>dispatch({type: projectActionTypes.INSERT, payload: data}))
    }, [])

    function handleRemoveUser(idUser){
        let users2 = users
        users2 = users2.filter((user)=>user.id !== idUser)

        let projects2 = projects
        projects2 = projects2.filter((project)=>project.idUser == idUser)

        console.log("idUser: " + idUser)
        console.log(projects2)

        fetch(`http://localhost:5000/user/${idUser}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(dispatch({type: UserActionTypes.USERS, payload: users2})
        ).then(()=>{
            projects2.map((project) => {
                fetch(`http://localhost:5000/projects/${project.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                }).then(dispatch({ type: UserActionTypes.USERS, payload: users2 }))
            })
        })
        .catch((err)=> console.log("Erro ao conectar com o banco de dados: " + err))
    }

    return (
        <>
            <div className={styles.service_form_container}>
                            {!users && (
                                <p>Não há Usuários</p>
                            )}
                            {users && (
                                <div>
                                    <h2>Usuários:</h2>
                                    <Conteiner customClass="row">
                                    {users.map((user) => (
                                        <UserCard
                                            idUser={user.id}
                                            name={user.name}
                                            handleRemove={handleRemoveUser}
                                            key={user._id}
                                        />
                                    ))}
                                    </Conteiner>
                                </div>
                            )}
                        </div>
        </>
    )
}

export default Users