import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useEffect, useReducer } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Message from "../layout/Message";

import styles from './Login.module.css';

import LinkButton from "../layout/LinkButton";

export default function Login(){
    const navigate = useNavigate();

    const reducer = (state, action) =>{
        switch(action.type){
            case 'setUsuarios':
                return {...state, usuarios: action.payload}
            case 'setLogin':
                return {...state, login: action.payload}
            default :
                return 'Esta ação não existe'
        }
    }
    
    const [state, dispatch] = useReducer(reducer, {
        usuarios: {},
        login: []
    })


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
            dispatch({type:'setUsuarios', payload: data})
        })
        .catch(err=> console.log('Erro ao conectar com o banco de dados de usuarios: ' + err))
    }, [])
    
    function handleOnChange(e){
        dispatch({type: 'setLogin', payload: {...state.login, [e.target.name]: e.target.value}})
    }
    
    function buscarUsuario(e){
        var resp = false;
        e.preventDefault();
        state.usuarios.map((usuario) => {
            if(usuario.cnpj === state.login.cnpj && usuario.password === state.login.password){
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
