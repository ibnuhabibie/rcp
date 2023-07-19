<script setup>
import { storeToRefs } from "pinia";

import { useAppStore } from "../stores/index";
const appStore = useAppStore();
const { roles, roleFilter } = storeToRefs(appStore);
</script>

<template>
  <div class="role-filter">
    <el-select
      v-model="roleFilter"
      class="m-2"
      placeholder="Select"
      @change="appStore.getCapacities"
    >
      <el-option
        v-for="item in roles"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
