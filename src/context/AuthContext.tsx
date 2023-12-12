// AuthContext.tsx
import React, {createContext, useState, useContext} from 'react';
import {Alert} from 'react-native';
// Define the shape of your context data
interface AuthContextData {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  login: () => null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
        // expiresInMins: 60, // optional
      }),
    });
    const results = await res.json();
    if (results.token) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Auth error', 'Please provide correct username and password');
    }
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  );
};
