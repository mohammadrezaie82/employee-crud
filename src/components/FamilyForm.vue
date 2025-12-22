<template>
  <v-card outlined class="pa-4 mt-4">
    <v-card-title class="text-h6">اعضای خانواده</v-card-title>
    <v-divider class="mb-4" />

    <div
      v-for="(member, index) in localMembers"
      :key="index"
      class="mb-4"
    >
      <v-row align="center">
        <v-col cols="12" sm="4">
          <Field
            :name="`family[${index}].name`"
            v-slot="{ field, errorMessage, value }"
          >
            <v-text-field
              v-bind="field"
              :model-value="value"
              label="نام عضو"
              :error-messages="errorMessage"
              density="comfortable"
            />
          </Field>
        </v-col>

        <v-col cols="12" sm="3">
          <Field
            :name="`family[${index}].relation`"
            v-slot="{ field, errorMessage, value }"
          >
            <v-select
              v-bind="field"
              :model-value="value"
              :items="relationItems"
              item-title="text"
              item-value="value"
              label="نسبت"
              :error-messages="errorMessage"
              density="comfortable"
            />
          </Field>
        </v-col>

        <v-col cols="12" sm="4">
          <Field :name="`family[${index}].dateOfBirth`" v-slot="{ errorMessage }">
            <v-menu
              v-model="member.menu"
              :close-on-content-click="false"
            >
              <template #activator="{ props: menuProps }">
                <v-text-field
                  v-model="member.displayDate"
                  label="تاریخ تولد"
                  readonly
                  v-bind="menuProps"
                  append-inner-icon="mdi-calendar"
                  :error-messages="errorMessage"
                  density="comfortable"
                />
              </template>

              <v-date-picker v-model="member.tempDate">
                <template #actions>
                  <v-btn color="primary" @click="confirmDate(index)">
                    تایید
                  </v-btn>
                </template>
              </v-date-picker>
            </v-menu>
          </Field>
        </v-col>

        <v-col cols="12" sm="1" class="d-flex justify-center">
          <v-btn
            icon
            variant="text"
            color="error"
            size="small"
            @click="removeMember(index)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-btn
      color="primary"
      variant="outlined"
      prepend-icon="mdi-plus"
      @click="addMember"
    >
      افزودن عضو خانواده
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Field, useFieldArray, useFormContext } from "vee-validate";

interface LocalMember {
  tempDate: Date | null;
  displayDate: string;
  menu: boolean;
}

const relationItems = [
  { value: "spouse", text: "همسر" },
  { value: "daughter", text: "دختر" },
  { value: "son", text: "پسر" },
];

const { setFieldValue } = useFormContext();

const { fields, push, remove } = useFieldArray<any>("family");

const localMembers = ref<LocalMember[]>([]);

const formatDateForDisplay = (dateValue: string | Date | null): string => {
  if (!dateValue) return "";
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("fa-IR");
  } catch {
    return "";
  }
};

watch(
  fields,
  (newFields) => {
    
    if (newFields.length > localMembers.value.length) {
      for (let i = localMembers.value.length; i < newFields.length; i++) {
        const fieldValue = newFields[i].value;
        const existingDate = fieldValue?.dateOfBirth;
                
        localMembers.value.push({
          tempDate: existingDate ? new Date(existingDate) : null,
          displayDate: formatDateForDisplay(existingDate),
          menu: false,
        });
      }
    } else if (newFields.length < localMembers.value.length) {
      localMembers.value.splice(newFields.length);
    } else {
      newFields.forEach((field, i) => {
        if (localMembers.value[i]) {
          const existingDate = field.value?.dateOfBirth;
          if (existingDate && !localMembers.value[i].displayDate) {
            localMembers.value[i].displayDate = formatDateForDisplay(existingDate);
            localMembers.value[i].tempDate = new Date(existingDate);
          }
        }
      });
    }
  },
  { immediate: true, deep: true }
);

const addMember = () => {
  push({
    name: "",
    relation: "spouse",
    dateOfBirth: null,
  });
  
  localMembers.value.push({
    tempDate: null,
    displayDate: "",
    menu: false,
  });
  
};

const removeMember = (index: number) => {
  remove(index);
  localMembers.value.splice(index, 1);
};

const confirmDate = (index: number) => {
  const member = localMembers.value[index];
  if (!member.tempDate) {
    member.menu = false;
    return;
  }

  const date = new Date(member.tempDate);
  const iso = date.toISOString();
  
  member.displayDate = formatDateForDisplay(date);
  member.menu = false;

  setFieldValue(`family[${index}].dateOfBirth`, iso);
};
</script>

<style scoped>
.v-card {
  border: 1px solid #e0e0e0;
}
</style>