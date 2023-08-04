//Importamos la funcion de edicion en el archivo de clientes
import{getClientesEditar,reloadCliente}from '../data/Clientes'
import {useNavigate,useLoaderData, useActionData,Form,useRouteError, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

//Se hace un loader para bajar el id de editar se le pasa en automatico params el cual nos retornara el id del registro que seleccionemos
export async function loader({params}){

    //Hay que tomar el campo del id que se encuentra dentro de params es importante colocar esta funcion con un await ya que toda funcion asincrona debe llevar await
    const cliente= await getClientesEditar(params.clienteId)
    
    //Evaluamos y validamos que el clientes no este vacio y si a caso esta vacio generamos una nueva respuesta personalizada
    if (Object.values(cliente).length===0) {

        //De esta manera throw new response es como se cambia el mensaje de error
        throw new Response('',{
            //Seleccionamos el estado de error
            status: 404,
            //Con esta propiedad cambiamos el texto del error
            statusText:'Este cliente no existe'
        })
    }
    return cliente
}

//En este caso ademas del request necesitamos los params que son los que nos indican que registro es en el que estamos situados
export async function action({request,params}){
   //Dentro del objeto de action se encuentra el formData que es el que accede a los datos que se obtienen mediante request
   const formData= await(request.formData())
  
   //Para obtener el objeto entero desde el form data del request se hace uso del tipo de dato que se obtiene en este caso es un objeto y de la propiedad fromEntries, esto almacena el objeto de lo que se ha enviado del formulario
   const datos=Object.fromEntries(formData)
 
   //Para obtener un solo campo del objeto se hace por medio de la propiedad get y se especifica el campo entre comillas 
   const email=formData.get('email') 
 
 
   const errores=[];
 
   //validacion
   if (Object.values(datos).includes('')) {
     errores.push('Todos los campos son obligatorios')
   }
 
   //Esta es una expresion regular para validar que un correo sea valido (Recomiendo utilizarla para proyectos que lleven un registro)
   let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
 
   //Se valida si la expresion regular se cumple, como en principio no se cumple el valor que arroja es un false, por lo tanto no se ejecutaria la funsion sin embargo si agregamos ! el estado cambia de false a true por lo que ya se ejecutara
   if (!regex.test(email)) {
     errores.push('El E-mail no es válido')
   }
 
   //retornar datos de la validacion, se valida que errores tenga algo para poder retornarlos, si no tiene nada no se retornara nada
   if (Object.keys(errores).length) {
     
     return errores
   }
 
   //Debemos actualizar el cliente en vez de agregarlo con la funcion de reloadCliente
   await reloadCliente(params.clienteId, datos)
    
   //Lo que retornamos es una redireccion de vuelta a la pagina principal
   return redirect('/')
}

export default function Editar() {

    const navigate=useNavigate();

    const actionData=useActionData();

    const error=useRouteError();
    //Se almacena lo obtenido de la funcion loader
    const loaderData=useLoaderData();

    console.log(loaderData)

  return (
    <>
        <h1 className="text-blue-900 font-black text-4xl">Editar cliente</h1>
      <p className="mt-3">Modifica los datos del cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white uppercase font-bold px-3 py-2 hover:bg-blue-500"
          onClick={()=>navigate(-1)}
        >
          Volver
        </button>
        
      </div>
      <div className='bg-white shadow rounded-md md: w-3/4 mx:auto px-5 py-10 mt-20 '>


       {/*  Esta linea de codigo se puede leer como un 'sino' es decir si action data no tiene una longitud entonces... en este caso se colocaria el componente de error */}
        {actionData?.length && actionData.map((error,i)=><Error key={i}>{error}</Error>)}

        <Form 
          //El method post es una http request que permite añadir lo que este en el formulario
          method='post'
          //noValidate ignora las validaciones de html5 que trae por ddefecto esto con el fin de que se muestre nuestro error y no el que trae por defecto html
          noValidate
        >
        <Formulario
        cliente={loaderData}
        />
          <input 
            type="submit" 
            className='mt-5 w-full p-3 bg-blue-800  uppercase font-bold text-white text-lg cursor-pointer hover:bg-blue-500'
            value='Modificar Cliente' />
        </Form>
      </div>
        
    </>
  )
}
