import {con} from '../connect.js';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsEmail, IsDefined, MinLength} from 'class-validator';
export class storagePaciente{
    @Expose({name: 'pac_id'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro pac_id no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_id es obligatorio"}}})
    pac_id:number;
    @Expose({name: 'pac_tipodoc'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro pac_tipodoc no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_tipodoc es obligatorio"}}})
    pac_tipodoc:number;
    @Expose({name: 'pac_nombre_completo'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro pac_nombre_completo no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_nombre_completo es obligatorio"}}})
    pac_nombre_completo:string;
    @Expose({name: 'pac_genero'})
    @IsNumber({},{message: ()=>{throw {status: 406, message:"El formato del parametro pac_genero no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_genero es obligatorio"}}})
    pac_genero:number;
    @Expose({name: 'pac_fechNac'})
    @Transform(({ value }) => { if(/^\d{4}-\d{2}-\d{2}$/.test(value)) return value ; else throw {status: 406, message: "El parametro pac_fechNac es obligatorio y no cumple con el formato solicitado"};}, { toClassOnly: true })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_fechNac es obligatorio"}}})
    pac_fechNac:string;
    @Expose({name: 'pac_acudiente'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro pac_acudiente no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_acudiente es obligatorio"}}})
    pac_acudiente:string;
    @Expose({name: 'pac_movPerso'})
    @IsString({message: ()=>{throw {status: 406, message:"El formato del parametro pac_movPerso no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_movPerso es obligatorio"}}})
    pac_movPerso:string;
    @Expose({ name: "pac_telefonoHogar" })
    @Transform(({ value, key }) => { if (/^[0-9]+$/.test(value)) return value; else throw { status: 406, message: `Error en tipo de parametro pac_telefonoHogar` } }, { toClassOnly: true })
    @MinLength(10, { message: () => { throw { status: 400, message: `El pac_telefonoHogar debe tener minimo 10 caracteres` } } })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_telefonoHogar es obligatorio"}}})
    pac_telefonoHogar: string;
    @Expose({name: 'pac_email'})
    @IsEmail({}, {message: ()=>{throw {status: 406, message:"El formato del parametro pac_email no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro pac_email es obligatorio"}}})
    pac_email:string;
    constructor(
        pac_id:number = 0,
        pac_tipodoc:number = 0,
        pac_nombre_completo:string = "",
        pac_genero:number = 0,
        pac_fechNac:string = "1988-06-22",
        pac_acudiente:string = "",
        pac_movPerso:string = "",
        pac_telefonoHogar:string = "3005328255",
        pac_email:string = "cristiano.ronaldo@example.com",
    ){
        this.pac_id = pac_id;
        this.pac_tipodoc = pac_tipodoc;
        this.pac_nombre_completo = pac_nombre_completo;
        this.pac_genero = pac_genero;
        this.pac_fechNac = pac_fechNac;
        this.pac_acudiente = pac_acudiente;
        this.pac_movPerso = pac_movPerso;
        this.pac_telefonoHogar = pac_telefonoHogar;
        this.pac_email = pac_email;
    }
    set guardar(body:object){
        con.query(
          /*sql*/`INSERT INTO paciente SET ?`,
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
          `SELECT * from paciente` 
          );
          return rows;
        })();
      }
  
      set eliminar (pac_id: number){
        con.query(`DELETE FROM paciente WHERE pac_id =?`,
          pac_id,
          (err, data, fields)=>{
            console.log(err)
            console.log(fields)
          });
      }
    }
    


