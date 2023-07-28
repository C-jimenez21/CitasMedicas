var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { con } from '../connect.js';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsDefined } from 'class-validator';
export class storageCita {
    constructor(cita_id = 0, cita_tipo = 0, cita_estado = 0, fecha_inicio = "2023-07-26 15:30:00", fecha_fin = "2023-07-27 15:30:00", fecha_actualizacion_estado = "2023-07-26 15:30:00", cita_historial) {
        this.cita_id = cita_id;
        this.cita_tipo = cita_tipo;
        this.cita_estado = cita_estado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.fecha_actualizacion_estado = fecha_actualizacion_estado;
        this.cita_historial = cita_historial;
    }
    set guardar(body) {
        con.query(
        /*sql*/ `INSERT INTO cita SET ?`, body, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
    get obtener() {
        const cox = con.promise();
        return (() => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield cox.execute(/*sql*/ `SELECT * FROM cita `);
            return rows;
        }))();
    }
    set eliminar(cita_id) {
        con.query(`DELETE FROM cita WHERE cita_id =?`, cita_id, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
}
__decorate([
    Expose({ name: 'cita_id' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro cita_id no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cita_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageCita.prototype, "cita_id", void 0);
__decorate([
    Expose({ name: 'cita_tipo' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro cita_tipo no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cita_tipo es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageCita.prototype, "cita_tipo", void 0);
__decorate([
    Expose({ name: 'cita_estado' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro cita_estado no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cita_estado es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageCita.prototype, "cita_estado", void 0);
__decorate([
    Expose({ name: 'fecha_inicio' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
        return (value) ? value : null;
    else
        throw { status: 400, message: "El parametro fecha_inicio es obligatorio y no cumple con el formato solicitado" }; }, { toClassOnly: true }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro fecha_inicio es obligatorio" }; } }),
    __metadata("design:type", String)
], storageCita.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: 'fecha_fin' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
        return (value) ? value : null;
    else
        throw { status: 400, message: "El parametro fecha_fin es obligatorio y no cumple con el formato solicitado" }; }, { toClassOnly: true }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro fecha_fin es obligatorio" }; } }),
    __metadata("design:type", String)
], storageCita.prototype, "fecha_fin", void 0);
__decorate([
    Expose({ name: 'fecha_actualizacion_estado' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
        return (value) ? value : null;
    else
        throw { status: 400, message: "El parametro fecha_actualizacion_estado es obligatorio y no cumple con el formato solicitado" }; }, { toClassOnly: true }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro fecha_actualizacion_estado es obligatorio" }; } }),
    __metadata("design:type", String)
], storageCita.prototype, "fecha_actualizacion_estado", void 0);
__decorate([
    Expose({ name: 'cita_historial' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro cita_historial no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro cita_historial es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageCita.prototype, "cita_historial", void 0);
