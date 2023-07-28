import {con} from '../connect.js';
import { Expose } from 'class-transformer';
import { IsNumber, IsString, IsDefined} from 'class-validator';
export class storageTipoDoc{
    @Expose({name: 'tipdoc_id'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro tipdoc_id no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro tipdoc_id es obligatorio"}}})
    tipdoc_id:number;
    @Expose({name: 'tipdoc_nombre'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro tipdoc_nombre no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro tipdoc_nombre es obligatorio"}}})
    tipdoc_nombre:string;
    @Expose({name: ' tipdoc_abreviatura'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro  tipdoc_abreviatura no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro  tipdoc_abreviatura es obligatorio"}}})
     tipdoc_abreviatura:string;    
    constructor(
        tipdoc_id:number = 0,
        tipdoc_nombre:string = "",
         tipdoc_abreviatura:string = "",
       ){
        this.tipdoc_id = tipdoc_id;
        this.tipdoc_nombre = tipdoc_nombre;
        this. tipdoc_abreviatura =  tipdoc_abreviatura;
      
    }
    
    set guardar(body:object){
        con.query(
          /*sql*/`INSERT INTO tipo_documento SET ?`,
          body,
          (err, data, fields)=>{
           console.log(err)
           console.log(fields)
        });
      }
  
      get obtener(){
        const cox = con.promise();
        return (async()=>{
          const [rows, fields] = await cox.execute(/*sql*/`SELECT * FROM tipo_documento`);
          return rows;
        })();
      }
  
      set eliminar (tipdoc_id: number){
        con.query(`DELETE FROM tipo_documento WHERE tipdoc_id =?`,
          tipdoc_id,
          (err, data, fields)=>{
            console.log(err)
            console.log(fields)
          });
      }
}