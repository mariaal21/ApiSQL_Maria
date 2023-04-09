const {getEntriesByEmail, createEntry, deleteEntry, updateEntry, getAllEntries}=require('../models/entries')

const getEntries=async(req,res)=>{
    let data;
    try {
        let email=req.query.email
        if( email){
            data=await getEntriesByEmail(email)
        }else{
            data=await getAllEntries()
        }
        res.status(200).json({
            ok:true,
            data
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'error al obtener las entradas'
        })
    }
  
}



const createEntries=async(req,res)=>{

        const {title, content, category, email} =req.body

    try {
        await createEntry(title, content, category, email);
        res.status(200).json({
            ok:true,
            mgs: 'Entrada creada'
        })
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:'error al crear la entrada'
        })

    }
}

const deleteEntries=async(req,res)=>{
    const { id_entry } = req.body;

    console.log(id_entry)

    try {
        await deleteEntry(id_entry);
        res.status(200).json({
          ok: true,
          msg: 'Entrada eliminada exitosamente',
        });
      } catch (error) {
        res.status(500).json({
          ok: false,
          msg: 'Error al eliminar la entrada',
        });
      }
}
const updateEntries=async(req,res)=>{

    const { id_entry } = req.body;
    const { title, content } = req.body;
    try {

        await updateEntry(id_entry, title, content);
        res.status(200).json({
          ok: true,
          msg: 'Entrada actualizada exitosamente',
        });
      } catch (error) {
        res.status(500).json({
          ok: false,
          msg: 'Error al actualizar la entrada',
        });
      }
}
module.exports={
    getEntries,
    createEntries,
    deleteEntries,
    updateEntries
}

