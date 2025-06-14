import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componet/Home';
import ChatPage from './Componet/ChatPage';
import Login from './Componet/Login';
import Register from './Componet/Register';
import Product from './Componet/Product';
import Services from './Componet/Service';
import Privacy from './Componet/Privacy';
import Contact from './Componet/Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
