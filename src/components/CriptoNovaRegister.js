import React, { useState } from 'react';

const CriptoNovaRegister = ({ onRegisterSuccess, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('criptonovaUsers')) || [];
    const userExists = users.find(u => u.email === email);

    if (userExists) {
      alert('El correo electrónico ya está registrado.');
      return;
    }

    const newUser = {
      email,
      password,
      balance: 10000,
      portfolio: [],
      transactions: [],
    };

    localStorage.setItem('criptonovaUsers', JSON.stringify([...users, newUser]));
    localStorage.setItem('criptonovaCurrentUser', JSON.stringify(newUser));
    onRegisterSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Registro</h2>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="register-email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="register-email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="register-password">
            Contraseña
          </label>
          <input
            type="password"
            id="register-password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="confirm-password">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          onClick={handleRegister}
        >
          Registrarse
        </button>
        <button
          className="w-full text-green-400 py-2 rounded-lg font-semibold hover:underline focus:outline-none"
          onClick={onLoginClick}
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </button>
      </div>
    </div>
  );
};

export default CriptoNovaRegister;