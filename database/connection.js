const mongoose = require('mongoose');
const connection = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/my_blog");
        console.log("conexion exitosa");
    }catch(error){
        console.log(error);
        throw new Error("No te has podido conectar a la base de datos")
    }
}

module.exports={
    connection
}