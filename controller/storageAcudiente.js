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
export class storageAcudiente {
    constructor(acu_id = 0, acu_tipodoc = 0, acu_nombre_completo = "", acu_genero = 0, acu_fechNac = "1988-06-22", acu_movPerso = "", acu_telefonoHogar = "", acu_email = "cristiano.ronaldo@example.com") {
        this.acu_id = acu_id;
        this.acu_tipodoc = acu_tipodoc;
        this.acu_nombre_completo = acu_nombre_completo;
        this.acu_genero = acu_genero;
        this.acu_fechNac = acu_fechNac;
        this.acu_movPerso = acu_movPerso;
        this.acu_telefonoHogar = acu_telefonoHogar;
        this.acu_email = acu_email;
    }
    set guardar(body) {
        con.query(
        /*sql*/ `INSERT INTO acudiente SET ?`, body, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
    get obtener() {
        const cox = con.promise();
        return (() => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield cox.execute(/*sql*/ `SELECT * from acudiente`);
            return rows;
        }))();
    }
    set eliminar(acu_id) {
        con.query(`DELETE FROM acudiente WHERE acu_id =?`, acu_id, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
}
__decorate([
    Expose({ name: 'acu_id' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro acu_id no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageAcudiente.prototype, "acu_id", void 0);
__decorate([
    Expose({ name: 'acu_tipodoc' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro acu_tipodoc no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_tipodoc es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageAcudiente.prototype, "acu_tipodoc", void 0);
__decorate([
    Expose({ name: 'acu_nombre_completo' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro acu_nombre_completo no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_nombre_completo es obligatorio" }; } }),
    __metadata("design:type", String)
], storageAcudiente.prototype, "acu_nombre_completo", void 0);
__decorate([
    Expose({ name: 'acu_genero' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro acu_genero no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_genero es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageAcudiente.prototype, "acu_genero", void 0);
__decorate([
    Expose({ name: 'acu_movPerso' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro acu_movPerso no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_movPerso es obligatorio" }; } }),
    __metadata("design:type", String)
], storageAcudiente.prototype, "acu_movPerso", void 0);
__decorate([
    Expose({ name: 'acu_fechNac' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value))
        return value;
    else
        throw { status: 406, message: "El parametro acu_fechNac es obligatorio y no cumple con el formato solicitado" }; }, { toClassOnly: true }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_fechNac es obligatorio" }; } }),
    __metadata("design:type", String)
], storageAcudiente.prototype, "acu_fechNac", void 0);
__decorate([
    Expose({ name: "acu_telefonoHogar" }),
    Transform(({ value, key }) => { if (/^[0-9]+$/.test(value))
        return value;
    else
        throw { status: 406, message: `Error en tipo de parametro acu_telefonoHogar` }; }, { toClassOnly: true }),
    MinLength(10, { message: () => { throw { status: 400, message: `El acu_telefonoHogar debe tener minimo 10 caracteres` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_telefonoHogar es obligatorio" }; } }),
    __metadata("design:type", String)
], storageAcudiente.prototype, "acu_telefonoHogar", void 0);
__decorate([
    Expose({ name: 'acu_email' }),
    IsEmail({}, { message: () => { throw { status: 406, message: "El formato del parametro acu_email no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro acu_email es obligatorio" }; } }),
    __metadata("design:type", String)
], storageAcudiente.prototype, "acu_email", void 0);
