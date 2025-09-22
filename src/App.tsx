import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AdminPanel } from './components/AdminPanel';
import { CropData } from './components/CropData';
import {AppPosters} from './components/appPosters';
import { BuyerRequirements } from './components/BuyerRequirements';
import { UserManagement } from './components/UserManagement';
import { AdManagement } from './components/AdManagement';
import { Analytics } from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/crops-data" element={<CropData />} />
          <Route path="/buyer-requirements" element={<BuyerRequirements />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/ad-management" element={<AdManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/app-posters" element={<AppPosters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;