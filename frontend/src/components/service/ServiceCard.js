import styles from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
function ServiceCard({idService, idProject, name, cost, description, handleRemove}){

    function remove(e){
        e.preventDefault()
        handleRemove(idService, idProject)
    }

    return(
        <div className={styles.project_card}>
            <h4>Name: {name}</h4>
            <p><span>Custo:</span> {cost}</p>
            <p><span>Descrição:</span> {description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;