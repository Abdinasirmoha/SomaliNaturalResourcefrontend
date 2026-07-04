import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Resources from '../pages/Resources';
import Projects from '../pages/Projects';
import Reports from '../pages/Reports';
import Users from '../pages/Users';
import About from '../pages/About';

import PublicProjects from '../pages/public/PublicProjects';
import PublicResearch from '../pages/public/PublicResearch';
import PublicGISMap from '../pages/public/PublicGISMap';
import PublicAbout from '../pages/public/PublicAbout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="public-projects" element={<PublicProjects />} />
        <Route path="research" element={<PublicResearch />} />
        <Route path="gis-map" element={<PublicGISMap />} />
        <Route path="about-us" element={<PublicAbout />} />
      </Route>
      
      {/* Protected Admin Routes */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="resources" element={<Resources />} />
        <Route path="projects" element={<Projects />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
