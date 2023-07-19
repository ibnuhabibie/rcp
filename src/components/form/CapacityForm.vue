<script setup>
import { reactive, ref } from "vue";
import { useAppStore } from "../../stores";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { users, projects, dialog } = storeToRefs(appStore);

const formRef = ref();
const form = reactive({
  user: null,
  project: null,
  assigned_hour: null,
  start_date: null,
  end_date: null,
  include_weekend: false,
});

const rules = reactive({
  user: {
    required: true,
  },
  project: {
    required: true,
  },
  assigned_hour: {
    required: true,
  },
  start_date: {
    required: true,
  },
  end_date: {
    required: true,
  },
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    appStore.handleAddCapacity(form);
    dialog.value = null;
    formEl.resetFields();
  });
};
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="User" prop="user">
      <el-select
        v-model="form.user"
        placeholder="Please select a user"
        class="w-full"
      >
        <el-option
          v-for="item in users"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Project" prop="project">
      <el-select
        v-model="form.project"
        placeholder="Please select a project"
        class="w-full"
      >
        <el-option
          v-for="item in projects"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Assigned Hour" prop="assigned_hour">
      <el-input type="number" v-model="form.assigned_hour" max="8" />
    </el-form-item>
    <el-form-item label="Activity time" required>
      <el-col :span="11">
        <el-form-item prop="start_date">
          <el-date-picker
            v-model="form.start_date"
            type="date"
            placeholder="Start date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="end_date">
          <el-date-picker
            v-model="form.end_date"
            type="date"
            placeholder="End date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Include Weekend" prop="include_weekend">
      <el-switch v-model="form.include_weekend" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-button.el-button--primary {
  background-color: var(--el-color-primary);
}
</style>
