<template>
  <form @submit.prevent="onFormSubmit">
    <Field name="firstName" v-slot="{ field, errorMessage, value }">
      <v-text-field
        v-bind="field"
        :model-value="value"
        label="نام"
        :error-messages="errorMessage"
      />
    </Field>

    <Field name="lastName" v-slot="{ field, errorMessage, value }">
      <v-text-field
        v-bind="field"
        :model-value="value"
        label="نام خانوادگی"
        :error-messages="errorMessage"
      />
    </Field>

    <Field name="email" v-slot="{ field, errorMessage, value }">
      <v-text-field
        v-bind="field"
        :model-value="value"
        label="ایمیل"
        type="email"
        :error-messages="errorMessage"
      />
    </Field>

    <Field name="dateOfBirth" v-slot="{ errorMessage }">
      <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props: menuProps }">
          <v-text-field
            v-model="displayDate"
            label="تاریخ تولد"
            readonly
            v-bind="menuProps"
            :error-messages="errorMessage"
          />
        </template>

        <v-date-picker v-model="tempDate">
          <template #actions>
            <v-btn color="primary" @click="confirmDate">
              تایید
            </v-btn>
          </template>
        </v-date-picker>
      </v-menu>
    </Field>

    <FamilyForm />

    <v-btn color="primary" type="submit" class="mt-2">
      {{ isEdit ? "بروزرسانی" : "افزودن" }}
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Field, useForm } from "vee-validate";
import { employeeSchema } from "../validation/employee.schema";
import FamilyForm from "./FamilyForm.vue";
import type { Employee, EmployeeCreate } from "../types/employee";

const props = defineProps<{
  employee: Employee | null;
}>();

const emit = defineEmits<{
  (e: "submit", payload: EmployeeCreate): void;
}>();

const isEdit = ref(!!props.employee);

const menu = ref(false);
const tempDate = ref<Date | null>(null);
const displayDate = ref("");

const { handleSubmit, setFieldValue, setValues, resetForm } = useForm<EmployeeCreate>({
  validationSchema: employeeSchema,
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: null,
    family: [],
  },
});

watch(
  () => props.employee,
  (val) => {
    if (!val) {
      resetForm();
      displayDate.value = "";
      tempDate.value = null;
      isEdit.value = false;
      return;
    }

    isEdit.value = true;
    
    setValues({
      firstName: val.firstName || "",
      lastName: val.lastName || "",
      email: val.email || "",
      dateOfBirth: val.dateOfBirth || null,
      family: val.family || [],
    });

      if (val.dateOfBirth) {
      const d = new Date(val.dateOfBirth);
      tempDate.value = d;
      displayDate.value = d.toLocaleDateString("fa-IR");
    } else {
      displayDate.value = "";
      tempDate.value = null;
    }
  },
  { immediate: true }
);

const confirmDate = () => {
  if (!tempDate.value) {
    menu.value = false;
    return;
  }

  const iso = tempDate.value.toISOString();
  setFieldValue("dateOfBirth", iso);
  displayDate.value = tempDate.value.toLocaleDateString("fa-IR");
  menu.value = false;
};

const onFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>