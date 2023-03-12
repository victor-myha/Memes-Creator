import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Auth from './components/Authorization/Auth';
import Categories from './components/Categories/Categories';
import Error404 from './components/Error404/Error404';

const App = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    navigate('/');
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route
        path='/'
        element={isAuthenticated ? <Navigate to='/categories' /> : <Navigate to='/auth' />}
      />
      <Route
        path='/auth'
        element={<Auth isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path='/categories'
        element={
          <Categories isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route path={'*'} element={<Error404 />} />
    </Routes>
  );
};

export default App;
