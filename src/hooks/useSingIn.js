import { useState } from 'react';

function useSignIn(handleError) {
    const [error, setError] = useState({ type: '', message: '' });
    
    const login = (form) => {
        const data = new FormData(form);

        // valida email
        if(data.get('email') === '') {
            setError({ type: 'email', message: 'O campo email é obrigatório!' }); // input
            handleError('O campo email é obrigatório!'); // alert
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(String(data.get('email')).toLowerCase())) {
            setError({ type: 'email', message: 'Digite um e-mail valido!' }); // input
            handleError('Digite um e-mail valido!'); // alert
            return;
        }

        // valida senha
        const minLength = /.{8,}/; // Pelo menos 8 caracteres
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Pelo menos um caractere especial
        const hasNumericChar = /[0-9]/; // Pelo menos um caractere numérico
        const hasAlphaChar = /[a-zA-Z]/; // Pelo menos um caractere alfanumérico (letra)

        // vazia
        if(data.get('password') === '') {
            setError({ type: 'password', message: 'Digite uma senha' }); // input
            handleError('Digite uma senha'); // alert
            return;
        }

        // minimo
        if (!minLength.test(data.get('password'))) {
            setError({ type: 'password', message: 'Senha não tem pelo menos 8 caracteres' }); // input
            handleError('Senha não tem pelo menos 8 caracteres'); // alert
            return;
        }

        // especial
        if (!hasSpecialChar.test(data.get('password'))) {
            setError({ type: 'password', message: 'Senha não tem caractere especial' }); // input
            handleError('Senha não tem caractere especial'); // alert
            return;
        }

        // numérico
        if (!hasNumericChar.test(data.get('password'))) {
            setError({ type: 'password', message: 'Senha não tem caractere numérico' }); // input
            handleError('Senha não tem caractere numérico'); // alert
            return;
        }

        // alfanumérico
        if (!hasAlphaChar.test(data.get('password'))) {
            setError({ type: 'password', message: 'Senha não tem caractere alfanumérico' }); // input
            handleError('Senha não tem caractere alfanumérico'); // alert
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
         
        const user =  users.find((u) => data.get('email') === u.email && data.get('password') === u.password)
        
        if(!user) {
            setError({ type: 'login', message: 'Usuário ou senha incorretos!' }); // input
            handleError('Usuário ou senha incorretos!'); // alert
            return false;
        } else {
            setError({ type: false, message: '' });
            // Salva o usuario no localStorage
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
    };

  return { error, login };
}

export default useSignIn;