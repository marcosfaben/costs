import { useEffect, useState } from 'react';
import Conteiner from '../layout/Conteiner';
import Company from './Company';

function Companies(){
    
    const [companies, setCompanies] = useState([])
    useEffect(()=>{
        const bdcompany = 'http://localhost:5000/company'
        fetch(bdcompany,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(data=>setCompanies(data))
        .catch(err=>console.log("Erro ao tentar acessar dados das empresas: " + err))
    }, [])


    function deleteCompany(id){

        fetch(`http://localhost:5000/company/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(()=>{
            setCompanies(companies.filter((company)=>company.id !== id))
        })
    }
    return(
        <div>
            <h1>Companies</h1>
            <Conteiner>
            {
                companies.map((company)=>{
                    return (
                        <Company
                            id={company.id}
                            name={company.name}
                            email={company.email}
                            deleteCompany={deleteCompany}
                            key={company.id}
                        />
                    )
                })
            }
            </Conteiner>
        </div>
    )
}
export default Companies;