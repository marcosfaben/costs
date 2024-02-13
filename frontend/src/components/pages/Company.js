function Company({id, name, email, deleteCompany}){

    const remove = (e) => {
        e.preventDefault()
        deleteCompany(id)
    }

    return(
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <p>{email}</p>
            <button onClick={remove}>Excluir</button>
        </div>
    )
}
export default Company;