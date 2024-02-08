import styles from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
function UserCard({idUser, name, handleRemove}){

    function remove(e){
        e.preventDefault()
        handleRemove(idUser)
    }

    return(
        <div className={styles.project_card}>
            <h4>Name: {name}</h4>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default UserCard;