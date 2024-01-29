import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/common/NavBar';
import OpenRoute from './components/Auth/OpenRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';


function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter ">
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        </Routes>
        
    </div>
  );
}

export default App;
