import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {

  return (
<>
        <Routes>
          <Route path='/' element={<Auth insideRegister/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/> 
          <Route path='/*' element={<Navigate to={'/'}/>}/>
        </Routes>
</>    
  );
}

export default App;
