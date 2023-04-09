const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'blog',
    password: 'admin'
})

//ACCEDER A LOS AUTORES POR EMAIL
const getAuthByEmail = async (email) => {
    let client, result, data;
    try {
        client = await pool.connect()

        if (email) data = await client.query(queries.getAuthorByEmail, [email]);
        else data = await client.query(queries.getAllAuthors);

        result=data.rows

    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }

   return result

}


//ACCEDER A TODAS LAS ENTRADAS

const getAllAuthors = async () => {

    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getAllEntriesQuery)
        result = data.rows

        console.log(result)

    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result


}

//CREAR UNA ENTRADA

const createAuthor = async(name, surname, email, image) => {

    let client, result;
    try {
        client = await pool.connect()
       // const data = await client.query(queries.createEntryQuery, [title, content, category, email])
        result = await client.query(queries.createAuthor, [name, surname, email, image])
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result

}
//ELIMINAR UNA ENTRADA

const deleteAuthor = async(id)=>{

    let client, result;
    try {
        client = await pool.connect()
        //const data = await client.query(queries.deleteEntryQuery, [id_entry])
        result = await client.query(queries.deleteAuthor, [id])
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}
//ACUALIZAR UNA ENTRADA

const updateAuthor = async (name, surname, email, image, id) => {
    let client, result;
    try {
        client = await pool.connect()
        //const data = await client.query(queries.updateEntryQuery, [id_entry.title, id_entry.content, id_entry.id_entry])
        result = await client.query(queries.updateAuthor, [name, surname, email, image, id])
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}

module.exports={
    getAuthByEmail,
    getAllAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
}

