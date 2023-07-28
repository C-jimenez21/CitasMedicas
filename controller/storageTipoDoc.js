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
import { Expose } from 'class-transformer';
import { IsNumber, IsString, IsDefined } from 'class-validator';
export class storageTipoDoc {
    constructor(tipdoc_id = 0, tipdoc_nombre = "", tipdoc_abreviatura = "") {
        this.tipdoc_id = tipdoc_id;
        this.tipdoc_nombre = tipdoc_nombre;
        this.tipdoc_abreviatura = tipdoc_abreviatura;
    }
    set guardar(body) {
        con.query(
        /*sql*/ `INSERT INTO tipo_documento SET ?`, body, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
    get obtener() {
        const cox = con.promise();
        return (() => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield cox.execute(/*sql*/ `SELECT * FROM tipo_documento`);
            return rows;
        }))();
    }
    set eliminar(tipdoc_id) {
        con.query(`DELETE FROM tipo_documento WHERE tipdoc_id =?`, tipdoc_id, (err, data, fields) => {
            console.log(err);
            console.log(fields);
        });
    }
}
__decorate([
    Expose({ name: 'tipdoc_id' }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro tipdoc_id no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro tipdoc_id es obligatorio" }; } }),
    __metadata("design:type", Number)
], storageTipoDoc.prototype, "tipdoc_id", void 0);
__decorate([
    Expose({ name: 'tipdoc_nombre' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro tipdoc_nombre no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro tipdoc_nombre es obligatorio" }; } }),
    __metadata("design:type", String)
], storageTipoDoc.prototype, "tipdoc_nombre", void 0);
__decorate([
    Expose({ name: ' tipdoc_abreviatura' }),
    IsString({ message: () => { throw { status: 406, message: "El formato del parametro  tipdoc_abreviatura no es correcto" }; } }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro  tipdoc_abreviatura es obligatorio" }; } }),
    __metadata("design:type", String)
], storageTipoDoc.prototype, "tipdoc_abreviatura", void 0);
