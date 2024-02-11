import { useState } from "react"
import Swal from "sweetalert2";
import axios from 'axios'
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home({url}) {
    const [cuisines, setCuisines] = useState([])
    const [loading, setLoading] =useState(false)

    const navigate = useNavigate()
    
    
    function currencyFormat(number) {
        return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            number)
        }
        
        async function fetchCuisines () {
            try {
                const {data} = await axios({
                url: `${url}/apis/restaurant-app/cuisines`, 
                method:"GET",
                headers: {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })
            setCuisines(data.data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.error,
                icon : `error`
            })
        }
    }
    
    async function deleteData (id) {
        try {
            const {data} = await axios({
                url: `${url}/apis/restaurant-app/cuisines/${id}`, 
                method:"delete",
                headers: {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })
            fetchCuisines()
        } catch (error) {
            console.log(error);
        }
    }
    
    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }

    function handlePatch(id) {
        navigate(`/patch/${id}`)
    }
    
    useEffect(() => {
        fetchCuisines()
    },[])

    
    return (
        <>
            <div>
                <Link to='/add' className="btn btn-ghost text-xl"> 
                    Add New Cuisine
                </Link>
            </div>
            <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                <tr>
                    <th>No</th> 
                    <th>Name</th> 
                    <th>Description</th> 
                    <th>Price</th> 
                    <th>ImgUrl</th> 
                    <th>Action</th> 

                </tr>
                </thead> 
                <tbody>
                    { cuisines.map((cuisine) => { 
                        return (                           
                                <tr key={cuisine.id}>
                                    <th>{cuisine.id}</th> 
                                    <td>{cuisine.name}</td> 
                                    <td>{cuisine.description}</td> 
                                    <td>{currencyFormat(cuisine.price)}</td> 
                                    <td><img src={cuisine.imgUrl} alt="image" /></td> 
                                    <td>
                                        <button onClick={() => handleEdit(cuisine.id)} className="btn btn-info">Edit</button>
                                        <br />
                                        <button onClick={() => handlePatch(cuisine.id)} className="btn btn-warning">Patch Picture</button>
                                        <br />
                                        <button onClick={() => {
                                            deleteData(cuisine.id)
                                        }} className="btn btn-error">Delete</button>
                                    </td>
                                </tr>       
                        )
                    }) }
                </tbody> 
            </table>
            </div>
        </>
    )
}
