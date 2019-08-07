const express = require('express');
const router = express.Router();


const Estudiante= require('./models/Estudiante');


router.get('/', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});


router.get('/:id', async (req, res) => {
  const Estudiante = await Estudiante.findById(req.params.id);
  res.json(Estudiante);
});


router.post('/', async (req, res) => {
  const { nombre1, nombre2,apellido1, apellido2, dirrecion } = req.body;
  const Estudiante = new Estudiante({nombre1, nombre2,apellido1, apellido2, dirrecion});
  await Estudiante.save();
  res.json({status: 'se guardado estudiante'});
});


router.put('/:id', async (req, res) => {
  const { nombre1, nombre2,apellido1, apellido2, dirrecion } = req.body;
  const newEstudiante = {nombre1, nombre2,apellido1, apellido2, dirrecion};
  await Estudiante.findByIdAndUpdate(req.params.id, newEstudiante);
  res.json({status: 'se ha actualizado'});
});

router.delete('/:id', async (req, res) => {
  await Estudiante.findByIdAndRemove(req.params.id);
  res.json({status: 'se ha borrado'});
});

module.exports = router;
