// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import ProjectList from './components/projectlist';
import ProjectForm from './components/projectform';
import EditProject from './components/editproject';
import AboutMe from './components/aboutme';
import Skills from './components/skill';
import ContactForm from './components/contactform';
import PrivateRoute from './components/privateroute';

import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutMe isEditable={false} />} />
        <Route path="/skills" element={<Skills isEditable={false} />} />
        <Route path="/contact" element={<ContactForm isEditable={false} />} />

        {/* Protected routes (require authentication) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />

          {/* Editable views for logged-in users */}
          <Route path="/admin/about" element={<AboutMe isEditable={true} />} />
          <Route path="/admin/skills" element={<Skills isEditable={true} />} />
          <Route path="/admin/contact" element={<ContactForm isEditable={true} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
