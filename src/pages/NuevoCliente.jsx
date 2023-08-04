/*
  El useNavigate se utiliza para redirigir hacia alguna pagina del proyecto mdeiante una accion que desate un boton

  El form es un componente  que se utiliza para poder ponerle metodos con peticiones http lo que permite que la informacion que se introduzca y se envie en el formulario pueda navegar mediante peticiones http

  El hook de useActionData obtenemos lo que nos retorna la funcion  action

  redirect funciona para redireccionar hacia otra pagina, mayor mente se utiliza cuando una accion termina
*/
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
//Se importa la funcion de addClientes que es la que permite añadir los datos hasta la rest api
import {addClientes} from '../data/Clientes'



//Se crea una funcion asincrona que es la que almacena la action y toma como parametro un request
export async function action({request}){

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

  //Se realiza un await para invocar la funcion de agregar clientes la cual enviara los datos obtenidos luego de ser validados y los enviara hacia el archivo donde tenemos la funcion
  await addClientes(datos)
   
  //Lo que retornamos es una redireccion de vuelta a la pagina principal
  return redirect('/')


  //Estas son formas de obtener los datos del request
 /*  return <> 
    {console.log(formData.get('nombre'))}
    {console.log(datos)}
   {console.log([...formData])}
   </> */
}




const NuevoCliente = () => {

  //Aqui almacenamos el hook de useNavigate
  const navigate=useNavigate();

  //Mediante useActionData obtenemos lo que nos retorna la funcion  action
  const actionData=useActionData();

  console.log(actionData)
  return (
    <>
      <h1 className="text-blue-900 font-black text-4xl">Nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para llenar un nuevo cliente</p>
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
        <Formulario/>
          <input 
            type="submit" 
            className='mt-5 w-full p-3 bg-blue-800  uppercase font-bold text-white text-lg cursor-pointer hover:bg-blue-500'
            value='Registrar Cliente' />
        </Form>
      </div>
      
    </>
  )
}

export default NuevoCliente