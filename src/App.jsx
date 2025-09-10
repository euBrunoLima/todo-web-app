import Rotas from "./routes/Rotas";
import { AuthProvider } from "./context/AuthContext.jsx";
import { registerLicense } from "@syncfusion/ej2-base";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-calendars/styles/material.css";
import "./components/pages/calendar/Calendar.module.css"

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE);

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  )
  
}

export default App
