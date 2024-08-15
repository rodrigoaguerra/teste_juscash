// ErrorAlert.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorAlert = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={onClose}>
      <Alert 
        onClose={onClose} 
        severity="error" 
        variant="filled"
        sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
