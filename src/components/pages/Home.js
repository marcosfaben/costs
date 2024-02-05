import imagem_home from '../../img/savings.svg'
import styles from './home.module.css'
import LinkButton from '../layout/LinkButton'

import { useSelector } from 'react-redux'
import rootReducer from '../../redux/root-reducer'

const Home = ({user}) => {

    const {currentUser} = useSelector(rootReducer => rootReducer.useReducer)

    return(
        <section className={styles.home_conteiner}>
            <h1>Bem-Vindo ao <span>Costs</span> {currentUser.name}</h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" texto="Criar projeto"/>
            <img src={imagem_home} alt="imagem home" />
        </section>
    )
}

export default Home;