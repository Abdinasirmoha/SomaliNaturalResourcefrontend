import api from './api';

export const login = async (emailOrUsername, password) => {
  // We send both 'username' and 'email' in the payload to ensure it matches the backend C# DTO, 
  // whether the backend developer named the property 'Username' or 'Email'.
  const response = await api.post('/Users/login', { 
    username: emailOrUsername,
    email: emailOrUsername,
    password: password 
  });
  return response.data;
};
