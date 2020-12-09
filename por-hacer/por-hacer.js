const fs = require("fs");

let listadoPorHacer = [];

function crear(descripcion) {
  cargarDB();

  const porHacer = {
    descripcion,
    completado: false,
  };

  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
}

function guardarDB() {
  const data = JSON.stringify(listadoPorHacer);
  fs.writeFile("db/data.json", data, (err) => {
    if (err) throw `No se pudo grabar: ${err}`;
  });
}

function cargarDB() {
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
}

function getListado() {
  cargarDB();
  return listadoPorHacer;
}

function actualizar(descripcion, completado = true) {
  cargarDB();

  const index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );

  if (index !== -1) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }
  return false;
}

function borrar(descripcion) {
  cargarDB();
  let tareaBorrada = false;
  listadoPorHacer = listadoPorHacer.filter((tarea) => {
    if (tarea.descripcion !== descripcion) {
      return true;
    }
    tareaBorrada = true;
    return false;
  });

  guardarDB();
  return tareaBorrada;
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar,
};
