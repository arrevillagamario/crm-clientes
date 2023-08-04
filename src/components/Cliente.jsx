//useNavigate sirve para dirigir hacia otra pagina se recomienda hacerlo cuando un boton acciona esta funccion
import {useNavigate,Form} from 'react-router-dom'

//Se obtiene el props que viene desde el index el cual contiene la informacion del cliente 
const Cliente = ({cliente}) => {

    //Se utiliza el hook de use Navigate y se almacena en una variable 
    const navigate=useNavigate();

    //Se hace destructuring de los campos del prop de cliente
    const {id,nombre,telefono,email,empresa}=cliente

  return (
    <>
        {/* Esta es una tabla en la que se iran ordenando los datos que se obtienen de cliente */}
        <tr className="border-b">
            <td className='p-6'>
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p className=" text-gray-800">{empresa}</p>
            </td>
            <td className='p-6'>
                <p className=" text-gray-800">Telefono: {''}{telefono}</p>
                <p className=" text-gray-800">Email: {''}{email}</p>
            </td>
            <td className="p-6 flex gap-3">
                <button
                    className="text-blue-600 hover:text-blue-400 uppercase text-xs font-bold"
                    type="button"
                    //Aqui se acciona la funcion de navigate mediante un onClick y se especifica la ruta a la que se dirigira el boton en este caso lo que se hace es que se reemplaza la ruta de :clientes por el id del cliente en cuestion para que pueda enrutarse hacia el para que puedan hacerse cambios en ese cliente
                    onClick={()=>navigate(`/clientes/${id}/editar`)}
                >
                    Editar
                </button>

                <Form>
                    <button
                        className="text-red-600 hover:text-red-400 uppercase text-xs font-bold"
                        type="submit"
                    > 
                        Eliminar
                    </button>
                </Form>
                
            </td>
        </tr >
        
    </>
  )
}

export default Cliente