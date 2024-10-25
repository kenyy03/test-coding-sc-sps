import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextFieldIcons from '../components/TextFieldIcon';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import { isNumber } from '@mui/x-data-grid/internals';

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const CustomButton = styled(Button)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.base--disabled {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`,
);

const containerFields = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2.8rem',
  width: '100%'
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ReportePoliza() {
  const [polizas, setPolizas] = useState([]);
  const [moneda, setMoneda] = useState('Ambos');
  const [tamanioPagina, setTamanioPagina] = useState(5);
  const { enqueueSnackbar } = useSnackbar();

  const generarReporte = async () => {
    debugger;
    if(moneda === '' || moneda === ' '){
      enqueueSnackbar('Asegurarse de seleccionar una moneda', { variant: 'warning'})
      return;
    }

    if(!isNumber( parseInt(tamanioPagina))){
      enqueueSnackbar('Asegurarse de ingresar un numero', { variant: 'warning'})
      return;
    }

    if(tamanioPagina < 1){
      enqueueSnackbar('Asegurarse de ingresar un valor mayor a cero', { variant: 'warning'})
      return;
    }

    await obtenerPolizas();
  }

  const obtenerPolizas = async () => {
    try {
      const response = await fetch(
        `http://localhost:5270/api/poliza/generar-reporte?peticion.pagina=${0}&peticion.moneda=${moneda}&peticion.tamanioPagina=${tamanioPagina}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
        })
      if(!response.ok){
        throw new Error('Error al obtener los datos');
      }
      debugger;
      const { data } = await response.json();
      const polizas = data.items.map((m) =>{
        return {
          id: m.codigo,
          codigo: m.codigo,
          nombreCliente: m.nombreCliente,
          tipoPersonaDescripcion: m.tipoPersonaDescripcion,
          sumaAsegurada: parseFloat(m.sumaAsegurada),
          primaSeguro: parseFloat(m.primaSeguro),
          moneda: m.moneda,
        };
      });
      setPolizas(polizas);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { field: 'nombreCliente', headerName: 'Cliente', width: 250, editable: false},
    { field: 'tipoPersonaDescripcion', headerName: 'Tipo Persona', width: 250, editable: false},
    { field: 'sumaAsegurada', headerName: 'Suma Asegurada', width: 140, editable: false, type: 'number' },
    { field: 'primaSeguro', headerName: 'Prima de Seguro', width: 140, editable: false, type: 'number' },
    { field: 'moneda', headerName: 'Moneda', width: 100, editable: false,  },
  ];

  return (
    <>
      <h1>Reporte Polizas</h1>
      <Box>
        <section style={containerFields}>
          <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                <Select
                  key={1}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={moneda}
                  label={'Moneda'}
                  onChange={(event) => {
                    event.preventDefault();
                    setMoneda(event.target.value)
                  }}
                  name={'moneda'}
                  sx={{width: '100px'}}
                >
                  {['Ambos','DLS', 'LPS']?.length > 0 &&
                    ['Ambos', 'DLS', 'LPS'].map((option, index) => (
                      <MenuItem key={`menu-item-${index}`} value={option}>{option}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <TextFieldIcons
              id={2}
              name='tamanioPagina'
              label='Cantidad de datos'
              type='text'
              onChange={value => setTamanioPagina(value)}
              value={tamanioPagina}
              placeholder='ingresa la cantidad de datos que deseas ver'
              color='primary'
              variant='outlined'
              size='small'
              disable={false}
            />
            <CustomButton
             key={5}
              onClick={ () => generarReporte()}
            >
              Generar Reporte
            </CustomButton>
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
          slots={{
            toolbar: CustomToolbar,
          }}
        />}
      </Box>
    </>
  );
}
