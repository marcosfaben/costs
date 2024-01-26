import { Link } from 'react-router-dom';

import Conteiner from './Conteiner';

import styles from './navbar.module.css'

import logo from '../../img/costs_logo.png'

function NavBar(){
    return(
        <nav className={styles.navbar}>
            <Conteiner>
                <Link to="/"><img src={logo} alt="logo"/></Link>
                <ul className={styles.list}>
                <li className={styles.item}><Link to="/home">Home</Link></li>
                <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                <li className={styles.item}><Link to="/company">Empresa</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
                </ul>
            </Conteiner>
        </nav>
    )
}

export default NavBar;