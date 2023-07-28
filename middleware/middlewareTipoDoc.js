import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {storageTipoDoc} from '../controller/storageTipoDoc.js'
import {validate} from 'class-validator';
const appMiddlewareTipoDocData = express();
const appMiddlewareTipoDoc = express();

appMiddlewareTipoDocData.use(async(req,res,next)=>{
    try {
        let data = plainToClass(storageTipoDoc, req.body, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        req.data = JSON.stringify(data);
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})
appMiddlewareTipoDoc.use(async(req,res,next)=>{
    let json = Object.assign(req.data.interfaceData, req.body);
    try {
        let data = plainToClass(storageTipoDoc, json, { excludeExtraneousValues: true });
        await validate(data);
        req.body = data;
        next();
    } catch (err) {
        res.status(err.status).json(err)
    }
})

export {
    appMiddlewareTipoDocData,
    appMiddlewareTipoDoc
};