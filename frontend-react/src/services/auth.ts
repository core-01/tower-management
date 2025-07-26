export const loginUser = (username: string, password: string): boolean => {
  // Simulate auth — Replace with API call -- Hardcoded for mock
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('token', 'mock-token');
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

