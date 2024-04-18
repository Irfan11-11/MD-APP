import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {

  return (
<>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth insideRegister/>}/> 
          <Route path='/*' element={<Navigate to={'/'}/>}/>
        </Routes>
</>    
  );
}

export default App;
