import axios from "axios"
import { useNavigate } from "react-router-dom"
import CategoryForm from "../components/CategoryForm"
import Swal from "sweetalert2"


export default function Add({url}) {
    const navigate = useNavigate()

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const dataAdd = {name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId}

            const {data} = axios.post(`${url}/apis/restaurant-app/cuisines`, dataAdd, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(data);
            navigate('/')

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }

    }


    return (
        <>
            <CategoryForm url={url} handleSubmit={handleSubmit} nameProp="Add Product" />
        </>
    )
}