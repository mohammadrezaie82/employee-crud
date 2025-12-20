<template>
  <v-card class="pa-3" outlined @click="$emit('click')">
    {{ employee.firstName }} {{ employee.lastName }}
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { EmployeeBrief } from '../types/employee'

export default defineComponent({
  name: 'EmployeeCard',
  props: {
    employee: { type: Object as PropType<EmployeeBrief>, required: true },
  },
})
</script>
