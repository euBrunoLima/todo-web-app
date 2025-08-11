import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from '../components/pages/splash/Splash';
import Login from '../components/pages/login/Login';
import Presentation from '../components/pages/presentation/Presentation';
import Register from '../components/pages/register/Register';
import ForgotPassword from '../components/pages/forgot_password/ForgotPassword';
import EmailSent from '../components/pages/email_sent/EmailSent';
import TaksList from '../components/pages/tasks/TaskList';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Calendar from '../components/pages/calendar/Calendar';
import Perfil from '../components/pages/perfil/Perfil';

function Rotas() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/login' element={<Login />} />
          <Route path='/presentation' element={<Presentation />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/email_sent' element={<EmailSent />} />
          <Route path='/tasks' element={<TaksList />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
    </Router>
  );
}


export default Rotas;
