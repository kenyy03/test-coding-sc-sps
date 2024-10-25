
CREATE TABLE TipoPersona (
	Codigo INT PRIMARY KEY IDENTITY(1,1),
	Descripcion VARCHAR(10),
	UsuarioCreacionId INT,
	FechaCreacion DATETIME,
	UsuarioModificacionId INT DEFAULT 0,
	FechaModificacion DATETIME
)


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



