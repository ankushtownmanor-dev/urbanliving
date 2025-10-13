import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './compoent/Homepage/Home';

import HoomieFooter from './compoent/Homepage/HoomieFooter';
import LuxeMain from './compoent/Secondpage/LuxeMain';
import ThirdMain from './compoent/ThirdPage/ThirdMain';
import Payment from './compoent/payment/Payment';
import Auth from './Auth';
import AuthPage from './compoent/Login/AuthPage';
import About from './compoent/about/About';
import Dashboard from './compoent/Dashboard/Dashboard';
import Navbar from './compoent/Homepage/Navbar';
import Sucess from './compoent/payment/Sucess';
import Failure from './compoent/payment/Failure';
import ListPropertyPage from './compoent/ListProperty/ListPropertyPage';
import { AuthProvider } from './compoent/Login/AuthContext';

import FourthMain from './compoent/FourthPage/FourthMain';
import FifthMain from './compoent/Fifth/FifthMain';


import Ownermain from './Owner/Ownermain';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tmluxe" element={<LuxeMain />} />
          <Route path="/tmluxespecific/:id" element={<ThirdMain />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/success" element={<Sucess />} />
          <Route path="/failure" element={<Failure />} />

          <Route path="/selfmanage" element={<FourthMain />} />

          <Route path="/ownermain" element={<Ownermain />} />
          <Route path="/renovation" element={<FifthMain />} />

        </Routes>
        <HoomieFooter />
      </Router>
    </AuthProvider>
  );
}

export default App;
