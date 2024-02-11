import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';


export default function Details(){

    const [newDetail, setNewDetail] = useState([])

    function currencyFormat(num) {
        return 'Rp.' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, ',')
     }

    const {id} = useParams()
    const url = 'https://phase2-aio.vercel.app'


    async function fetchDetailCuisines() {
        try {
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`);
            setNewDetail(data.data);
        } catch (error) {
            console.log(error);
        } 
       
        }

        useEffect(()=> {
            fetchDetailCuisines()
        }, [])


    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={newDetail.imgUrl}alt="Album"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{newDetail.name}</h2>
                    <p>{newDetail.description}</p>
                    <p>{currencyFormat(Number(newDetail.price))}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/`} className="btn btn-primary">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}