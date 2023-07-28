import dotenv from 'dotenv';
import { SignJWT, jwtVerify } from 'jose';
import express from 'express';
import 'reflect-metadata'
import { plainToClass, classToPlain } from 'class-transformer';
import { storagePaciente } from '../controller/storagePaciente.js';
import { storageTipoDoc } from '../controller/storageTipoDoc.js';


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
            inst = plainToClass(storagePaciente, {}, {ignoreDecorators: true});
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