function useSignUp() {

    const validate = (form) => {
        const data = new FormData(form);

        // valida nome
        if(data.get('name') === '') {
            return { type: 'name', message: 'O campo nome é obrigatório!' };
        }

        // valida email
        if(data.get('email') === '') {
            return { type: 'email', message: 'O campo email é obrigatório!' };
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(String(data.get('email')).toLowerCase())) {
            return { type: 'email', message: 'Digite um e-mail valido!' };
        }

        // valida senha
        const minLength = /.{8,}/; // Pelo menos 8 caracteres
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Pelo menos um caractere especial
        const hasNumericChar = /[0-9]/; // Pelo menos um caractere numérico
        const hasAlphaChar = /[a-zA-Z]/; // Pelo menos um caractere alfanumérico (letra)

        // vazia
        if(data.get('password') === '') {
            return { type: 'password', message: 'Digite uma senha' };
        }

        // minimo
        if (!minLength.test(data.get('password'))) {
            return { type: 'password', message: 'Senha não tem pelo menos 8 caracteres' };
        }

        // especial
        if (!hasSpecialChar.test(data.get('password'))) {
            return { type: 'password', message: 'Senha não tem caractere especial' };
        }

        // numérico
        if (!hasNumericChar.test(data.get('password'))) {
            return { type: 'password', message: 'Senha não tem caractere numérico' };
        }

        // alfanumérico
        if (!hasAlphaChar.test(data.get('password'))) {
            return { type: 'password', message: 'Senha não tem caractere alfanumérico' };
        }

        // confirma senha
        if(data.get('confirm_password') === '') {
            return { type: 'confirm_password', message: 'Confirme sua senha' };
        }

        if(data.get('password') !== data.get('confirm_password')) {
            return { type: 'confirm_password', message: 'As senhas não conferem!' };
        }

        // Recupera o array de usuários do localStorage, ou inicializa um novo array
        let usersArray = JSON.parse(localStorage.getItem('users')) || [];
        
        // verifica se usuário ja foi cadastrando
        let user = usersArray.find((u) => u.email === data.get('email'));
        
        // se o usuário ja foi cadastrado
        if(user) {
            return { type: 'submit', message: 'Um usuário já foi cadastrado com esse e-mail!' };
        } else {
            return false;
        }
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

  return { validate, submit };
}

export default useSignUp;