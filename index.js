const express = require("express");
const app = express();

const conexionDB = require("./conexion");

app.use(express.json());

//El nombre de la ruta
app.get("/estudiantes/:legajo", (pedido, respuesta) => {
    const legajo = parseInt(pedido.params.legajo);

    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection('estudiantes');
        controlador.find({legajo: legajo}).toArray()
        .then((filas) => respuesta.send(filas))
        .catch((error) => respuesta.send(error));
    })
});

app.post("/estudiantes/create", (pedido, respuesta) => {
    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection("estudiantes");
        controlador.insertOne(pedido.body)
        .then(respuesta.send("El registro se ha creado"))
        .catch((error) => respuesta.send(error));
    })
});

//Crear notas
app.post("/notas/create", (pedido, respuesta) => {
    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection("notas");
        controlador.insertOne(pedido.body)
        .then(respuesta.send("El registro se ha creado"))
        .catch((error) => respuesta.send(error));
    })
});

//Actualizar notas
app.put("/notas/:id/update", (pedido, respuesta) => {
    const id = parseInt(pedido.params.id);
    const nuevaNota = pedido.body;

    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection('notas');
        controlador.updateOne({id: id}, {$set: nuevaNota})
        .then((filas) => respuesta.send(filas))
        .catch((error) => respuesta.send(error));
    })
});

//Borrar notas
app.delete("/notas/:id/delete", (pedido, respuesta) => {
    const id = parseInt(pedido.params.id);

    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection('notas');
        controlador.deleteOne({id: id})
        .then((filas) => respuesta.send(filas))
        .catch((error) => respuesta.send(error));
    })
});

app.get("/notas/:codigo_curso/aprobados", (pedido, respuesta) => {
    const codigo = parseInt(pedido.params.codigo_curso);

    conexionDB()
    .then((conexion) => {
        const controlador = conexion.db().collection('notas');
        controlador.find({ codigo_curso: codigo, nota: { $gte: 6 } }).toArray()
        .then((filas) => respuesta.send(filas))
        .catch((error) => respuesta.send(error));
    })
});

app.listen(3000, () => {
    console.log("El servidor está en linea");
})