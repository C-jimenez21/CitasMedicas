import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storagePaciente} from '../controller/storagePaciente.js'
import {validate} from 'class-validator';
const appMiddlewarePacienteData = express();
const appMiddlewarePaciente = express();

appMiddlewarePacienteData.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storagePaciente, req.body, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})
appMiddlewarePaciente.use(async(req,res,next)=>{
    let json = Object.assign(req.data.interfaceData, req.body);
    try {
        let data = plainToClass(storagePaciente, json, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export {
    appMiddlewarePacienteData,
    appMiddlewarePaciente
};