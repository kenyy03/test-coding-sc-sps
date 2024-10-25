CREATE TABLE Usuario(
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	Nombre VARCHAR(150),
	EsAdministrador BIT DEFAULT 0
)

--SELECT * FROM Usuario
--INSERT INTO Usuario (Nombre, EsAdministrador)
--VALUES ('Keny David Travanino Madrid', 1)

CREATE TABLE Permisos (
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	Nombre VARCHAR(200),
	Descripcion VARCHAR(MAX),
	CodigoPermisoPadre INT,
) 

CREATE TABLE TipoPersona (
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	Descripcion VARCHAR(10),
	UsuarioCreacionId INT,
	FechaCreacion DATETIME,
	UsuarioModificacionId INT DEFAULT 0,
	FechaModificacion DATETIME
)

SELECT * FROM TipoPersona
--INSERT INTO TipoPersona ()

CREATE TABLE Cliente(
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	Nombre VARCHAR(150),
	Identidad VARCHAR(13),
	Rtn VARCHAR(20),
	Sexo VARCHAR(10),
	TipoPersonaId INT,
	FechaNacimiento DATETIME,
	UsuarioCreacionId INT,
	FechaCreacion DATETIME,
	UsuarioModificacionId INT DEFAULT 0,
	FechaModificacion DATETIME
)

ALTER TABLE Cliente
ADD CONSTRAINT FkClienteTipoPersonaId
FOREIGN KEY (TipoPersonaId)
REFERENCES TipoPersona(Codigo);

--ALTER TABLE Cliente
--ADD CONSTRAINT FkClienteUsuarioCreacion
--FOREIGN KEY (UsuarioCreacionId)
--REFERENCES Usuario(Codigo);

--ALTER TABLE Cliente
--ADD CONSTRAINT FkClienteUsuarioModificacion
--FOREIGN KEY (UsuarioModificacionId)
--REFERENCES Usuario(Codigo);


CREATE TABLE Poliza(
	PolizaId INT PRIMARY KEY IDENTITY(1,1),
	CodigoCliente INT,
	SumaAsegurada DECIMAL(12,4),
	PrimaSeguro DECIMAL(12,4),
	Moneda VARCHAR(3),
	FactorDeCambio DECIMAL(8,4),
	UsuarioCreacionId INT,
	FechaCreacion DATETIME,
	UsuarioModificacionId INT DEFAULT 0,
	FechaModificacion DATETIME
)

ALTER TABLE Poliza
ADD CONSTRAINT FkPolizaCliente
FOREIGN KEY (CodigoCliente)
REFERENCES Cliente(Codigo);


--Femenino
--Masculino
--No Binario



