Creación del archivo

 `app.js`

`npm init -y`

Instalación de las dependencias 

```
npm i -E -D class-transformer class-validator dotenv express express-session jose mysql2 nodemon reflect-metadata typescript
```



Configuración de las variables de entorno

```
MY_SERVER={"hostname":"127.10.10.10", "port":8080} -> Configuracion del servidor

MY_CONNECTION={"host":"localhost", "user":"campus", "password":"campus2023", "database":"DentalDate", "port": 3306} -> Configuracion dela conexion a la base de datos

JWT_PRIVATE_KEY="CLAVEJWTCROSISOAS"-> Clave JWT
```



Creacion del tsconfig.json

```
npx tsc --init 
```

y se agrega el siguiente codigo

```
{ "compilerOptions": {  
"target": "es6",  
"module": "ES6",  
"moduleResolution": "node",  
"outDir": "./controller",  
"esModuleInterop": true,
"experimentalDecorators": true,
"emitDecoratorMetadata": true
}}
```



Configuracion del archivo package.json

```
"type":"module",
  "scripts": {
    "tsc":"tsc -w",
    "dev":"nodemon --quiet app.js"
  },
```



se empieza con la creacion del archivo app.js

estructura

```
import express  from "express";
import appPaciente from "./routers/Paciente.js";
import appTipoDoc from './routers/TipoDoc.js';
import appPacienteR from './routers/PacienteR.js';
import appJWT from "./routers/JWT.js";
import appMedico from "./routers/Medico.js";
import appCita from "./routers/Cita.js";
import appEps from "./routers/Eps.js";
import appHistoria from "./routers/Historia.js";
import appEspecialidad from "./routers/Especialidad.js";
import appConsultorio from "./routers/Consultorio.js";
import appTipoCita from "./routers/TipoCita.js";
import appEstado from "./routers/Estado.js";
import { validateJWT } from "./middleware/middlewareJWT.js";
import dotenv from "dotenv";

const appExpress = express();
dotenv.config();

appExpress.use(express.json());
appExpress.use("/token", appJWT);
appExpress.use("/medico", validateJWT, appMedico);
appExpress.use("/tipodoc", validateJWT, appTipoDoc);
appExpress.use("/paciente", validateJWT, appPacienteR);
appExpress.use("/cita", validateJWT, appCita);
appExpress.use("/eps", validateJWT, appEps);
appExpress.use("/historiaclinica", validateJWT, appHistoria);
appExpress.use("/especialidad", validateJWT, appEspecialidad);
appExpress.use("/consultorio", validateJWT, appConsultorio);
appExpress.use("/tipocita", validateJWT, appTipoCita);
appExpress.use("/estado", validateJWT, appEstado);

let config = JSON.parse(process.env.MY_SERVER);

appExpress.listen(config, () => {
  console.log(`Servidor activo en http://${config.hostname}:${config.port}`);
});

```

la idea es crear los routing que redirigen a los archivos de /routers pero como estos redirigen a los middlewares se tiene que crear la carpeta middleware y crear un middleware para cada tabla, pero como en esta se validan datos, se requiere hacer el DTO para los archivos, esto es util siempre y cuando tengas tiempo y los obligatorios es si tienes que hacer post



crear el archivo connect

```
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();
export const con = mysql2.createPool(JSON.parse(process.env.MY_CONNECTION));
```

y se crea la carpeta storage para realizar las clases de las tablas para su validacion





Una vez creado por lo menos uno se procede a correr el tsc 

`npm run tsc` 











luego se crea la carpeta middleware y se crean los archivos del middleware

```javascript
import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storagePacienteR} from '../controller/storagePacienteR.js'
import {validate} from 'class-validator';
const appMiddlewarePacienteRData = express();
const appMiddlewarePacienteR = express();

