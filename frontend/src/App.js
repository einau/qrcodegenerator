import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyPage from './components/VerifyPage';
import StudentProfile from './components/StudentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify/:id" element={<VerifyPage />} />
        <Route path="/student/:id" element={<StudentProfile />} />
        <Route path="/" element={<div className="text-center p-10"><h1 className="text-2xl">Fly Ontime Certificate Verification</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
