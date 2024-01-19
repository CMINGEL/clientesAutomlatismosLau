import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    password:yup.string().required('Contraseña es requerida').min(4, 'Contraseña demasiado corta').max(15, 'Contraseña demasiado larga'),
    email:yup.string().email('Email debe ser valido').required('Email es requerido')
})