import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function EditToolbar(props) {
  const { tiposPersonas, setTiposPersonas, setRowModesModel } = props;

  const handleClick = () => {
    let id = tiposPersonas.length > 0 ? tiposPersonas[tiposPersonas.length -1].codigo+1 : 1;
    setTiposPersonas((oldRows) => {
      return [
        ...oldRows,
        { id, codigo:0, descripcion: '', isNew: true },
      ]
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'descripcion' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const TipoPersona = () => {
  const [tiposPersonas, setTiposPersonas] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

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

  const crearTipoPersona = async (tipoPersona) => {
    try {
      const response = await fetch('http://localhost:5270/api/tipo-persona/crear',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(tipoPersona)
      })
      if(!response.ok){
        throw new Error('Error al crear el usuario');
      }
  
      const { data } = await response.json();
      return { id: data.codigo, codigo: data.codigo, descripcion: data.descripcion };
    } catch (error) {
      console.log(error);
    }
  }

  const modificarTipoPersona = async (tipoPersona) => {
    try {
      const response = await fetch('http://localhost:5270/api/tipo-persona/modificar',{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(tipoPersona)
      })
      if(!response.ok){
        throw new Error('Error al crear el usuario');
      }
  
      const { data } = await response.json();
      return { id: data.codigo, codigo: data.codigo, descripcion: data.descripcion };
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarTipoPersona = async (id) => {
    try {
      const response = await fetch(`http://localhost:5270/api/tipo-persona/eliminar?id=${id}`,{
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
    const idResult = await eliminarTipoPersona(id);
    setTiposPersonas(tiposPersonas.filter((row) => row.id !== idResult));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = tiposPersonas.find((row) => row.id === id);
    if (editedRow.isNew) {
      setTiposPersonas(tiposPersonas.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    let updatedRow = {};
    if(newRow?.isNew ?? false){
      console.log('es nuevo registro');
      const nuevoTipoPersona = await crearTipoPersona(newRow);
      updatedRow = { ...nuevoTipoPersona, isNew: false }
      // setTiposPersonas(tiposPersonas)
    }else{
      console.log('es registro por editar');
      const tipoPersonaModificada = await modificarTipoPersona(newRow);
      updatedRow = { ...tipoPersonaModificada, isNew: false }
    }
    setTiposPersonas(tiposPersonas.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'codigo', headerName: 'Codigo', width: 180, editable: false },
    { field: 'descripcion', headerName: 'Descripcion', width: 180, editable: true },
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
      <h1>Mantenimiento Tipo Persona</h1>

      <br />
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
      {tiposPersonas?.length > 0 && <DataGrid
        rows={tiposPersonas}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { tiposPersonas, setTiposPersonas, setRowModesModel },
        }}
      />}
    </Box>
    </>
  );
}

export default TipoPersona;