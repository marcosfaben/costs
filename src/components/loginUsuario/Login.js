import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useEffect, useReducer } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Message from "../layout/Message";

import styles from './Login.module.css';

import LinkButton from "../layout/LinkButton";

import { useSelector, useDispatch} from "react-redux";
import UserActionTypes from "../../redux/user/actionTypes";
import rootReducer from "../../redux/root-reducer";

export default function Login(){
    const {users} = useSelector(rootReducer=>rootReducer.useReducer)

    const navigate = useNavigate();

    const reducer = (state, action) =>{
        switch(action.type){
            case 'setLogin':
                return { ...state, login: action.payload }
        }
    }
    
    const [state, set] = useReducer(reducer, {
        login: []
    })

    const dispatch = useDispatch()

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
            dispatch({type: UserActionTypes.USERS, payload: data})
        })
        .catch(err=> console.log('Erro ao conectar com o banco de dados de usuarios: ' + err))
    }, [])
    
    function handleOnChange(e){
        set({type: 'setLogin', payload: {...state.login, [e.target.name]: e.target.value}})
    }
    
    
    function buscarUsuario(e){
        var resp = false;
        e.preventDefault();


        users.map((usuario) => {
            if(usuario.cnpj === state.login.cnpj && usuario.password === state.login.password){
                resp = true
                dispatch({type: UserActionTypes.LOGIN, payload: usuario})
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
