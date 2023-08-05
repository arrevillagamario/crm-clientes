import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './components/Layout'
//Estoy importando el hook de action que tengo en la pagina de nuevo cliente
import NuevoCliente,{ action as nuevoClienteAction} from './pages/NuevoCliente'
//Estoy importando el hook de loader que tengo en la pagina de index
import Index, {loader as clientesLoader} from './pages/Index'
//importando hooks de react-router-dom
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import Editar,{loader as editarLoader, action as editarAction} from './pages/Editar'
import {action as actionEliminarCliente} from './components/Cliente'

//Aqui se crean las rutas a las que se redigiran las distintas paginas que se han creado
const router= createBrowserRouter([  
  {
    //El path es la ruta en este caso esta es la ruta principal
    path:'/',
    //El elemento es lo que se busca mostrar en este caso es un componente
    element: <Layout/>,
    //Children permite conservar la infromacion de la pagina quue esta enlazada a la ruta principal y sobre escribir a su vez las paginas que se agreguen dentro de children
    children: [
      {
        //Valida que exista algo
        index: true,
        element: <Index/>,
        //En loader se coloca el hook de loader que viene desde la pagina de index
        loader: clientesLoader,
        //Se invoca una pagina de error en caso de que algo salga mal en la pagina, esto con el objetivo de que se vea mejor esteticamente el error
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path:'/clientes/nuevo',
        element: <NuevoCliente/>,
        //En action se coloca el hook de action que viene desde la pagina de nuevo cliente
        action: nuevoClienteAction,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        //los 2 puntos permiten de que en este caso el clienteId pueda cambiar, es decir pueda pasarsele el id
        path:'/clientes/:clienteId/editar', 
        element:<Editar/>,
        loader:editarLoader,
        action:editarAction,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path:'/clientes/:clienteId/eliminar',
        errorElement:<ErrorPage></ErrorPage>,
        action: actionEliminarCliente
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* En vez de pasarle el app.jsx como se solia hacer en proyectos anteriores se le coloca el hook de router provider que recopila la informacion de el hook de createBrowseRouter */}
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
