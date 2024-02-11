
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Swal from "sweetalert2";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Categories from "../views/Categories";
import Add from "../views/Add";
import Edit from "../views/Edit";
import PatchPicture from "../views/PatchPicture";


const url = 'https://phase2-aio.vercel.app'

const router = createBrowserRouter([
    {
        path: `/login`,
        element : <Login url={url} />,
        loader: () => {
            if (localStorage.access_token) {
                Swal.fire({
                    title: 'What u doing m8',
                    icon: 'question'
                });
                return redirect('/')
            }

            return null
        },
    },
    {
        element: <BaseLayout />,
        loader : () => {
            if(!localStorage.access_token){
                Swal.fire({
                    title: 'What u doing m8',
                    icon: 'question'
                });
                return redirect('/login')
            }
            return null

        },
        children: [
            {
                path: '/',
                element : <Home url={url}/>
            },
            {
                path: '/categories',
                element : <Categories url={url} />
            },
            {
                path: '/add',
                element : <Add url={url}/>
            },
            {
                path: '/edit/:id',
                element : <Edit url={url}/>
            },
            {
                path: '/patch/:id',
                element : <PatchPicture url={url}/>
            },
        ]
    }

]);

export default router