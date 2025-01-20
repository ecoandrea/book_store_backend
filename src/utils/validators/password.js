/*
Validar contraseña
Minimo 8 caracteres
Incluya Mayusculas y Minusculas
Inlcuya al menos un numero
No contenga 3 o mas numeros conse cutivos ascendentes o consecutivos identicos
Al menos uncaracter especial
Que no sea tu cumpleaños
Que no contenga letras consecutivas en secuencia ascendentes
*/

import { AuthError, ValidateError } from '../../errors/TypeError.js';

export const validatePassword = (password, birthday) => {
    if(password.length < 8) {
        throw new ValidateError('La contraseña debe contener al menos 8 caracteres');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if(!passRegex.test(password)) {
        throw new ValidateError('La contraseña debe incluir al menos una mayúscula, una minúscula, un dígito y un carácter especial');
    }

    if(birthday && password.includes(birthday)) {
        throw new ValidateError('La contraseña no puede contener tu cumpleaños');
    }

    const digitChain = password.replace(/\D+/g, '');

    for(let i = 0; i < digitChain.length - 2; i++) {
        const digitOne = parseInt(digitChain[i], 10);
        const digitTwo = parseInt(digitChain[i + 1], 10);
        const digitThree = parseInt(digitChain[i + 2], 10);

        //parseInt para convertirlo en numero, se saca primer digito
        //esto es cadena de texto y hay que convertir a numero
        //base 10 porque js  a veces al convertir 0, 1 lo reconoce como truly o falsy
        if(digitOne === digitTwo && digitTwo === digitThree) {
            throw new ValidateError('La contraseña no puede tener 3 dígitos idénticos consecutivos');
        }

        if((digitOne + 1 === digitTwo) && (digitTwo + 1 === digitThree)) {
            throw new ValidateError('La contraseña no puede tener 3 dígitos consecutivos ascendentes');
        }
    }

    const lettersChain = password.replace(/[^A-Za-z]+/g, '');
    for (let i = 0; i < lettersChain.length - 2; i++) {
        const letterOne = lettersChain.charCodeAt(i);
        const letterTwo = lettersChain.charCodeAt(i + 1);
        const letterThree = lettersChain.charCodeAt(i + 2);

        if((letterOne + 1 === letterTwo) && (letterTwo + 1 === letterThree)) {
            throw new ValidateError('La contraseña no puede tener 3 letras en secuencia ascendente consecutiva');
        }
    }

    return true;
};


export const isNotMatchedPassword = (matchResult) => {
    if(!matchResult) throw new AuthError('Credenciales inválidas');
};