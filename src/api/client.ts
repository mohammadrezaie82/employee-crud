import axios from 'axios'

const API_BASE_URL = 'https://task.dev.fosidso.com'
const API_TOKEN = '5c0b19cd-6cac-4933-b73c-23897fa847b0'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    authorization: API_TOKEN,
    'Content-Type': 'application/json',
  },
})
