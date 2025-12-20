import { api } from './client'
import type {
  Employee,
  EmployeeBrief,
  EmployeeCreate,
} from '../types/employee'

export const getEmployees = async () => {
  const response = await api.get<EmployeeBrief[]>('/employee')
  return response.data
}

export const getEmployeeById = async (id: string) => {
  const response = await api.get<Employee>(`/employee/${id}`)
  return response.data
}

export const createEmployee = async (data: EmployeeCreate) => {
  const response = await api.post<Employee>('/employee', data)
  return response.data
}

export const updateEmployee = async (
  id: string,
  data: EmployeeCreate
) => {
  const response = await api.put<Employee>(`/employee/${id}`, data)
  return response.data
}

export const deleteEmployee = async (id: string) => {
  await api.delete(`/employee/${id}`)
}
