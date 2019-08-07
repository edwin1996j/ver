const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstudianteSchema = new Schema({
    nombre1:String,
    nombre2:String,
    apellido1:String,
    apellido2:String,
    direccion:String


});


var Estudiante = mongoose.model("Estudiante", EstudianteSchema);
module.exports = Estudiante;