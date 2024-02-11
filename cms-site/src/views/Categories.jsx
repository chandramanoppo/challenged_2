import { useState } from "react"
import Swal from "sweetalert2";
import axios from 'axios'
import { useEffect } from "react";


export default function Categories({url}) {
    const [categories, setCategories] = useState([])

    async function fetchCategories () {
        try {
            const {data} = await axios({
                url: `${url}/apis/restaurant-app/categories`, 
                method:"GET",
                headers: {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
        })
            setCategories(data.data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.error,
                icon : `error`
            })
        }
    }
    
    useEffect(() => {
        fetchCategories()
    },[])


    return (
        <>
            <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                <tr>
                    <th>No</th> 
                    <th>Name</th> 
                </tr>
                </thead> 
                <tbody>
                    { categories.map((category) => { 
                        return (
                            <>
                                <tr>
                                    <th>{category.id}</th> 
                                    <td>{category.name}</td> 
                                </tr>       
                            </>
                        )
                    }) }
                </tbody> 
            </table>
            </div>
        </>
    )
}
