import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";

export default function Edit({ url }) {
    const [cuisine, setCuisine] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchProduct() {
        try {
            const {data} = await axios({
                url: `${url}/apis/restaurant-app/cuisines/${id}`, 
                method:"GET",
                headers: {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })
            setCuisine(data.data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const dataAdded = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }

            await axios.put(`${url}/apis/restaurant-app/cuisines/${id}`, dataAdded, {
               headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
               }
            })

            Swal.fire({
                title: "successfully update",
                icon: "success"
            });

            navigate('/')
        } catch (error) {
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }

    return (
        <>
            <CategoryForm url={url} handleSubmit={handleSubmit} cuisine={cuisine} nameProp="Edit Cuisine" />
        </>
    )
}