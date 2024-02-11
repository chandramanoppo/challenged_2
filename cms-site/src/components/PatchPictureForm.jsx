import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

export default function PatchPictureForm({ url, cuisine ,handleSubmit, nameProp }) {

    // const [image, setImage] = useState("")

    // const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (cuisine) {      
            setImage(cuisine.imgUrl)
        }
    }, [cuisine])

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${url}/apis/restaurant-app/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data.data)
        } catch (error) {
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (<>
        <form className=" grid grid-cols-2 gap-4 mt-4" onSubmit={(e) => handleSubmit(e, image)}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Image URL</span>
                </label>
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    placeholder="Image URL"
                    className="w-full input input-bordered input-primary"
                    value={image}
                />
            </div>
            <div>
                <button type="submit" className="w-full btn btn-accent">{nameProp}</button>
            </div>
        </form>
    </>)
}