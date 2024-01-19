import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const initialValues={
    name:"",
    email:"",
    password:""
}

const validar = (values) => {
    const errors = {}
    if(values.password.length < 5){ errors.password = 'La contraseña es demasiado corta, debe ser mayor a 5 caracteres'}
    if(values.password.length > 15){ errors.password = 'La contraseña es demasiado larga, debe ser menor de 15 caracteres'}
    if(!values.email.includes('@')){ errors.email = 'Email debe ser valido'}
    if(!values.email.includes('.')){ errors.email = 'Email debe ser valido'}
    return errors
}

const FormikForm = () => {

    const registrar = (values)=>{
        console.log(values)
    }
    return (
        <div>
            <Formik initialValues={initialValues} 
                onSubmit={registrar}
                validate={ validar }>
                <Form>
                    <Field name="name" type="text"/>
                    <Field name="email" type="email"/>
                    <ErrorMessage name='password'/>
                    <Field name="password" type="password"/>
                    <ErrorMessage name='password'/>
                    <button type='submit'> Registrar </button>
                </Form>
            </Formik>
        </div>
    );
}

export default FormikForm;
