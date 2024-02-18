import { useDispatch, useSelector } from "react-redux";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import ServiceCard from "../service/ServiceCard";
import styles from './Categories.module.css'


import { useEffect, useState } from "react";
import rootReducer from "../../redux/root-reducer";
import categoryActionTypes from "../../redux/category/actionTypes";
import CategoryCard from "../category/categoryCard";
import Conteiner from "../layout/Conteiner";

const Categories = () => {

    //const [showCategoryForm, setCategoryForm] = useState(false)
    const [category, setCategory] = useState(null)

    const [cont, setCont] = useState(0)

    const {categories, showForm} = useSelector(rootReducer=>rootReducer.categoryReducer)
    const dispatch = useDispatch()

    function handleInput(e){
        setCategory({...category, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        fetch('http://localhost:5000/categories',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then((resp)=>resp.json()
        ).then((data)=>dispatch({type: categoryActionTypes.INSERT, payload: data}))
    }, [cont])

    function postCategory(){
        fetch('http://localhost:5000/categories',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        }).then(()=>{
            setCont((cont) => cont + 1)
        }).catch((err)=>console.log("Erro ao conectar com categorias: " + err))  
    }

    function handleRemoveCategory(idCategory){

        fetch(`http://localhost:5000/categories/${idCategory}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=>resp.json())
        .then((data)=>{
            setCont((cont) => cont + 1)
            dispatch({type: "setMsg", payload: "Serviço excluido com sucesso"})
            dispatch({type: "setTypeMsg", payload: "sucess"})
        })
        .catch((err)=>{
            console.log("Erro ao puxar dados do banco de categorias: " + err)
        })
    }
    

    function submit(e){
        e.preventDefault()
        postCategory()
    }
    
    return (
        <>
        <button className={styles.btn} onClick={() => { dispatch({ type: categoryActionTypes.SHOWCATEGORY }) }}>Mostrar Formulário de Categorias</button>
        {showForm && (

                <form className={styles.cadastro} onSubmit={submit}>
                    <h1>Insira a Categoria</h1>
                    <p>Crie o uma categoria de projeto</p>
                    <Input
                        type='text'
                        text='Insira seu nome'
                        placeholder='Insira o nome'
                        name='name'
                        handleOnChange={handleInput}
                    />
                    <SubmitButton
                        text='Cadastrar usuario'
                    />
                </form>
        )}
        
                        <div className={styles.service_form_container}>
                            {!categories && (
                                <p>Não há Categorias</p>
                            )}
                            {categories && (
                                <div>
                                    <h2>Categorias:</h2>
                                    <Conteiner customClass="row">
                                    {categories.map((category) => (
                                        <CategoryCard
                                            idCategory={category._id}
                                            name={category.name}
                                            handleRemove={handleRemoveCategory}
                                            key={category._id}
                                        />
                                    ))}
                                    </Conteiner>
                                </div>
                            )
                                
                            }
                        </div>
        </>
    )
}

export default Categories;