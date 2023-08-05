//Esta funcion hace la conexion de nuestra rest api para obtener los datos de esta
export async function getClientes() {

    //Hacemos un await y por medio del fetch accedemos a la api que tenemos almacenda en el servidor a la cual podemos acceder mediante su variable de entorno que tenemos ya configurada en el archivo .env de esta manera (import.meta.env.VITE_API_URL)
    const respuesta=await fetch(import.meta.env.VITE_API_URL)

    //Obtenemos el resultado en formato json y despues lo retornamos
    const resultado=await respuesta.json()

    return resultado
}

//Funcion que permite editar el registro que este seleccionado le agregamos un campo de id que es el que recibira del registro que queremos cambiar
export async function getClientesEditar(id) {

    //En el fetch tenemos que colocar la url mediante las variables de entorno anteriormente configurada en  el archivo .env y seguido de eso una pleca junto con el id que reciba como parametro
    const respuesta=await fetch(`${import.meta.env.VITE_API_URL}/${id}`)

    //Obtenemos el resultado en formato json y despues lo retornamos
    const resultado=await respuesta.json()

    return resultado
}

//Esta funcion permitira añadir los registros hacia nuestra rest api
export async function addClientes(datos){

    //Abrimos un try catch en caso de error al añadir
    try {
        
        //Nos conectamos a nuestra api de nuevo con la diferencia de que colocamos una coma y luego de eso agregamos el metodo de post el cual nos prmite agregar algo a nuestra api
        const respuesta= await fetch(import.meta.env.VITE_API_URL,
            { method: 'POST',

            //con Json stringfy formateamos nuestro objeto que recibimos como parametro a un formato json
             body: JSON.stringify(datos),

             //le agregamos los headers que son un estandar para json
             headers:{
                'Content-Type':'application/json'
             }
            })

        //Con esta sintaxis ejecutamos la peticion
        await respuesta.json()
        
    } catch (error) {
        console.log(error.message)
    }
}

export async function reloadCliente(id,datos){
     //Abrimos un try catch en caso de error al añadir
     try {
        
       //Aqui debemos colocar templates strings ya que debemos de colocar el id en la ruta y en vez de colocar el metodo post que es para añadir colocamos el metodo put que es para editar
        const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`,
            { method: 'PUT',

            //con Json stringfy formateamos nuestro objeto que recibimos como parametro a un formato json
             body: JSON.stringify(datos),

             //le agregamos los headers que son un estandar para json
             headers:{
                'Content-Type':'application/json'
             }
            })

        //Con esta sintaxis ejecutamos la peticion
        await respuesta.json()
        
    } catch (error) {
        console.log(error.message)
    }
}

export async function eliminarCliente(id){
     //Abrimos un try catch en caso de error al añadir
     try {
        
        //Aqui debemos colocar templates strings ya que debemos de colocar el id en la ruta y en vez de colocar el metodo post que es para añadir colocamos el metodo put que es para editar
         const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`,
         //En este caso el comando http que se debe de utilizar es el de delete para poder borrar ese id
             { method: 'DELETE'
             })
 
         //Con esta sintaxis ejecutamos la peticion
         await respuesta.json()
         
     } catch (error) {
         console.log(error.message)
     }
}
