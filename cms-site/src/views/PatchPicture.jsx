import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import PatchPictureForm from '../components/PatchPictureForm';


export default function PatchPicture({ url }) {
    const [image, setImage] = useState('')
    // const [cuisine, setCuisine] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()

    // async function fetchProduct() {
    //     try {
    //         const {data} = await axios({
    //             url: `${url}/apis/restaurant-app/cuisines/${id}`, 
    //             method:"GET",
    //             headers: {
    //                 Authorization : `Bearer ${localStorage.access_token}`
    //             }
    //         })
    //         setCuisine(data.data)
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             title: error.response.data.error,
    //             icon: "error"
    //         });
    //     }
    // }

    // useEffect(() => {
    //     fetchProduct()
    // }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append(`file`, image)
          
            await axios.patch(`${url}/apis/restaurant-app/cuisines/${id}`, formData, {
               headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
               }
            })

            Swal.fire({
                title: "Picture successfully change",
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
            <PatchPictureForm url={url} handleSubmit={handleSubmit} image={image} nameProp="Edit Picture" />
        </>
    )
}