import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

axios.defaults.withCredentials = true

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getProfileBasic = async () => {
  try {
    const response = await axios.get(`${API_URL}/me/basic`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getProfileSession = async () => {
  try {
    const response = await axios.get(`${API_URL}/me/session`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}