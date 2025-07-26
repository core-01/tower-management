import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { TowerList } from './pages/TowerList';
import { TowerForm } from './pages/TowerForm';
import { TowerDetail } from './pages/TowerDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/1" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="towers" element={<TowerList />} />
            <Route path="towers/add" element={<TowerForm />} />
            <Route path="towers/:id" element={<TowerDetail />} />
            <Route path="towers/:id/edit" element={<TowerForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;