<script setup>
import { useAppStore } from "@/stores";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { parsedCapacity } = storeToRefs(appStore);
</script>

<template>
  <div v-if="parsedCapacity">
    <div
      class="pb-8 text-slate-300 flex justify-between items-center"
      v-if="parsedCapacity.length"
    >
      <div>
        <h1 class="text-2xl font-bold">{{ parsedCapacity[0].user.name }}</h1>
        <p>{{ parsedCapacity[0].user.email }}</p>
      </div>
      <p>{{ parsedCapacity[0].date }}</p>
    </div>
    <el-table :data="parsedCapacity" border style="width: 100%">
      <el-table-column prop="project.pic" label="PIC" />
      <el-table-column prop="project.name" label="Project Name" />
      <el-table-column prop="assigned_hour" label="Hour" width="60" />
      <el-table-column width="100">
        <template #default="scope">
          <el-button
            link
            type="danger"
            size="small"
            @click="appStore.deleteCapacity(scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
