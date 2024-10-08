import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

function PhoneInput({ name = "phone", label="Phone", value = "", onChange = () => {}, required = false, disabled=false, error = false }) {
  return (
    <InputMask
      mask="(99) 99999-9999"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {() => (
        <TextField
            margin="normal"
            id={name}
            name={name}
            label={label}
            type="tel"
            autoComplete={name}
            required={required}
            fullWidth
            disabled={disabled}
            error={error?.type === 'phone'}
            helperText={error?.type === 'phone' && error.message}
        />
      )}
    </InputMask>
  );
}

export default PhoneInput;
