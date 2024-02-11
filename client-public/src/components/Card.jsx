// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Card({cuisine}){
    // const [newDetails, setNewDetails] =useState('')
    // const [id, setId] =useState('id')
    let id  = cuisine.id
    const navigate = useNavigate()
    const hanldeDetails = (id) => {
        navigate(`detail/${id}`)
    }

    const url = 'https://phase2-aio.vercel.app'


    function currencyFormat(number) {
        return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            number)
     }

    return (<>
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img 
                    src= {cuisine.imgUrl}
                    alt="cuisines"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2>{cuisine.name}</h2>
                <p> {currencyFormat(cuisine.price)}</p>
                <div className="card-actions">
                <Link to={`/details/${id}`}>
                    <button className="btn btn-primary" onClick={() => {hanldeDetails(cuisine.id)}}>Details </button>
                </Link>
                </div>
            </div>
        </div>
    </>)
}