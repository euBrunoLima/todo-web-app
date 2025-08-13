import Rotas from "./routes/Rotas";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  )
  
}

export default App
