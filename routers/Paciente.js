import {con} from '../connect.js'
import { Router } from "express";
import { appMiddlewarePaciente, appMiddlewarePacienteData } from "../middleware/middlewarePaciente.js"
const appPaciente = Router();

appPaciente.post("/", appMiddlewarePacienteData, (req, res) => {
      req.body.guardar = JSON.parse(req.data);
    res.json({status: 201, message: "Datos guardados"});
});

appPaciente.get('/', appMiddlewarePaciente, async(req, res) => {
    res.send(await req.body.obtener)
});

appPaciente.get("/alfabeticamente", appMiddlewarePaciente, (req,res)=>{
    con.query(`Select * from paciente ORDER BY pac_nombre_completo ;`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data);
  });
})


appPaciente.get("/:id", appMiddlewarePaciente, (req,res)=>{
    con.query(`SELECT * FROM paciente WHERE pac_id = ${req.params.id}`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data[0]);
  });
});

appPaciente.put("/:id", appMiddlewarePacienteData, (req,res)=>{
    con.query("UPDATE paciente SET ? WHERE id = ?", [JSON.parse(req.data), req.params.id], (err, data, fields)=>{
      if (err) res.status(500).send(err)
      console.log(data);
      res.json({status: 201, message: "Datos actualizados"});
  });
});

appPaciente.delete("/:id", appMiddlewarePaciente, (req,res)=>{
    req.body.eliminar = req.params.id;
    res.json({status: 201, message: "Datos eliminados"});
  });

export default appPaciente;