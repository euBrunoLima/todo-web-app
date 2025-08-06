import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from '../components/pages/splash/Splash';
import Login from '../components/pages/login/Login';
import Presentation from '../components/pages/presentation/Presentation';
import Register from '../components/pages/register/Register';
import ForgotPassword from '../components/pages/forgot_password/ForgotPassword';
import EmailSent from '../components/pages/email_sent/EmailSent';

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


        </Routes>
    </Router>
  );
}


export default Rotas;
