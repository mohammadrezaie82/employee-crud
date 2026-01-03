<template>
  <v-container>
    <h1 class="text-right">کارمندان</h1>

    <v-row class="mt-3">
      <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4">
        <EmployeeCard :employee="employee" @click="openEmployee"/>
      </v-col>
    </v-row>

    <v-btn color="primary" class="mt-10" @click="openCreateForm">
      + افزودن کارمند
    </v-btn>

    <v-dialog v-model="isDetailOpen" max-width="600" >
      <v-card>
        <v-card-title>
          {{ selectedEmployee ? "ویرایش کارمند" : "افزودن کارمند" }}
        </v-card-title>
        <v-card-text>
          <EmployeeForm :employee="selectedEmployee" @submit="handleSubmit" />
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" v-if="selectedEmployee" @click="handleDelete">
            حذف کارمند
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="closeModal">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import EmployeeForm from "../components/EmployeeForm.vue"
import type { EmployeeBrief, Employee, EmployeeCreate } from "../types/employee"

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employee.api"
import EmployeeCard from "../components/EmployeeCard.vue"

const employees = ref<EmployeeBrief[]>([])
const selectedEmployee = ref<Employee | null>(null)
const isDetailOpen = ref(false)

const fetchEmployees = async () => {
  employees.value = await getEmployees()
}

const openEmployee = async (id: string) => {
  selectedEmployee.value = await getEmployeeById(id)
  isDetailOpen.value = true
}

const openCreateForm = () => {
  selectedEmployee.value = null
  isDetailOpen.value = true
}

const closeModal = () => {
  selectedEmployee.value = null
  isDetailOpen.value = false
}

const handleSubmit = async (formData: EmployeeCreate) => {
  if (selectedEmployee.value) {
    await updateEmployee(selectedEmployee.value.id, formData)
  } else {
    await createEmployee(formData)
  }
  await fetchEmployees()
  closeModal()
}

const handleDelete = async () => {
  if (!selectedEmployee.value) return
  const confirmDelete = confirm("آیا مطمئن هستید که می‌خواهید حذف کنید؟")
  if (!confirmDelete) return

  await deleteEmployee(selectedEmployee.value.id)
  await fetchEmployees()
  closeModal()
}

onMounted(fetchEmployees)
</script>
