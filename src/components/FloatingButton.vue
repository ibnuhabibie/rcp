<script setup>
import { Plus } from "@element-plus/icons-vue";

import { useAppStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { dialog } = storeToRefs(appStore);

const handleClick = () => {
  dialog.value = "add-capacity";
};
</script>

<template>
  <div class="fab" @click="handleClick">
    <el-icon size="large" color="white"><Plus /></el-icon>
  </div>
</template>
