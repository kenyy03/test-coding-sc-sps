import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import RadioButton from '../components/RadioButton';
import TextFieldIcons from '../components/TextFieldIcon';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomSelect from '../components/Select';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

function EditToolbar(props) {
  const { cliente, setClientes, tiposPersonas, setCliente, crearCliente, setFechaNacimiento, enqueueSnackbar } = props;

  const handleClick = async () => {
    if(cliente?.tipoPersonaId < 1){
      enqueueSnackbar('Debe seleccionar un tipo de persona valido')
      return;
    }
    const nuevoCliente = await crearCliente(cliente);
      if(nuevoCliente?.error){
        enqueueSnackbar(nuevoCliente?.error);
        return;
      }
      nuevoCliente.tipoPersonaDescripcion = tiposPersonas.find(f => f.codigo == nuevoCliente.tipoPersonaId).descripcion;
      setClientes((oldRows) => [...oldRows, {...nuevoCliente}]);
      setCliente(initialClient);
      setFechaNacimiento(null);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const initialClient = {
  codigo:0, 
  nombre: '', 
  identidad: '',
  rtn: '',
  sexo: '',
  tipoPersonaId: 0,
  tipoPersonaDescripcion: '',
  fechaNacimiento: null,
};

const containerFields = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem',
  width: '100%'
}

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [tiposPersonas, setTiposPersonas] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [cliente, setCliente] = useState(initialClient);
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const { enqueueSnackbar} = useSnackbar();

  const handleInputChanges = e => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleInpuntChangeFechaNacimiento = (value) => {
    setFechaNacimiento(value);
    console.log(dayjs( value).format('MM/DD/YYYY'));
    debugger;
    setCliente({
      ...cliente,
      fechaNacimiento: new Date(dayjs( value).format('MM/DD/YYYY'))
    })
  }

  const handleOnSelectOption = e => {
    setSexoSeleccionado(e.target.value);
    setCliente({
      ...cliente,
      sexo: e.target.value,
    });
  };

  const obtenerTiposPersonas = async () => {
    try {
      const response = await fetch('http://localhost:5270/api/tipo-persona/obtener',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
      if(!response.ok){
        throw new Error('Error al obtener los datos');
      }
  
      const { data } = await response.json();
      const personas = data.map((m) =>{
        return {
          id: m.codigo,
          codigo: m.codigo,
          descripcion: m.descripcion,
        };
      });
      setTiposPersonas(personas);
    } catch (error) {
      console.log(error);
    }
  }

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
          rtn: m.rtn,
          sexo: m.sexo,
          tipoPersonaId: m.tipoPersonaId,
          tipoPersonaDescripcion: m.tipoPersonaDescripcion,
          // fechaNacimiento: m.fechaNacimiento
          fechaNacimiento: new Date(m.fechaNacimiento)
        };
      });
      setClientes(clientes);
    } catch (error) {
      console.log(error);
    }
  }

  const crearCliente = async (cliente) => {
    try {

      const response = await fetch('http://localhost:5270/api/cliente/crear',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(cliente)
      })

      const { data, status, message } = await response.json();
      debugger;
      if(status !== 200){
        throw new Error(message);
      }
      return {
        id: data.codigo,
        codigo: data.codigo,
        nombre: data.nombre,
        identidad: data.identidad,
        rtn: data.rtn,
        sexo: data.sexo,
        tipoPersonaId: data.tipoPersonaId,
        tipoPersonaDescripcion: data.tipoPersonaDescripcion,
        // fechaNacimiento: data.fechaNacimiento
        fechaNacimiento: new Date(data.fechaNacimiento)
      };
    } catch (error) {
      console.log(error);
      return {error};
    }
  }

  const modificarCliente = async (cliente) => {
    try {
      const response = await fetch('http://localhost:5270/api/cliente/modificar',{
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
        nombre: data.nombre,
        identidad: data.identidad,
        rtn: data.rtn,
        sexo: data.sexo,
        tipoPersonaId: data.tipoPersonaId,
        tipoPersonaDescripcion: data.tipoPersonaDescripcion,
        // fechaNacimiento: data.fechaNacimiento
        fechaNacimiento: new Date(data.fechaNacimiento)
      };;
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:5270/api/cliente/eliminar?id=${id}`,{
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
    obtenerTiposPersonas();
  }, []);

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
    const idResult = await eliminarCliente(id);
    setClientes(clientes.filter((row) => row.id !== idResult));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = clientes.find((row) => row.id === id);
    if (editedRow.isNew) {
      setClientes(clientes.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    let updatedRow = {};
    const newRowCopy = {...newRow};
    newRowCopy.tipoPersonaId = tiposPersonas.find(f => f.descripcion == newRowCopy.tipoPersonaDescripcion).codigo
    if(newRow?.isNew ?? false){
      const nuevoCliente = await crearCliente(newRowCopy);
      if(nuevoCliente?.error){
        console.log(nuevoCliente?.error);
        return;
      }
      nuevoCliente.tipoPersonaDescripcion = tiposPersonas.find(f => f.codigo == nuevoCliente.tipoPersonaId).descripcion;
      updatedRow = { ...nuevoCliente, isNew: false }
    }else{
      const clienteModificada = await modificarCliente(newRowCopy);
      clienteModificada.tipoPersonaDescripcion = tiposPersonas.find(f => f.codigo == clienteModificada.tipoPersonaId).descripcion;
      updatedRow = { ...clienteModificada, isNew: false }
    }
    setClientes(clientes.map((row) => (row.id === newRowCopy.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'nombre', headerName: 'Cliente', width: 250, editable: true },
    { field: 'identidad', headerName: 'Identidad', width: 140, editable: true },
    { field: 'rtn', headerName: 'Rtn', width: 140, editable: true },
    { field: 'sexo', headerName: 'Sexo', width: 120, editable: true, type: 'singleSelect', valueOptions: ['Masculino', 'Femenino', 'No Binario'] },
    { field: 'tipoPersonaDescripcion', headerName: 'Tipo Persona', width: 120, editable: true, type: 'singleSelect', valueOptions: tiposPersonas.length > 0 && tiposPersonas.map(e => e.descripcion) },
    { field: 'fechaNacimiento', headerName: 'Fecha Nacimiento', type: 'date', width: 160, editable: true },
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
      <h1>Mantenimiento Cliente</h1>
      
      <br />
      <Box >
        <section style={containerFields}>
        <TextFieldIcons
          id={1}
          name='nombre'
          label='Nombres'
          type='text'
          onChange={handleInputChanges}
          value={cliente?.nombre}
          placeholder='Ingresa tus nombres'
          // focused={true}
          color='primary'
          variant='outlined'
          size='small'
        />
        <TextFieldIcons
          id={2}
          name='identidad'
          label='Identidad'
          type='text'
          onChange={handleInputChanges}
          value={cliente?.identidad}
          placeholder='Ingresa tu identidad'
          // focused={true}
          color='primary'
          variant='outlined'
          size='small'
        />
        <TextFieldIcons
          id={3}
          name='rtn'
          label='Rtn'
          type='text'
          onChange={handleInputChanges}
          value={cliente?.rtn}
          placeholder='Ingresa tu rtn'
          // focused={true}
          color='primary'
          variant='outlined'
          size='small'
        />

        <CustomSelect 
          options={tiposPersonas}
          key={5}
          label='Tipo Persona'
          name='tipoPersonaId'
          handleOnSelectOption={handleInputChanges}
          selectedOption={cliente?.tipoPersonaId}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer key={7} components={['DatePicker']}>
            <DatePicker 
              name='fechaNacimiento'  
              key={4} value={fechaNacimiento} 
              onChange={handleInpuntChangeFechaNacimiento} 
            />
          </DemoContainer>
        </LocalizationProvider>
        
        <RadioButton
          selectedOption={cliente?.sexo}
          handleOnSelectOption={handleOnSelectOption}
          options={[{_id: 1, name:'Masculino'}, {_id:2, name:'Femenino'}, {_id:3, name:'No Binario'}]}
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
        {clientes?.length > 0 && <DataGrid
          rows={clientes}
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
            toolbar: { cliente, setClientes, tiposPersonas, setCliente, crearCliente, setFechaNacimiento, enqueueSnackbar },
          }}
        />}
    </Box>
    </>
  );
}

export default Cliente;