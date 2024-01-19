import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name:yup.string().min(4,'Nombre debe contener al menos 4 digitos').max(20).required('Nombre es requerido'),
    password:yup.string().min(4,'Password mayor a 4 digitos').max(20).required('Contraseña es requerida'),
    // confirmPassword:yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Contraseña debe coincidir'),
    email:yup.string().email('Debe ser un Email valido').required('Email es requerido')
})