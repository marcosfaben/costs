import Conteiner from "./Conteiner";
import {FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
                <ul className={styles.redessociais}>
                    <li><FaFacebook/></li>
                    <li><FaInstagram/></li>
                    <li><FaLinkedin/></li>
                </ul>
                <p className={styles.texto}><span>Costs</span> &#169; 2023</p>
            
        </footer>
    )
}

export default Footer;