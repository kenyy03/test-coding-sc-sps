import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextFieldIcons from '../components/TextFieldIcon';
import { useSnackbar } from 'notistack';


function EditToolbar(props) {
  const { poliza, setPolizas, clientes, setPoliza, crearPoliza, enqueueSnackbar } = props;

  const handleClick = async () => {
    if(poliza?.codigoCliente < 1){
      enqueueSnackbar('debe seleccionar un cliente valido', { variant: 'warning' });
      return;
    }

    if(poliza.moneda === 'DLS' && parseFloat(poliza?.factorDeCambio) < 1){
      enqueueSnackbar('debe ingresar un factor de cambio', { variant: 'warning' });
      return;
    }

    const nuevoPoliza = await crearPoliza(poliza);
      if(nuevoPoliza?.error){
        enqueueSnackbar(nuevoPoliza?.error, { variant: 'error'});
        return;
      }
      nuevoPoliza.nombreCliente = clientes.find(f => f.codigo == nuevoPoliza.codigoCliente).nombre;
      setPolizas((oldRows) => [...oldRows, {...nuevoPoliza}]);
      setPoliza(initialPoliza);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const initialPoliza = {
  codigo:0, 
  codigoCliente:0,
  sumaAsegurada: 0.0000, 
  primaSeguro: 0.0000,
  moneda: 'LPS',
  factorDeCambio: 0.0000, 
};

const containerFields = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2.8rem',
  width: '100%'
}

const Poliza = () => {
  const [polizas, setPolizas] = useState([]);
  const [poliza, setPoliza] = useState(initialPoliza);
  const [clientes, setClientes] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();

  const obtenerClientes = async () => {
    try {
      const response = await fetch('http://localhost:5270/api/cliente/obtener',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
      if(!response.ok){
        throw new Error('Error al obtener los datos');
      }
  
      const { data } = await response.json();
      const clientes = data.map((m) =>{
        return {
          id: m.codigo,
          codigo: m.codigo,
          nombre: m.nombre,
          identidad: m.identidad,
          // rtn: m.rtn,
          // sexo: m.sexo,
          // tipoPersonaId: m.tipoPersonaId,
          // tipoPersonaDescripcion: m.tipoPersonaDescripcion,
          // // fechaNacimiento: m.fechaNacimiento
          // fechaNacimiento: new Date(m.fechaNacimiento)
        };
      });
      setClientes(clientes);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerPolizas = async () => {
    try {
      const response = await fetch('http://localhost:5270/api/poliza/obtener',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
      if(!response.ok){
        throw new Error('Error al obtener los datos');
      }
  
      const { data } = await response.json();
      const polizas = data.map((m) =>{
        return {
          id: m.codigo,
          codigo: m.codigo,
          codigoCliente: m.codigoCliente,
          nombreCliente: m.nombreCliente,
          sumaAsegurada: parseFloat(m.sumaAsegurada),
          primaSeguro: parseFloat(m.primaSeguro),
          moneda: m.moneda,
          factorDeCambio: parseFloat(m.factorDeCambio),
        };
      });
      setPolizas(polizas);
    } catch (error) {
      console.log(error);
    }
  }

  const crearPoliza = async (cliente) => {
    try {

      const response = await fetch('http://localhost:5270/api/poliza/crear',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(cliente)
      })

      const { data, status, message } = await response.json();
      if(status !== 200){
        throw new Error(message);
      }
      return {
          id: data.codigo,
          codigo: data.codigo,
          codigoCliente: data.codigoCliente,
          nombreCliente: data.nombreCliente,
          sumaAsegurada: parseFloat(data.sumaAsegurada),
          primaSeguro: parseFloat(data.primaSeguro),
          moneda: data.moneda,
          factorDeCambio: parseFloat(data.factorDeCambio),
      };
    } catch (error) {
      console.log(error);
      return {error};
    }
  }

  const modificarPoliza = async (cliente) => {
    try {
      const response = await fetch('http://localhost:5270/api/poliza/modificar',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(cliente)
      })
      if(!response.ok){
        throw new Error('Error al crear el usuario');
      }
  
      const { data } = await response.json();
      return {
        id: data.codigo,
        codigo: data.codigo,
        codigoCliente: data.codigoCliente,
        nombreCliente: data.nombreCliente,
        sumaAsegurada: parseFloat(data.sumaAsegurada),
        primaSeguro: parseFloat(data.primaSeguro),
        moneda: data.moneda,
        factorDeCambio: parseFloat(data.factorDeCambio),
      };
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarPoliza = async (id) => {
    try {
      const response = await fetch(`http://localhost:5270/api/poliza/eliminar?id=${id}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
      })
      if(!response.ok){
        throw new Error('Error al crear el usuario');
      }
  
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerClientes();
    obtenerPolizas();
  }, []);

  const handleInputChanges = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    setPoliza({
      ...poliza,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    const idResult = await eliminarPoliza(id);
    setPolizas(polizas.filter((row) => row.id !== idResult));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = polizas.find((row) => row.id === id);
    if (editedRow.isNew) {
      setPolizas(polizas.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    let updatedRow = {};
    const newRowCopy = {...newRow};
    debugger;
    newRowCopy.codigoCliente = clientes.find(f => f.nombre == newRowCopy.nombreCliente).codigo
    if(newRow?.isNew ?? false){
      const nuevoPoliza = await crearPoliza(newRowCopy);
      if(nuevoPoliza?.error){
        console.log(nuevoPoliza?.error);
        return;
      }
      nuevoPoliza.nombreCliente = clientes.find(f => f.codigo == nuevoPoliza.codigoCliente).nombre;
      updatedRow = { ...nuevoPoliza, isNew: false }
    }else{
      const polizaModificada = await modificarPoliza(newRowCopy);
      polizaModificada.nombreCliente = clientes.find(f => f.codigo == polizaModificada.codigoCliente).nombre;
      updatedRow = { ...polizaModificada, isNew: false }
    }
    setPolizas(polizas.map((row) => (row.id === newRowCopy.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'nombreCliente', headerName: 'Cliente', width: 250, editable: true, type: 'singleSelect', valueOptions: clientes.length > 0 && clientes.map(e => e.nombre) },
    { field: 'sumaAsegurada', headerName: 'Suma Asegurada', width: 140, editable: true, type: 'number' },
    { field: 'primaSeguro', headerName: 'Prima de Seguro', width: 140, editable: true, type: 'number' },
    { field: 'moneda', headerName: 'Moneda', width: 100, editable: true, type: 'singleSelect', valueOptions: ['DLS', 'LPS'] },
    { 
      field: 'factorDeCambio', 
      headerName: 'Factor de Cambio', 
      width: 160, 
      editable: true, 
      type: 'number', 
      valueFormatter: (params) => {
        console.log(params);
        return params?.value?.toFixed(4);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return ( 
    <>
      <h1>Mantenimiento Poliza</h1>
      <Box>
        <section style={containerFields}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Clientes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={poliza.codigoCliente}
                label={'Clientes'}
                onChange={handleInputChanges}
                name={'codigoCliente'}
                sx={{width: '280px'}}
              >
                {clientes?.length > 0 &&
                  clientes.map((option) => (
                    <MenuItem value={option?.codigo}>{option?.nombre}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <TextFieldIcons
            id={1}
            name='sumaAsegurada'
            label='Suma Asegurada'
            type='text'
            onChange={handleInputChanges}
            value={poliza?.sumaAsegurada}
            placeholder='Ingresa la suma asegurada'
            color='primary'
            variant='outlined'
            size='small'
          />
          <TextFieldIcons
            id={2}
            name='primaSeguro'
            label='Prima de Seguro'
            type='text'
            onChange={handleInputChanges}
            value={poliza?.primaSeguro}
            placeholder='Ingresa la prima seguro'
            color='primary'
            variant='outlined'
            size='small'
          />
         <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={poliza.moneda}
                label={'Moneda'}
                onChange={handleInputChanges}
                name={'moneda'}
                defaultValue='LPS'
                sx={{width: '100px'}}
              >
                {['DLS', 'LPS']?.length > 0 &&
                  ['DLS', 'LPS'].map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <TextFieldIcons
            id={3}
            name='factorDeCambio'
            label='Factor de Cambio'
            type='text'
            onChange={handleInputChanges}
            value={poliza?.factorDeCambio}
            placeholder='Ingresa el factor de cambio'
            color='primary'
            variant='outlined'
            size='small'
            disable={poliza?.moneda === 'LPS' || poliza?.moneda === '' || poliza?.moneda === ' ' }
          />
        </section>
      </Box>

      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        {polizas?.length > 0 && <DataGrid
          rows={polizas}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error) }
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { poliza, setPolizas, clientes, setPoliza, crearPoliza, enqueueSnackbar },
          }}
        />}
      </Box>
    </>
   );
}
 
export default Poliza;