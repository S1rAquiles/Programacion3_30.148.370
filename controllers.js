require('dotenv').config();
const multer = require('multer');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser= require('body-parser');

const path = require('path');
const baseDatos = require('./models/baseDeDatos.js');
const utils = require('./utils/uploadImg.js');
const {ADMIN,PASSWORD} = process.env;
let ext;
app.use(express.json());
let login= false;
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + utils.getContentType(ext))
  }
})

let upload = multer({ storage: storage });



app.use(express.static(__dirname+'/static'));

//-----------------------------------------------------------------
//Configuración del Servidor
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla
app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request
port = app.listen(5000);
console.log('Servidor corriendo en el puerto 5000 vamos fino, no explote creador');



//-----------------------------------------------------------
//enruptamiento
app.get('/',(req,res)=>{
  res.render('index.ejs')
});

app.get('/login',(req,res)=>{
res.render('iniciarSesion.ejs');
});


app.post('/login',(req,res)=>{

 const {admin,password} = req.body;

   if(admin =="gato" && password =="gato"){
    login=true;
    res.redirect('/productos');
   }else{
    login=false;
   res.redirect('/*');
   }

});
  

app.get('/add',(req,res)=>{
res.render('add.ejs');
});

//---------------------------------------------------------
app.get('/addImagen/:id',(req,res)=>{
baseDatos.getImagen(req,res);
});


app.post('/addImagen/:id',upload.single('img'),(req,res)=>{ 
baseDatos.aggIMG(req,res);
});


app.post('/addPost',(req,res)=>{   
baseDatos.aggDato(req,res);
});


app.get('/productos',(req,res)=>{
  baseDatos.mostrarProductos(req,res);
});
//-------------------------------------------------------
// GET /editamos/:id
app.get('/update/:id',(req, res) => {
baseDatos.mostrarUpdate(req,res);

});
//-------------------------------------------------------
// POST /editamos/:id
app.post('/update/:id', (req, res) => {
 baseDatos.update(req,res);
});
//-------------------------------------------------------
// GET /delete/:id
app.get('/delete/:id', (req, res) => {
 baseDatos.mostrarDelete(req,res);
});
//-------------------------------------------------------
// POST /delete/:id
app.post('/delete/:id', (req, res) => {
 baseDatos.deletee(req,res);
});
//------------------------------------------------------
app.get('/categorias', (req, res) => {
 baseDatos.getCategorias(req,res);
});
//-------------------------------------------------------
app.get('/addCategorias', (req, res) => {
 res.render('addcategoria.ejs');
});
//-------------------------------------------------------
app.post('/addcategorias', (req, res) => {
 baseDatos.postCategorias(req,res);
});
//-------------------------------------------------------
app.get('/updateCategoria/:id',(req,res)=>{
 baseDatos.mostrarUpdateC(req,res);
});
//-------------------------------------------------------
app.post('/updateCategoria/:id',(req,res)=>{
baseDatos.updateCateg(req,res);
});
//-------------------------------------------------------
app.get('/eliminarCategoria/:id',(req,res)=>{
baseDatos.deleteCategoriaGET(req,res);
})
//-------------------------------------------------------
app.get('/javier',(req,res)=>{
  console.log('mostrando pagina la cliente!');
baseDatos.ClientesGET(req,res);
})
//-------------------------------------------------------
app.post('/javier', (req, res) => {
 baseDatos.filtrar(req,res);
});
//-------------------------------------------------------
app.get('/clientico', (req, res) => {
 baseDatos.filtrar2(req,res);
});
//-------------------------------------------------------
app.get('/detalles/:id',(req,res)=>{
baseDatos.detalles(req,res);
});
//-------------------------------------------------------
app.get('/ruta', (req, res) => {
  const {nombre,codigo,precio,descripcion,calidad,cantidad,url} = req.query;

  let datos = {
    nombre:nombre,
    codigo:codigo,
    precio:precio,
    descripcion:descripcion,
    calidad:calidad,
    cantidad:cantidad,
    url:url
  }

  console.log(datos,'aun funciona');
  res.render('buscar.ejs',{result:datos});

});
//-------------------------------------------------------
app.get('/detalles/:id',(req,res)=>{
baseDatos.detalles(req,res);
});
//-------------------------------------------------------
//rutas que no existen
app.get('/*',(req,res)=>{
res.render('notfound.ejs');
});
//-------------------------------------------------------
