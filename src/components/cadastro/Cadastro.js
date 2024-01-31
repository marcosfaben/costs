import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './Cadastro.module.css'

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function Cadastro(){

    const [user, setUser] = useState([])
    const navigate = useNavigate()

    function postUser(user){
        const dadosEmpresa = 'http://localhost:5000/user'

        fetch(dadosEmpresa, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        ).then(data => data.json()
        ).then(() => {
            navigate('/', {state:{msg: 'Cadastro realizado com sucesso!', type: 'sucess'}})
        })
        .catch((err) => console.log("Erro para conectar com o bd de usuarios: " + err))

    }

    function handleInput(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()
        postUser(user)
    }
    
    return(


        <form className={styles.cadastro} onSubmit={submit}>
            <h1>Cadastre o Usuário</h1>
            <p>Crie o cadastro para ser um usuário</p>
            <Input 
                type='text'
                text='Insira seu nome'
                placeholder='Insira o nome'
                name='name'
                handleOnChange={handleInput}
            />
            <Input 
                type='number'
                text='Insira seu cpf'
                placeholder='Insira o cpf'
                name='cpf'
                handleOnChange={handleInput}
            />
            <Input 
                type='email'
                text='Insira seu email'
                placeholder='exemplo@email.com'
                name='email'
                handleOnChange={handleInput}
            />
            <Input 
                type='password'
                text='Insira a senha'
                placeholder='Insira a senha'
                name='password'
                handleOnChange={handleInput}
            />
            <SubmitButton
                text='Cadastrar usuario'
            />
        </form>
    )
}

export default Cadastro;