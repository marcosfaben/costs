import styles from './Loading.module.css'
import Loader from '../../img/loading.svg'

function Loading(){
    return(
        <div className={styles.loader_container}>
            <img src={Loader} alt="Loading" className={styles.loader}/>
        </div>
    )
}

export default Loading;