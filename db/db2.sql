CREATE DATABASE
    MER_citas_medicas_A_Elizalde DEFAULT CHARACTER SET = 'utf8mb4';

USE MER_citas_medicas_A_Elizalde;

DROP TABLE tipo_documento;

CREATE TABLE
    tipo_documento(
        tipdoc_id INT NOT NULL AUTO_INCREMENT,
        tipdoc_nombre VARCHAR(20) NOT NULL,
        tipdoc_abreviatura VARCHAR(20) NOT NULL,
        CONSTRAINT pk_tipdoc PRIMARY KEY (tipdoc_id)
    );

INSERT INTO
    tipo_documento (
        tipdoc_nombre,
        tipdoc_abreviatura
    )
VALUES ("Cedula", "CC");

INSERT INTO
    tipo_documento (
        tipdoc_nombre,
        tipdoc_abreviatura
    )
VALUES ("Tarjeta de Identidad", "TI");

DROP TABLE genero;

CREATE TABLE
    genero(
        gen_id INT NOT NULL AUTO_INCREMENT,
        gen_nombre VARCHAR(20) NOT NULL,
        gen_abreviatura VARCHAR(20) NOT NULL,
        CONSTRAINT pk_gen PRIMARY KEY (gen_id)
    );

INSERT INTO
    genero (gen_nombre, gen_abreviatura)
VALUES ("Femenino", "Fem");

INSERT INTO
    genero (gen_nombre, gen_abreviatura)
VALUES ("Masculino", "Masc");

DROP TABLE acudiente;

CREATE TABLE
    acudiente (
        acu_codigo INT NOT NULL AUTO_INCREMENT,
        acu_nombreCompleto VARCHAR(100) NOT NULL,
        acu_telefono VARCHAR(100),
        acu_direccion VARCHAR(200),
        CONSTRAINT pk_acudiente PRIMARY KEY (acu_codigo)
    );

INSERT INTO
    acudiente (
        acu_nombreCompleto,
        acu_telefono,
        acu_direccion
    )
VALUES (
        "Paco Alberto Escalante Prada",
        "3155466998",
        "Calle 21 nº 41-25"
    );

CREATE TABLE
    especialidad(
        esp_id INT NOT NULL AUTO_INCREMENT,
        esp_nombre VARCHAR(20) NOT NULL,
        CONSTRAINT pk_esp_id PRIMARY KEY(esp_id)
    );

INSERT INTO especialidad(esp_nombre) VALUES("Medicina General");

CREATE TABLE
    consultorio (
        cons_codigo INT NOT NULL AUTO_INCREMENT,
        cons_nombre VARCHAR(50) NOT NULL,
        CONSTRAINT pk_consultorio PRIMARY KEY (cons_codigo)
    );

INSERT INTO
    consultorio(cons_nombre)
VALUES ("La Perrada de Curramnba");

INSERT INTO consultorio(cons_nombre) VALUES ("El Prado");

CREATE TABLE
    estado_cita (
        estcita_id INT NOT NULL AUTO_INCREMENT,
        estcita_nombre VARCHAR(20) NOT NULL,
        CONSTRAINT pk_estado_cita PRIMARY KEY (estcita_id)
    );

INSERT INTO
    estado_cita (estcita_nombre)
VALUES ("ACTIVA"), ('SUPENDIDA'), ('CANCELADA'), ('PERDIDA');

DROP TABLE medico;

CREATE TABLE
    medico (
        med_nroMatriculaProsional INT NOT NULL,
        med_nombreCompleto VARCHAR(120) NOT NULL,
        med_consultorio INT,
        med_especialidad INT,
        CONSTRAINT pk_medico PRIMARY KEY (med_nroMatriculaProsional),
        CONSTRAINT fk_consultorio_medico FOREIGN KEY (med_consultorio) REFERENCES consultorio(cons_codigo),
        CONSTRAINT fk_especialidad_medico FOREIGN KEY (med_especialidad) REFERENCES especialidad(esp_id)
    );

INSERT INTO
    medico (
        med_nroMatriculaProsional,
        med_nombreCompleto,
        med_consultorio,
        med_especialidad
    )
VALUES (
        "465899584",
        "Alvaro Motosierra Uribe",
        1,
        1
    );

CREATE TABLE
    usuario(
        usu_id INT NOT NULL,
        usu_nombre VARCHAR(50) NOT NULL,
        usu_segdo_nombre VARCHAR(45),
        usu_primer_apellido_usuar VARCHAR(50) NOT NULL,
        usu_segdo_apellido_usuar VARCHAR(50) NOT NULL,
        usu_telefono VARCHAR(50) NOT NULL,
        usu_direccion VARCHAR(100) NOT NULL,
        usu_e_mail VARCHAR(100),
        usu_tipodoc INT NOT NULL,
        usu_genero INT NOT NULL,
        usu_acudiente INT NOT NULL,
        CONSTRAINT pk_usuario PRIMARY KEY (usu_id),
        CONSTRAINT fk_tipoDocumento_usuario FOREIGN KEY (usu_tipodoc) REFERENCES tipo_documento(tipdoc_id),
        CONSTRAINT fk_genero_usuario FOREIGN KEY (usu_genero) REFERENCES genero(gen_id),
        CONSTRAINT fk_acudiente_usuario FOREIGN KEY (usu_acudiente) REFERENCES acudiente(acu_codigo)
    );

INSERT INTO
    usuario (
        usu_id,
        usu_nombre,
        usu_segdo_nombre,
        usu_primer_apellido_usuar,
        usu_segdo_apellido_usuar,
        usu_telefono,
        usu_direccion,
        usu_e_mail,
        usu_tipodoc,
        usu_genero,
        usu_acudiente
    )
VALUES (
        1098817567,
        "Daniela",
        "",
        "Zapata",
        "Mora",
        "3158696969",
        "Parque de los gatos",
        "daniLaMasViral@gmail.com",
        1,
        1,
        1
    );

CREATE TABLE
    cita (
        cit_codigo INT NOT NULL AUTO_INCREMENT,
        cit_fecha DATE NOT NULL,
        cit_estadoCita INT NOT NULL,
        cit_medico INT NOT NULL,
        cit_datosUsuario INT NOT NULL,
        CONSTRAINT pk_cita PRIMARY KEY (cit_codigo),
        CONSTRAINT fk_estadoCita_cita FOREIGN KEY(cit_estadoCita) REFERENCES estado_cita(estcita_id),
        CONSTRAINT fk_medico_cita FOREIGN KEY(cit_medico) REFERENCES medico(med_nroMatriculaProsional),
        CONSTRAINT fk_medico_usuario FOREIGN KEY(cit_datosUsuario) REFERENCES usuario(usu_id)
    );

INSERT INTO
    cita(
        cit_fecha,
        cit_estadoCita,
        cit_medico,
        cit_datosUsuario
    )
VALUES (
        "2023-07-12 10:30:00",
        1,
        465899584,
        1098817567
    )