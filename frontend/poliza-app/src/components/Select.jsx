import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function CustomSelect({
  options = [],
  selectedOption = '',
  handleOnSelectOption = () => {},
  fontsizelabel = '1.5rem',
  label = '',
  name=''
}) {
  return ( 
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label={label}
          onChange={handleOnSelectOption}
          name={name}
        >
          {options?.length > 0 &&
            options.map((option) => (
              <MenuItem value={option?.codigo}>{option?.descripcion}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>

   );
}

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  handleOnSelectOption: PropTypes.func.isRequired,
  fontsizelabel: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
};

CustomSelect.defaultProps = {
  options: [],
  selectedOption: '',
  handleOnSelectOption: () => {},
  fontsizelabel: '1.2rem',
  label: '',
  name: '',
};