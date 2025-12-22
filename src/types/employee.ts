export type FamilyRelation = 'spouse' | 'son' | 'daughter'


export interface Family {
  name: string
  dateOfBirth?: string
  relation: FamilyRelation
}

export interface EmployeeBrief {
  id: string
  firstName: string
  lastName: string
}

export interface EmployeeCreate {
  firstName: string
  lastName: string
  email?: string
  dateOfBirth?: string
  family?: Family[]
}

export interface Employee extends EmployeeCreate {
  id: string
}

