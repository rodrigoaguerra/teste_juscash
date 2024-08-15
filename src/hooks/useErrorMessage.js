// axiosErrorHandling.js
import React, { useState } from 'react';
import ErrorAlert from '../components/_Common/ErrorAlert'; // Certifique-se de ajustar o caminho conforme necessário

const useErrorHandling = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAlertClose = () => {
    setErrorOpen(false);
    setErrorMessage('');
  };

  const handleError = (error) => {
    setErrorMessage(error);
    setErrorOpen(true);
  };

  return {
    handleError,
    ErrorAlertComponent: <ErrorAlert open={errorOpen} message={errorMessage} onClose={handleAlertClose} />,
  };
};

export default useErrorHandling;