appMiddlewarePacienteRData.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storagePacienteR, req.body, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})
appMiddlewarePacienteR.use(async(req,res,next)=>{
    let json = Object.assign(req.data.interfaceData, req.body);
    try {
        let data = plainToClass(storagePacienteR, json, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export {
    appMiddlewarePacienteRData,
    appMiddlewarePacienteR
};
```

y aqui se cambia la ruta del storage y se importa la clase y se implementa en el codigo, luego se cambian el nombre del router teniendo en cuenta el get y el set



y posteriormente los routers

```
import {con} from '../connect.js'
import { Router } from "express";
import { appMiddlewarePacienteR, appMiddlewarePacienteRData } from "../middleware/middlewarePacienteR.js"
const appPacienteR = Router();

appPacienteR.post("/", appMiddlewarePacienteRData, (req, res) => {
      req.body.guardar = JSON.parse(req.data);
    res.json({status: 201, message: "Datos guardados"});
});

appPacienteR.get('/', appMiddlewarePacienteR, async(req, res) => {
    res.send(await req.body.obtener)
});

appPacienteR.get("/genero", appMiddlewarePacienteR, (req,res)=>{
    con.query(`SELECT genero, COUNT(*) as total
    FROM paciente
    GROUP BY genero;`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data);
  });
})


appPacienteR.get("/:id", appMiddlewarePacienteR, (req,res)=>{
    con.query(`SELECT p.id, td.nombre as documento, td.abreviacion, p.num_doc, p.nombres, p.apellidos, p.telefono, p.email, p.direccion, p.genero, p.fecha_nac, e.nombre as eps, e.abreviacion, hc.descripcion as historia_clinica 
    FROM paciente p
    JOIN tipodocumento td ON p.id_tipodoc = td.id 
    JOIN historiaclinica hc ON p.id_historiaclinica = hc.id 
    JOIN eps e ON p.id_eps = e.id 
    WHERE p.id = ${req.params.id}`, (err, data, fields)=>{
      if (err) res.status(500).send(err)
    res.send(data[0]);
  });
});

appPacienteR.put("/:id", appMiddlewarePacienteRData, (req,res)=>{
    con.query("UPDATE paciente SET ? WHERE id = ?", [JSON.parse(req.data), req.params.id], (err, data, fields)=>{
      if (err) res.status(500).send(err)
      console.log(data);
      res.json({status: 201, message: "Datos actualizados"});
  });
});

appPacienteR.delete("/:id", appMiddlewarePacienteR, (req,res)=>{
    req.body.eliminar = req.params.id;
    res.json({status: 201, message: "Datos eliminados"});
  });

export default appPacienteR;
```



una vez creado y si no se ha creado crear en el middleware el archivo middlewareJWT.js

```
import dotenv from 'dotenv';
import { SignJWT, jwtVerify } from 'jose';
import express from 'express';
import 'reflect-metadata'
import { plainToClass, classToPlain } from 'class-transformer';
import { storageMedicos } from '../controller/storageMedico.js';
import { storagePaciente } from '../controller/storagePaciente.js';
import { storageTipoDoc } from '../controller/storageTipoDoc.js';
import { storagePacienteR } from '../controller/storagePacienteR.js';
//import { storageCita } from '../controller/storageCita.js';
import { storageEps } from '../controller/storageEps.js';
import { storageHistoria } from '../controller/storageHistoria.js';
import { storageEspecialidad } from '../controller/storageEspecialidad.js';
import { storageConsultorio } from '../controller/storageConsultorio.js';
import { storageTipoCita } from '../controller/storageTipoCita.js';
import { storageEstado } from '../controller/storageEstado.js';

const tokenJWT = express();
const validateJWT = express();

dotenv.config("../");

tokenJWT.use(async (req, res, next) => {
    let inst ;
    switch (req.query.tabla) {
        case "medico":
            inst = plainToClass(storageMedicos, {}, {ignoreDecorators: true});
            break;
        case "tipodoc":
            inst = plainToClass(storageTipoDoc, {}, {ignoreDecorators: true});
            break;
        case "paciente":
            inst = plainToClass(storagePacienteR, {}, {ignoreDecorators: true});
            break;
         case "cita":
            inst = plainToClass(storageCita, {}, {ignoreDecorators: true});
            break;
        case "eps":
            inst = plainToClass(storageEps, {}, {ignoreDecorators: true});
            break;
        case "historiaclinica":
            inst = plainToClass(storageHistoria, {}, {ignoreDecorators: true});
            break;
        case "especialidad":
            inst = plainToClass(storageEspecialidad, {}, {ignoreDecorators: true});
            break;  
        case "consultorio":
            inst = plainToClass(storageConsultorio, {}, {ignoreDecorators: true});
            break;      
        case "tipocita":
            inst = plainToClass(storageTipoCita, {}, {ignoreDecorators: true});
            break;
        case "estado":
            inst = plainToClass(storageEstado, {}, {ignoreDecorators: true});
            break;    
        default:
            res.json({status: 406, message: "No se puede generar el token"});
            break;
    } 
    let interfaceData = classToPlain(inst);
    try {
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT({interfaceData});
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.data = jwt;
        next();
    } catch (error) {
        console.log(error);
    }
   
});

validateJWT.use(async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.json({status: 401, message: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData.payload;
        next();
    } catch (error) {
        res.json({status: 401, message: "Token caducado"});
    }
})
export {
    tokenJWT,
    validateJWT
};
```

 

y se modifica segun la tabla a acceder

se crea en router el archivo JWT.js

```
import {tokenJWT} from "../middleware/middlewareJWT.js";
import {Router} from 'express';
const appJWT = Router();

appJWT.get("/", tokenJWT, (req,res)=>{
    res.json({"TOKEN JWT" : req.data})
});

export default appJWT;
```

una vez creado eso se inserta en el app.js las correspondientes adiciones

```
import express  from "express";
import appJWT from "./routers/JWT.js";
import { validateJWT } from "./middleware/middlewareJWT.js";
import dotenv from "dotenv";

import appPaciente from "./routers/Paciente.js";



const appExpress = express();
dotenv.config();

appExpress.use(express.json());

appExpress.use("/token", appJWT);
appExpress.use("/paciente", validateJWT, appPaciente);


let config = JSON.parse(process.env.MY_SERVER);

appExpress.listen(config, () => {
    console.log(`Servidor activo en http://${config.hostname}:${config.port}`);
  });
  
```



deberia verse algo asi



















* POST/paciente

```javascript
{
    "id": 17,
    "num_doc": 145620912,
    "nombres": "Juancho",
    "apellidos": "Juarez",
    "id_tipodoc": 1,
    "telefono": 3005329012,
    "email": "juancho@example.com",
    "direccion": "Calle 233",
    "genero": "Masculino",
    "fecha_nac": "1970-04-25",
    "id_eps": 1,
    "id_historiaclinica": 7,
    "creado_el": "2023-03-26T07:34:04.000Z"
  }
```

* PUT/paciente/:id

```javascript
{
  "id": 17,
    "num_doc": 145620912,
    "nombres": "Juancho",
    "apellidos": "Juarez",
    "id_tipodoc": 1,
    "telefono": 3005329012,
    "email": "juancho.juarez@example.com",
    "direccion": "Calle 61 carrera 43",
    "genero": "Masculino",
    "fecha_nac": "1970-04-25",
    "id_eps": 2,
    "id_historiaclinica": 7,
    "creado_el": "2023-03-26T07:34:04.000Z"
 }
```

* DELETE/paciente/:id





get medico

* GET/ medico

Post medico

* POST/medico

```javascript
 {
    "id" : 23,
    "num_tarjetaprofesional": 123123123,
    "nombres" : "Juancho",
    "apellidos" : "De la espriella",
    "email": "Juancho.espriella@example.com",
    "genero" : "Masculino",
    "fecha_nac": "1988-06-22",
    "id_consultorio": 5,
    "id_especialidad": 2,
    "creado_el": "2023-03-27T07:14:04.000Z"
}
```



Funcionalidad GET/medico/especialidad

* Te muestra la cantidad de medicos que tienen una especialidad

```
http://127.10.10.10:5050/medico/especialidad
```





Post Cita 

```javascript
{
  "id":123,
  "fecha_cita": "2023-07-28 14:30:00",
  "descripcion": "Limpieza",
  "id_paciente": 987654321,
  "id_medico" : 3456789012,
  "id_tipocita" : 2,
  "id_estado" : 1,
  "creado_el" : "2023-07-26T14:00:00.000"
}
```



Funcionalidad GET/cita/medico/:num_tarjetaprofesional

* Te enlista las citas que tiene un medico 

```
http://127.10.10.10:5050/cita/medico/9876543210
```



Funcionalidad GET/cita/estado

* Te muestra la cantidad de citas que se encuentran en un estado 

```
http://127.10.10.10:5050/cita/estado
```







De momento se trabaja el PUT realizando la conexion en el mismo router y no en el DTO porque el metodo SET no admite mas de un parametro





* GET/tipocita

* POST/tipocita

  ```javascript
  {
      "id": 6,
      "nombre": "Pasaporte",
      "abreviacion": "PA"
   }
  ```

* PUT/tipodoc/:id

```javascript
{
    "id": 6,
    "nombre": "Passport",
    "abreviacion": "PAT"
 }
```

* DELETE/tipodoc/:id



Endpoint eps

* GET/eps

* POST/eps

  ```javascript
  {
    "id":7,
    "nombre": "Eps FAMISANAR",
    "abreviacion" : "FAMI-EPS",
    "regimen": "CONTRIBUTIVO"
  }
  ```

* PUT/tipodoc/:id

```javascript
{
  "id":7,
  "nombre": "Eps FAMISANAR",
  "abreviacion" : "FMSA",
  "regimen": "AMBOS REGIMENES"
}
```

* DELETE/tipodoc/:id



Endpoint historiaclinica

* GET/historiaclinica

* POST/historiaclinica

  * Lo puedes crear sin la necesidad del parámetro dirección ya que puede ser null

  ```javascript
  {
    "id": 12,
    "descripcion": "fractura visible en uno de sus dientes se acordo realizar una corona dental, se preparó el diente fracturado para la corona y tomó impresiones proceso satisfactorio",
    "creado_el": "2023-07-27T12:00:00.000"
  }
  ```

* PUT/historiaclinica/:id

```javascript
{
  "id": 12,
   "descripcion": "Se extrajo la muela para aliviar su malestar, se administró anestesia local y extrajo la muela del juicio",
  "creado_el": "2023-07-28T12:00:00.000"
}
```

* DELETE/historiaclinica/:id

```
http://127.10.10.10:5050/historiaclinica/12
```



Endpoint especialidad

* GET/especialidad

* POST/especialidad

  ```javascript
  {
    "id": 8,
    "nombre": "Patología maxilofacial y oral",
    "abreviacion": "PMFO"
  }
  ```

* PUT/especialidad/:id

```javascript
{
  "id": 8,
  "nombre": "Patología maxilofacial",
  "abreviacion": "PMF"
}
```

* DELETE/especialidad/:id

```
http://127.10.10.10:5050/especialidad/8
```





Endpoint consultorio

* GET/consultorio

  `http://127.10.10.10:5050/consultorio`

* POST/consultorio

  ```javascript
  {
      "id": 9,
      "nombre": "Consultorio I",
      "num_consultorio": 109
   }
  ```

* PUT/consultorio/:id

```javascript
{
    "id": 9,
    "nombre": "Consultorio Z",
    "num_consultorio": 119
 }
```

* DELETE/consultorio/:id

```
http://127.10.10.10:5050/consultorio/9
```



Endpoint tipocita

* GET/tipocita

  `http://127.10.10.10:5050/tipocita`

* POST/tipocita

  ```javascript
   {
    "id" : 6,
    "nombre": "Diseño de Sonrisa"
  }
  ```

* PUT/tipocita/:id

```javascript
{
    "id": 6,
    "nombre": "Tratamento Diseño de sonrisa"
 }
```

* DELETE/tipocita/:id

```
http://127.10.10.10:5050/tipocita/6
```



Endpoint estado

* GET/estado

  `http://127.10.10.10:5050/estado`

* POST/estado

  ```javascript
   {
      "id": 7,
      "nombre": "REQURIDO",
      "descripcion": "El paciente no se presentó a la cita programada."
    }
  ```

* PUT/estado/:id

```javascript
 {
    "id": 7,
    "nombre": "PRESENTE",
    "descripcion": "El paciente si se presentó a la cita programada."
  }
```

* DELETE/estado/:id

```
http://127.10.10.10:5050/estado/7
```