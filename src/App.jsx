import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RoutesConfig from './routes/RoutesConfig'


const App=()=>{
  return (
    <div>
      <ToastContainer />
      <RoutesConfig />
    </div>
  );
}

export default App
