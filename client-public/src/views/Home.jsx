import Card from "../components/Card";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Home() {
    const [cuisines, setCuisines] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] =useState(1)
    const [currentPage, setCurrentPage] =useState(0)
    const [totalPage, setTotalPage] =useState(0)
    const [homePage, setHomePage] = useState('home')
    const [search, setSearch] =useState('')
    const [searchByCategories, setSearchByCategories] =useState('')
    const [sortBy, setSortBy] =useState('ASC')
    
    
    // const [newDetails, setNewDetails] =useState('')
    const navigate = useNavigate()
    
    
    
    
    const url = 'https://phase2-aio.vercel.app'
    
    const [categories, setCategories] = useState([])
    
    async function fetchCategories(){
        try {
            const {data} = await axios.get(`${url}/apis/pub/restaurant-app/categories`)
            setCategories(data.data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
            title: error.response.data.error,
        });
    }
}
    
    async function fetchCuisines() {
        try {
            // setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines?q=${search}&i=${searchByCategories}&limit=8&page=${page}&sort=${sortBy}`);
            setCuisines(data.data.query);
            setCurrentPage(data.data.pagination.currentPage)
            setTotalPage(data.data.pagination.totalPage)
            setHomePage('home')
            // console.log(data.data.query);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
        } 
        // finally {
            //     setLoading(false)
            // }
        }
        
        useEffect(() => {
            console.log('ini proses mounted, hanya dijalankan 1x di awal');
            fetchCategories()
            fetchCuisines();
    }, [search, searchByCategories, page, sortBy]) // mounted
    
    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
    }
    
    
    function searchOnChangeCategory(event) {
        let newCategories = event.target.value;
        // console.log(newCategories);
        setSearchByCategories(newCategories);
    }
    
    const handleClick = (data) => {
        navigate(`/detail/${data.id}`)
    }


    // function sort(event) {
        //     let newSort = event.target.value;
        //     console.log(newSort);
        //     setSortBy(newSort);
        // }
        
        // function newdetail(event){
            //     let newDetail = (event.target.value)
            //     console.log(newDetail);
            //     setNewDetails(newDetail)
            // }
            
            
            // function home(event) {
                //     let newHome = event.target.value;
    //     console.log(newHome);
    //     setHomePage(newHome)
    // }
    
    
    return (
        <>
            <div>
                <nav className="navbar bg-[#303c5c]">
                    <div className="flex-1">
                        <a onClick={() => {setHomePage('home')}} className="btn btn-ghost text-xl text-white">
                        Home
                        </a>
                    </div>
                    <div className="flex-1 form-control">
                        <form action="" method="get" className="flex justify-center items-center">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-bordered input-accent w-24 md:w-auto mx-1 input-sm"
                            onChange={searchOnChange}
                        />
                        </form>
                    </div>
                    <div className="flex-1">     
                        <details>
                            <summary>Categories List </summary>
                            <select className="bg-[#3d320b] rounded-non z-[1]"  onChange={searchOnChangeCategory} >
                                <option value="">All</option>
                                {categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.name} >
                                        {category.name}
                                    </option>
                                )
                                }                   
                                )}
                            </select>
                        </details>        
                    </div> 
                    <div className="flex-1">
                        <a onClick={() => {setSortBy('ASC')}} className="btn btn-ghost text-xl text-white">
                        Sort By ASC
                        </a>
                        <a onClick={() => {setSortBy('DESC')}} className="btn btn-ghost text-xl text-white">
                        Sort By DESC
                        </a>
                    </div>
                </nav>
            </div>
            <div id="PAGE-HOME" className="p-3"> 
                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <main className="grid grid-cols-2 gap-5 px-10 my-8">
                        {cuisines.map(cuisine => {
                            return <Card key={cuisine.id} cuisine={cuisine} />
                        })}
                    </main>
                    )
                } 
            </div >
            <div className="join">
                <button className="join-item btn" onClick={() => setPage((page) => page == 1 ? page + 0 : page - 1)}>Previous Page</button>
                <button className="join-item btn">{page}</button>
                <button className="join-item btn" onClick={() => setPage((page) => currentPage === totalPage ? page + 0 : page + 1)}>Next Page</button>
            </div>
        </>
    )
}                     