const optsCrear = {
  descripcion: {
    demandOption: true,
    alias: "d",
    desc: "Descripción de la tarea por hacer"
  },
};

const optsActualizar = {
  completado: {
    alias: "c",
    default: true,
    desc: "Marca la tarea como completada o pendiente"
  },
};

const argv = require("yargs")
  .command("crear", "Crea una tarea por hacer", optsCrear)
  .command("actualizar", "Actualiza el estado completado de una tarea", {...optsActualizar, ...optsCrear})
  .command("listar", "Muestra una tarea por hacer")
  .command("borrar", "Elimina una tarea por hacer", optsCrear)
  .help().argv;

module.exports = {
  argv,
};
