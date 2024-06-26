import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import EditCliente from './pages/EditCliente';
import E404 from './pages/E404';
import UseEjecutivos from './components/providers/useEjecutivos';
import Registrar from './pages/Registrar';
import Logout from './pages/logout';
import FormikForm from './pages/formikForm';
import Archivos from './pages/Archivos';
import Servicios from './pages/Servicios';
import Ejecutivos from './pages/Ejecutivos';
//redux
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <>  
      
        <UseEjecutivos>
          <BrowserRouter>     
            <Provider store={ store }>
              <PersistGate persistor={persistor}>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/registrar" element={<Registrar/>} />
                  <Route path="/EditCliente" element={<EditCliente/>} />
                  <Route path="/Ejecutivos" element={<Ejecutivos/>} />
                  <Route path="/Archivos" element= {<Archivos/>} />
                  <Route path="/agregarServicio" element= {<Servicios/>} />
                  <Route path="/formik" element={<FormikForm/>} />
                  <Route path='*' element={<E404 />}/>
                </Routes>
              </PersistGate>
            </Provider>
          </BrowserRouter>
        </UseEjecutivos>

    </>
  );
}

export default App;
