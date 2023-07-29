import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './Login.module.css';

export default function Login(){

    const [empresas, setEmpresas] = useState({})
    const [login, setLogin] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:5000/company", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        }).then((data) => data.json())
        .then((data) => {
            setEmpresas(data)
        })
    }, [])
    
    function handleOnChange(e){
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    function buscarEmpresa(e){
        var resp = "";
        e.preventDefault();
        const a = empresas.map((empresa) => {
            if(empresa.cnpj === login.cnpj && empresa.password === login.password){
                resp = "Achou a empresa"
            }
        })
        console.log(resp + " " + a)
        navigate('/')
    }

    return (
        <form className={styles.login} onSubmit={buscarEmpresa}>
            <Input
                text="Insira o CNPJ da empresa"
                type="text"
                placeholder="Insira o CNPJ"
                name="cpnj"
                handleOnChange={handleOnChange}
            />
            <Input
                text="Insira a senha"
                type="password"
                placeholder="Insira a senha"
                name="password"
                handleOnChange={handleOnChange}
            />
            <SubmitButton text="Entrar"/>
                
        </form>
    )
}
