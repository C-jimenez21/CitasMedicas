DROP DATABASE IF EXISTS PanelCitas_Red_Psicoterapia_Online;

CREATE DATABASE
    PanelCitas_Red_Psicoterapia_Online DEFAULT CHARACTER SET = 'utf8mb4';

USE PanelCitas_Red_Psicoterapia_Online;

DROP TABLE IF EXISTS tipo_documento;

CREATE TABLE
    tipo_documento (
        tipdoc_id INT NOT NULL AUTO_INCREMENT,
        tipdoc_nombre VARCHAR(20) NOT NULL UNIQUE,
        tipdoc_abreviatura VARCHAR(20) NOT NULL UNIQUE,
        CONSTRAINT pk_tipdoc PRIMARY KEY (tipdoc_id)
    );

INSERT INTO
    tipo_documento (
        tipdoc_nombre,
        tipdoc_abreviatura
    )
VALUES ("Cedula", "CC"), ('Tarjeta de Identidad', 'TI'), ('Pasaporte', 'PS');

DROP TABLE IF EXISTS genero;

CREATE TABLE
    genero(
        gen_id INT NOT NULL AUTO_INCREMENT,
        gen_nombre VARCHAR(20) NOT NULL,
        gen_abreviatura VARCHAR(20) NOT NULL,
        CONSTRAINT pk_gen PRIMARY KEY (gen_id)
    );

INSERT INTO
    genero (gen_nombre, gen_abreviatura)
VALUES ("Femenino", "Fem"), ('Masculino', 'Masc'), ('Otro', 'Otro');


DROP TABLE IF EXISTS acudiente;

CREATE TABLE
    acudiente (
        acu_id VARCHAR(20) NOT NULL UNIQUE,
        acu_tipdoc INT NOT NULL,
        acu_nombre_completo VARCHAR(80) NOT NULL,
        acu_genero INT NOT NULL,
        acu_fechNac DATE NOT NULL,
        acu_movPerso VARCHAR(12) NOT NULL,
        acu_telefonoHogar VARCHAR(12),
        acu_email VARCHAR(50) NOT NULL,
        CONSTRAINT pk_acudiente PRIMARY KEY (acu_id),
        CONSTRAINT fk_tipodoc_acudiente FOREIGN KEY (acu_tipdoc) REFERENCES tipo_documento (tipdoc_id),
        CONSTRAINT fk_genero_acudiente FOREIGN KEY (acu_genero) REFERENCES genero (gen_id)
    );

DROP TABLE IF EXISTS paciente;

CREATE TABLE
    paciente (
        pac_id VARCHAR(20) NOT NULL UNIQUE,
        pac_tipdoc INT NOT NULL,
        pac_nombre_completo VARCHAR(80) NOT NULL,
        pac_genero INT NOT NULL,
        pac_fechNac DATE NOT NULL,
        pac_acudiente VARCHAR(20),
        pac_movPerso VARCHAR(12) NOT NULL,
        pac_telefonoHogar VARCHAR(12),
        pac_email VARCHAR(50) NOT NULL,
        CONSTRAINT pk_paciente PRIMARY KEY (pac_id),
        CONSTRAINT fk_tipodoc_paciente FOREIGN KEY (pac_tipdoc) REFERENCES tipo_documento (tipdoc_id),
        CONSTRAINT fk_acudiente_paciente FOREIGN KEY (pac_acudiente) REFERENCES acudiente (acu_id),
        CONSTRAINT fk_genero_paciente FOREIGN KEY (pac_genero) REFERENCES genero (gen_id)
    );

DROP TABLE IF EXISTS historial_paciente;

CREATE TABLE
    historial_paciente(
        historialPaciente_id INT NOT NULL AUTO_INCREMENT,
        fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
        historialPaciente_paciente VARCHAR(20) NOT NULL,
        CONSTRAINT pk_historialPaciente PRIMARY KEY(historialPaciente_id),
        CONSTRAINT fk_paciente_historialPaciente FOREIGN KEY (historialPaciente_paciente) REFERENCES paciente (pac_id)
    );

DROP TABLE IF EXISTS tipo_cita;

CREATE TABLE
    tipo_cita (
        tipoCita_id INT NOT NULL AUTO_INCREMENT,
        tipoCita_nombre VARCHAR(20) NOT NULL,
        CONSTRAINT pk_tipoCita PRIMARY KEY (tipoCita_id)
    );

INSERT INTO tipo_cita(tipoCita_nombre) VALUES ("Primera cita"),('Control');

DROP TABLE IF EXISTS estado_cita;

CREATE TABLE
    estado_cita (
        estadoCita_id INT NOT NULL AUTO_INCREMENT,
        estadoCita_nombre VARCHAR(20) NOT NULL,
        CONSTRAINT pk_estadoCita PRIMARY KEY (estadoCita_id)
    );

INSERT INTO estado_cita(estadoCita_nombre) VALUES ('Activa'),('Cancelada'),('Suspendida');

DROP TABLE IF EXISTS cita;

CREATE TABLE
    cita (
        cita_id INT NOT NULL AUTO_INCREMENT,
        cita_tipo INT NOT NULL,
        cita_estado INT NOT NULL,
        fecha_inicio DATETIME NOT NULL,
        fecha_fin DATETIME NOT NULL,
        fecha_actualizacion_estado DATETIME DEFAULT CURRENT_TIMESTAMP,
        cita_historial INT NOT NULL,
        CONSTRAINT pk_cita PRIMARY KEY (cita_id),
        CONSTRAINT fk_tipo_cita FOREIGN KEY (cita_tipo) REFERENCES tipo_cita (tipoCita_id),
        CONSTRAINT fk_estadoCita_cita FOREIGN KEY (cita_estado) REFERENCES estado_cita (estadoCita_id),
        CONSTRAINT fk_historialPaciente_cita FOREIGN KEY (cita_historial) REFERENCES historial_paciente (historialPaciente_id)
    );

CREATE TABLE usuarios(
    idCuenta VARCHAR(100) NOT NULL,
    passCuenta VARCHAR(100) NOT NULL,
    CONSTRAINT pk_usuarios PRIMARY KEY (idCuenta)
);

INSERT INTO usuarios (idCuenta,passCuenta)VALUES("admin","admin123456789");