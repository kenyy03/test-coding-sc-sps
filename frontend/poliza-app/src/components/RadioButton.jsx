import styled from '@emotion/styled';
import {
  FormControl,
  FormControlLabel,
//   FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import PropTypes from 'prop-types';

const CustomFormControlLabel = styled(FormControlLabel)({
  fontSize: props => props.fontsizelabel ?? '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function RadioButton({
  options = [],
  selectedOption = '',
  handleOnSelectOption = () => {},
  fontsizelabel = '1.5rem',
}) {
  return (
    <>
      <FormControl>
        {/* <FormLabel id='demo-row-radio-buttons-group-label'>
          Selecciona tu Sexo
        </FormLabel> */}
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          value={selectedOption}
          onChange={handleOnSelectOption}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        //   className={styles['radio-container']}
        >
          {options?.length > 0 &&
            options?.map((gender, index) => (
              <CustomFormControlLabel
                key={index}
                value={gender?.name}
                control={<Radio />}
                label={gender?.name}
                disableTypography={false}
                fontsizelabel={fontsizelabel}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

RadioButton.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  handleOnSelectOption: PropTypes.func.isRequired,
  fontsizelabel: PropTypes.string,
};

RadioButton.defaultProps = {
  options: [],
  selectedOption: '',
  handleOnSelectOption: () => {},
  fontsizelabel: '1.2rem',
};