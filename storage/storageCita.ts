import {con} from '../connect.js';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsDefined,  IsRFC3339} from 'class-validator';
export class storageCita{
    @Expose({name: 'cita_id'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro cita_id no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro cita_id es obligatorio"}}})
    cita_id:number;
    @Expose({name: 'cita_tipo'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro cita_tipo no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro cita_tipo es obligatorio"}}})
    cita_tipo:number;
    @Expose({name: 'cita_estado'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro cita_estado no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro cita_estado es obligatorio"}}})
    cita_estado:number;
    @Expose({name: 'fecha_inicio'})
    @Transform(({ value }) => { if(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return (value) ? value : null ; else throw {status: 400, message: "El parametro fecha_inicio es obligatorio y no cumple con el formato solicitado"};}, { toClassOnly: true })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro fecha_inicio es obligatorio"}}})
    fecha_inicio:string;
    @Expose({name: 'fecha_fin'})
    @Transform(({ value }) => { if(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return (value) ? value : null ; else throw {status: 400, message: "El parametro fecha_fin es obligatorio y no cumple con el formato solicitado"};}, { toClassOnly: true })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro fecha_fin es obligatorio"}}})
    fecha_fin:string;
    @Expose({name: 'fecha_actualizacion_estado'})
    @Transform(({ value }) => { if(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return (value) ? value : null ; else throw {status: 400, message: "El parametro fecha_actualizacion_estado es obligatorio y no cumple con el formato solicitado"};}, { toClassOnly: true })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro fecha_actualizacion_estado es obligatorio"}}})
    fecha_actualizacion_estado:string;
    @Expose({name: 'cita_historial'})
    @IsNumber({}, {message: ()=>{throw {status: 406, message:"El formato del parametro cita_historial no es correcto"}}})
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro cita_historial es obligatorio"}}})
    cita_historial:number;
    constructor(
        cita_id:number = 0,
        cita_tipo:number=0,
        cita_estado:number=0,
        fecha_inicio:string = "2023-07-26 15:30:00",
        fecha_fin:string = "2023-07-27 15:30:00",
        fecha_actualizacion_estado:string = "2023-07-26 15:30:00",
        cita_historial:number
       ){
        this.cita_id = cita_id;
        this.cita_tipo = cita_tipo;
        this.cita_estado = cita_estado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.fecha_actualizacion_estado = fecha_actualizacion_estado;
        this.cita_historial = cita_historial;
    }
    set guardar(body:object){
        con.query(
          /*sql*/`INSERT INTO cita SET ?`,
          body,
          (err, data, fields)=>{
           console.log(err)
           console.log(fields)
        });
      }
  
      get obtener(){
        const cox = con.promise();
        return (async()=>{
          const [rows, fields] = await cox.execute(/*sql*/`SELECT * FROM cita `);
          return rows;
        })();
      }
  
      set eliminar (cita_id: number){
        con.query(`DELETE FROM cita WHERE cita_id =?`,
          cita_id,
          (err, data, fields)=>{
            console.log(err)
            console.log(fields)
          });
      }
}