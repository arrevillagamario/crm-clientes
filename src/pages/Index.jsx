//Se importa el hook de useLoaderData que se utiliza para obtener los datos que se almacenan en la funcion de loader
import {useLoaderData} from 'react-router-dom'
import Cliente from '../components/Cliente';
//Se importa la funcion de get clientes que esta en la data de clientes la cual obtiene los datos de la rest api
import {getClientes} from '../data/Clientes'

export function loader(){
  //Se almacena y se retornan los datos de get clientes 
  const clientes=getClientes();
return clientes
}

function Index() {

  //Se almacena el hook de use loader en una variable y esta obtiene todo lo que retorne la funcion del loader (Esto ya esta estandarizado en react-router-dom)
  const clientes=useLoaderData();

  return (
    <>
      
    <h1 className="text-blue-900 font-black text-4xl">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

     {/*  Se valida la longitud de la variable de clientes para poder imprimir la tabla de clientes o mostrar un aviso de que aun no tiene nada el loader */}
      { clientes.length ?(  
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            
            {/* Se hace un map para recorrer clientes ya que es un arreglo pero se puede revisar en la db.json que esta estructurada como un arreglo, esto se hace para poder ir imprimiento cada uno de los registros en cada fila de la tabla  */}
            { clientes.map(cliente=>{

              //Se retorna el componente de cliente que es dinde se encuentra estructurada la tabla
              return <Cliente
                //Se le pasan los props a el componente de cliente para que este ppueda armar la tabla con la informacion de la rest api
                cliente={cliente}
                key={cliente.id}
              />
              })}
          </tbody>
        </table>
      ):(
        <p className='mt-10 text-center'>No hay clientes aun</p>
      ) } 
      
    </>
  )
}

export default Index