import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Message from "../layout/Message";

import styles from './Login.module.css';

import LinkButton from "../layout/LinkButton";

export default function Login(){

    const [empresas, setEmpresas] = useState({})
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
        fetch("http://localhost:5000/company", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            setEmpresas(data)
        })
        .catch(err=> console.log('Erro ao conectar com o banco de dados das empresas: ' + err))
    }, [])
    
    function handleOnChange(e){
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    function buscarEmpresa(e){
        var resp = false;
        e.preventDefault();
        empresas.map((empresa) => {
            if(empresa.cnpj === login.cnpj && empresa.password === login.password){
                resp = true
            }
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

            <form className={styles.login} onSubmit={buscarEmpresa}>
                <Input
                    text="Insira o CNPJ da empresa"
                    type="text"
                    placeholder="Insira o CNPJ"
                    name="cnpj"
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
