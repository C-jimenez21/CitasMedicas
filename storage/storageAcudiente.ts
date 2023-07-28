import {con} from '../connect.js';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsEmail, IsDefined, MinLength,IsDate, IsRFC3339} from 'class-validator';
export class storageAcudiente{
    @Expose({name: 'acu_id'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro acu_id no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_id es obligatorio"}}})
    acu_id:number;
    @Expose({name: 'acu_tipodoc'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro acu_tipodoc no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_tipodoc es obligatorio"}}})
    acu_tipodoc:number;
    @Expose({name: 'acu_nombre_completo'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro acu_nombre_completo no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_nombre_completo es obligatorio"}}})
    acu_nombre_completo:string;
    @Expose({name: 'acu_genero'})
    @IsNumber({},{message: ()=>{throw {status: 406, message:"El formato del parametro acu_genero no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_genero es obligatorio"}}})
    acu_genero:number;
    @Expose({name: 'acu_movPerso'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro acu_movPerso no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_movPerso es obligatorio"}}})
    acu_movPerso:string;
    @Expose({name: 'acu_fechNac'})
    @Transform(({ value }) => { if(/^\d{4}-\d{2}-\d{2}$/.test(value)) return value ; else throw {status: 406, message: "El parametro acu_fechNac es obligatorio y no cumple con el formato solicitado"};}, { toClassOnly: true })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_fechNac es obligatorio"}}})
    acu_fechNac:string;
    @Expose({ name: "acu_telefonoHogar" })
    @Transform(({ value, key }) => { if (/^[0-9]+$/.test(value)) return value; else throw { status: 406, message: `Error en tipo de parametro acu_telefonoHogar` } }, { toClassOnly: true })
    @MinLength(10, { message: () => { throw { status: 400, message: `El acu_telefonoHogar debe tener minimo 10 caracteres` } } })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_telefonoHogar es obligatorio"}}})
    acu_telefonoHogar: string;
    @Expose({name: 'acu_email'})
    @IsEmail({}, {message: ()=>{throw {status: 406, message:"El formato del parametro acu_email no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro acu_email es obligatorio"}}})
    acu_email:string;
    constructor(
        acu_id:number = 0,
        acu_tipodoc:number = 0,
        acu_nombre_completo:string = "",
        acu_genero:number = 0,
        acu_fechNac:string = "1988-06-22",
        acu_movPerso:string = "",
        acu_telefonoHogar:string = "",
        acu_email:string = "cristiano.ronaldo@example.com",
    ){
        this.acu_id = acu_id;
        this.acu_tipodoc = acu_tipodoc;
        this.acu_nombre_completo = acu_nombre_completo;
        this.acu_genero = acu_genero;
        this.acu_fechNac = acu_fechNac;
        this.acu_movPerso = acu_movPerso;
        this.acu_telefonoHogar = acu_telefonoHogar;
        this.acu_email = acu_email;
    }
    set guardar(body:object){
        con.query(
          /*sql*/`INSERT INTO acudiente SET ?`,
          body,
          (err, data, fields)=>{
           console.log(err)
           console.log(fields)
        });
      }
  
      get obtener(){
        const cox = con.promise();
        return (async()=>{
          const [rows, fields] = await cox.execute(/*sql*/
          `SELECT * from acudiente` 
          );
          return rows;
        })();
      }
  
      set eliminar (acu_id: number){
        con.query(`DELETE FROM acudiente WHERE acu_id =?`,
          acu_id,
          (err, data, fields)=>{
            console.log(err)
            console.log(fields)
          });
      }
    }
    


