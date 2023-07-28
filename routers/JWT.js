import {tokenJWT} from "../middleware/middlewareJWT.js";
import {Router} from 'express';
const appJWT = Router();

appJWT.get("/", tokenJWT, (req,res)=>{
    res.json({"TOKEN JWT" : req.data})
});

export default appJWT;