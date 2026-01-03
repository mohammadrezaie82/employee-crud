<template>
  <v-card class="pa-3" outlined @click="$emit('click',employee.id)">
    {{ employee.firstName }} {{ employee.lastName }}
  </v-card>
</template>

<script setup lang="ts">
import type { EmployeeBrief } from '../types/employee'

defineProps<{
  employee: EmployeeBrief
}>()

</script>
