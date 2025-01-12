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

import { ValidateError } from '../../errors/TypeError.js';


export const validatePassword = (password, birthday) => {
    if(password.length < 8) {
        throw new ValidateError('La contrasena debe tener al menos 8 caracteres ');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if(!passRegex.test(password)) {
        throw new ValidateError('La contrasena debe cumplir con los requisitos: incluir mayúsculas y minúsculas, un número y un caracter especial');
    }

    if(birthday && password.includes(birthday))
        throw new ValidateError('La contrasena no debe contener tu cumpleaños');

    const digitChain = password.replace(/\D+/g, '');

    for(let i = 0; i < digitChain.lenght - 2; i++) {
        const digitOne = parseInt(digitChain[i], 10);
        const digitTwo = parseInt(digitChain[i+1], 10);
        const digitThree = parseInt(digitChain[i+2], 10);

        //parseInt para convertirlo en numero, se saca primer digito
        //esto es cadena de texto y hay que convertir a numero
        //base 10 porque js  a veces al convertir 0, 1 lo reconoce como truly o falsy

        if (digitOne === digitTwo && digitTwo === digitThree) {
            throw new ValidateError('La contrasena no debe contener 3 digitos identicos consecutivos');
        }

        if((digitOne + 1 === digitTwo ) && (digitTwo + 1 === digitThree)) {
            throw new ValidateError('La contrasena no debe contener 3 digitos consecutivos  ascendentes');
        }
    }

    const letterChain = password.replace(/[^A-Za-z]+/g, '');

    for(let i = 0; i < letterChain.lenght - 2; i++) {
        const lettertOne = parseInt(letterChain.charCodeAt[i],);
        const lettertTwo = parseInt(letterChain.charCodeAt[i+1]);
        const lettertThree = parseInt(letterChain.charCodeAt[i+2]);
    
    
      
    
        if((lettertOne + 1 === lettertTwo ) && (lettertTwo + 1 === lettertThree)) {
            throw new ValidateError('La contrasena no debe contener 3 letras consecutivos  ascendentes');
        }
    }

    return true;
};

