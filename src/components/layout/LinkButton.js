import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css'

function LinkButton(props){
    return(
        <Link to={props.to} className={styles.button}>{props.texto}</Link>
    )
}

export default LinkButton;