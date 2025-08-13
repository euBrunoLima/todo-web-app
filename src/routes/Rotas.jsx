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
import PrivateRoute from '../routes/PrivateRoutes.jsx'
import PublicRoute from '../routes/PublicRoute.jsx'; // novo import

function Rotas() {
  return (
    <Router>
      <Routes>
        {/* Rota pública livre */}
        <Route path='/' element={<Splash />} />

        {/* Rotas públicas que bloqueiam se logado */}
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/presentation' element={
          <PublicRoute>
            <Presentation />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='/forgot_password' element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path='/email_sent' element={
          <PublicRoute>
            <EmailSent />
          </PublicRoute>
        } />

        {/* Rotas privadas */}
        <Route path='/tasks' element={
          <PrivateRoute>
            <TaksList />
          </PrivateRoute>
        } />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/calendar' element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        } />
        <Route path='/perfil' element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default Rotas;
