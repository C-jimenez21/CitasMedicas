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
import { IsNumber, IsString, IsEmail, IsDefined, MinLength } from 'class-validator';
export class storagePaciente {
    constructor(pac_id = 0, pac_tipodoc = 0, pac_nombre_completo = "", pac_genero = 0, pac_fechNac = "1988-06-22", pac_acudiente = "", pac_movPerso = "", pac_telefonoHogar = "3005328255", pac_email = "cristiano.ronaldo@example.com") {
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
    set guardar(body) {
        con.query(
        /*sql*/ `INSERT INTO paciente SET ?`, body, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
    get obtener() {
        const cox = con.promise();
        return (() => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield cox.execute(/*sql*/ `SELECT * from paciente`);
            return rows;
        }))();
    }
    set eliminar(pac_id) {
        con.query(`DELETE FROM paciente WHERE pac_id =?`, pac_id, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
}
__decorate([
    Expose({ name: 'pac_id' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro pac_id no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], storagePaciente.prototype, "pac_id", void 0);
__decorate([
    Expose({ name: 'pac_tipodoc' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro pac_tipodoc no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_tipodoc es obligatorio" }; } }),
    __metadata("design:type", Number)
], storagePaciente.prototype, "pac_tipodoc", void 0);
__decorate([
    Expose({ name: 'pac_nombre_completo' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro pac_nombre_completo no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_nombre_completo es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_nombre_completo", void 0);
__decorate([
    Expose({ name: 'pac_genero' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro pac_genero no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_genero es obligatorio" }; } }),
    __metadata("design:type", Number)
], storagePaciente.prototype, "pac_genero", void 0);
__decorate([
    Expose({ name: 'pac_fechNac' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value))
        return value;
    else
        throw { status: 406, message: "El parametro pac_fechNac es obligatorio y no cumple con el formato solicitado" }; }, { toClassOnly: true }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_fechNac es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_fechNac", void 0);
__decorate([
    Expose({ name: 'pac_acudiente' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro pac_acudiente no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_acudiente es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_acudiente", void 0);
__decorate([
    Expose({ name: 'pac_movPerso' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro pac_movPerso no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_movPerso es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_movPerso", void 0);
__decorate([
    Expose({ name: "pac_telefonoHogar" }),
    Transform(({ value, key }) => { if (/^[0-9]+$/.test(value))
        return value;
    else
        throw { status: 406, message: `Error en tipo de parametro pac_telefonoHogar` }; }, { toClassOnly: true }),
    MinLength(10, { message: () => { throw { status: 400, message: `El pac_telefonoHogar debe tener minimo 10 caracteres` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_telefonoHogar es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_telefonoHogar", void 0);
__decorate([
    Expose({ name: 'pac_email' }),
    IsEmail({}, { message: () => { throw { status: 406, message: "El formato del parametro pac_email no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro pac_email es obligatorio" }; } }),
    __metadata("design:type", String)
], storagePaciente.prototype, "pac_email", void 0);
