import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Message from "../layout/Message";

import styles from './Login.module.css';

import LinkButton from "../layout/LinkButton";

export default function Login(){

    const [usuario, setUsuario] = useState({})
    const [login, setLogin] = useState([])
    const navigate = useNavigate();
    
    let msg = ''
    let type = ''
    const location = useLocation()
    if(location.state){
        msg = location.state.msg
        type = location.state.type
    }

    useEffect(()=>{
        fetch("http://localhost:5000/user", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            setUsuario(data)
        })
        .catch(err=> console.log('Erro ao conectar com o banco de dados de usuarios: ' + err))
    }, [])
    
    function handleOnChange(e){
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    function buscarUsuario(e){
        var resp = false;
        e.preventDefault();
        usuario.map((usuario) => {
            if(usuario.cnpj === login.cnpj && usuario.password === login.password){
                resp = true
            }
            return resp
        })
        if(resp){
            navigate('/home')
        }
        
    }

    return (
        <>

            {msg && (
                <Message msg={msg} type={type}/>
            )}

            <form className={styles.login} onSubmit={buscarUsuario}>
                <Input
                    text="Insira seu CPF"
                    type="text"
                    placeholder="Insira o CPF"
                    name="cpf"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Insira a senha"
                    type="password"
                    placeholder="Insira a senha"
                    name="password"
                    handleOnChange={handleOnChange}
                />
                <div className={styles.botao}>
                    <SubmitButton text="Entrar"/>
                    <LinkButton to="/cadastro" texto="Cadastrar"/>
                </div>  
            </form>
        </>
    )
}
