//Este hook permite que cuando se detecte un error no rompa con  el sistema si no que se enrute hacia este componente
import {useRouteError} from 'react-router-dom'

export default function ErrorPage() {

    //Lo colocamos en una variable para poder hacer uso del error que se ha presentado
    const error=useRouteError();
    console.log(error.message)
  return (
    <div className='space-y-8'>
        <h1 className='text-center text-6xl font-extrabold text-blue-900 mt-20'>ERROR</h1>
        <p className='text-center'>Hubo un error</p>
       {/*  error.mensaje unicamente obtiene el tipo de error o la razon del error esto hace que solo veamos ese mensaje de error y no toda la informacion de este */}
        <p className='text-center'>{error.statusText || error.message}</p>

    </div>
  )
}
