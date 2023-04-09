const { Pool } = require('pg')


const queries=require('./queries')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'blog',
    password: 'admin'
})

//ACCEDER A LAS ENTRADAS POR EMAIL
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getEntriesByEmail,[email])

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

const getAllEntries = async () => {

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

const createEntry = async(title, content, category, email) => {

    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.createEntryQuery, [title, content, category, email])
        result = data.rowCount
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result

}
//ELIMINAR UNA ENTRADA

const deleteEntry = async(id_entry)=>{

    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.deleteEntryQuery, [id_entry])
        result = data.rowCount
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}
//ACUALIZAR UNA ENTRADA

const updateEntry = async (id_entry) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.updateEntryQuery, [id_entry.title, id_entry.content, id_entry.id_entry])
        result = data.rowCount
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.release()
    }
    return result
}

module.exports={
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry
}

