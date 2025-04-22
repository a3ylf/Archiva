import axios from 'axios';

const API = 'http://localhost:3000'; // Altere conforme o backend

export async function login(username: string, password: string) {
  const res = await axios.post(`${API}/auth/login`, { username, password });
  return res.data;
}

export async function signup(username: string, password: string) {
  const res = await axios.post(`${API}/auth/signup`, { username, password });
  return res.data;
}

