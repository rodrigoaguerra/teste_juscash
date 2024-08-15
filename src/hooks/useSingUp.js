import { useState } from 'react';

function useSignUp(handleError) {
    const [error, setError] = useState({ type: '', message: '' });
    
    const validate = (form) => {
        const data = new FormData(form);

        // valida nome
        if(data.get('name') === '') {
            setError({ type: 'name', message: 'O campo nome é obrigatório!' }); // input
            handleError('O campo nome é obrigatório!'); // alert
            return;
        }

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

        // confirma senha
        if(data.get('confirm_password') === '') {
            setError({ type: 'confirm_password', message: 'Confirme sua senha' }); // input
            handleError('Confirme sua senha'); // alert
            return;
        }

        if(data.get('password') !== data.get('confirm_password')) {
            setError({ type: 'confirm_password', message: 'As senhas não conferem!' }); // input
            handleError('As senhas não conferem!'); // alert
            return;
        }

        setError({ type: false, message: '' });
    };

    const submit = (form) => {
        const formData = new FormData(form);
        // Converte FormData para objeto
        const newUser = {};
        formData.forEach((value, key) => {
            newUser[key] = value;
        });

        // Recupera o array de usuários do localStorage, ou inicializa um novo array
        let usersArray = JSON.parse(localStorage.getItem('users')) || [];
        
        // remove confirmação de senha
        delete newUser.confirm_password; 
        
        // Adiciona o novo usuário ao array
        usersArray.push(newUser);

        // Salva o array atualizado no localStorage
        localStorage.setItem('users', JSON.stringify(usersArray));
    };

  return { error, validate, submit };
}

export default useSignUp;