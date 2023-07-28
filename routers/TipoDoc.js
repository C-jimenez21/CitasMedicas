import {con} from '../connect.js'
import { Router } from "express";
import { appMiddlewareTipoDoc, appMiddlewareTipoDocData } from "../middleware/middlewareTipoDoc.js"
const appTipoDoc = Router();

appTipoDoc.post("/", appMiddlewareTipoDocData, (req, res) => {
      req.body.guardar = JSON.parse(req.data);
    res.json({status: 201, message: "Datos guardados"});
});

appTipoDoc.get('/', appMiddlewareTipoDoc, async(req, res) => {
    res.send(await req.body.obtener)
});

appTipoDoc.get("/alfabeticamente", appMiddlewareTipoDoc, (req,res)=>{
    con.query(`Select * from tipo_documento ;`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data);
  });
})


appTipoDoc.get("/:id", appMiddlewareTipoDoc, (req,res)=>{
    con.query(`SELECT * FROM tipo_documento WHERE tipdoc_id = ${req.params.id}`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data[0]);
  });
});

appTipoDoc.put("/:id", appMiddlewareTipoDocData, (req,res)=>{
    con.query("UPDATE tipo_documento SET ? WHERE tipdoc_id = ?", [JSON.parse(req.data), req.params.id], (err, data, fields)=>{
      if (err) res.status(500).send(err)
      console.log(data);
      res.json({status: 201, message: "Datos actualizados"});
  });
});

appTipoDoc.delete("/:id", appMiddlewareTipoDoc, (req,res)=>{
    req.body.eliminar = req.params.id;
    res.json({status: 201, message: "Datos eliminados"});
  });

export default appTipoDoc;