const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");


console.log("como estas? bien? hola");
//Conectar a la base de datos
connection();
//Crear servidor node
const app = express();
const puerto = 3900;
//configurar cors
app.use(cors());
//convertir bodi=y en obj js
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Crear rutas 
const routes_article = require('./routes/Article');
app.use('/', routes_article);

//Rutas Harcoded 
app.get("/test", (req, res)=>{
    console.log("se esta ejecutando la ruta test");
    return res.status(200).send({
        name:'Heiner',
        last_name:'Landero',
        title:'Frontend dev'
    })
    
})
app.get("/", (req, res)=>{
    console.log("Estas en el inicio");
    return res.status(200).send(
        '<h1>Esta prueba fue un exito</h1>'
    )
    
})

//Escuchar peticiones https

app.listen(puerto,()=>{
    console.log('servidor corriendo en el puerto '+ puerto );
});