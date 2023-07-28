import express  from "express";
import appJWT from "./routers/JWT.js";
import { validateJWT } from "./middleware/middlewareJWT.js";
import dotenv from "dotenv";


import appPaciente from "./routers/Paciente.js";
import appTipoDoc from "./routers/TipoDoc.js";

const appExpress = express();
dotenv.config();

appExpress.use(express.json());

appExpress.use("/token", appJWT);
appExpress.use("/paciente", validateJWT, appPaciente);
appExpress.use("/tipodoc", validateJWT, appTipoDoc);


let config = JSON.parse(process.env.MY_SERVER);

appExpress.listen(config, () => {
    console.log(`Servidor activo en http://${config.hostname}:${config.port}`);
  });
  