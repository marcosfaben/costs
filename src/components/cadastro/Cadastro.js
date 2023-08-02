import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './Cadastro.module.css'

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function Cadastro(){

    const [company, setCompany] = useState([])
    const navigate = useNavigate()

    function postCompany(company){
        const dadosEmpresa = 'http://localhost:5000/company'

        fetch(dadosEmpresa, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(company)
        }
        ).then(data => data.json()
        ).then(() => {
            navigate('/login', {state:{msg: 'Cadastro realizado com sucesso!', type: 'sucess'}})
        })
        .catch((err) => console.log("Erro para conectar com o bd de empresa: " + err))

    }

    function handleInput(e){
        setCompany({...company, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()
        postCompany(company)
    }
    
    return(


        <form className={styles.cadastro} onSubmit={submit}>
            <h1>Cadastre sua empresa</h1>
            <p>Crie o cadastro para sua empresa</p>
            <Input 
                type='text'
                text='Insira o nome da empresa'
                placeholder='Insira o nome'
                name='name'
                handleOnChange={handleInput}
            />
            <Input 
                type='number'
                text='Insira o cnpj da empresa'
                placeholder='Insira o cnpj'
                name='cnpj'
                handleOnChange={handleInput}
            />
            <Input 
                type='email'
                text='Insira o email da empresa'
                placeholder='exemplo@email.com'
                name='email'
                handleOnChange={handleInput}
            />
            <Input 
                type='password'
                text='Insira a senha da empresa'
                placeholder='Insira o senha'
                name='password'
                handleOnChange={handleInput}
            />
            <SubmitButton
                text='Cadastrar empresa'
            />
        </form>
    )
}

export default Cadastro;