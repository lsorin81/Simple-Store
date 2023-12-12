import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth} from '../context/AuthContext';

const AccountScreen = () => {
  const {isLoggedIn, login, logout} = useAuth();
  console.log('🚀 ~ file: AccountScreen.tsx:7 ~ AccountScreen ~ login:', login);
  console.log(
    '🚀 ~ file: AccountScreen.tsx:7 ~ AccountScreen ~ isLoggedIn:',
    isLoggedIn,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Validation error', 'Please provide username and password');
      return;
    }

    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.welcomeText}>
            You are logged in as an admin. You can add products from the Home
            Page.
          </Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AccountScreen;
