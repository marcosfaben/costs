import { Link, useActionData } from 'react-router-dom';

import Conteiner from './Conteiner';

import styles from './navbar.module.css'

import logo from '../../img/costs_logo.png'

import rootReducer from '../../redux/root-reducer';
import { useSelector, useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/actionTypes';

function NavBar(){
    //pega o currentUser do rootReducer na pasta user
    const {currentUser} = useSelector(rootReducer => rootReducer.useReducer)

    const dispatch = useDispatch()

    const handleLoginClick = () => {
        if(currentUser){
            dispatch({type: UserActionTypes.LOGOUT})
        }
    }

    console.log(currentUser)

    return(
        <nav className={styles.navbar}>
            <Conteiner>
                <Link to="/"><img src={logo} alt="logo"/></Link>
                <ul className={styles.list}>
                <li className={styles.item}><Link to="/home">Home</Link></li>
                <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                <li className={styles.item}><Link to="/company">Empresa</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
                {!currentUser ? (
                        <li className={styles.item} onClick={handleLoginClick}><Link to="/">Login</Link></li>
                    ) : (
                        <li className={styles.item} onClick={handleLoginClick}><Link to="/">Sair</Link></li>
                    )
                }
                </ul>
            </Conteiner>
        </nav>
    )
}

export default NavBar;