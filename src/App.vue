<script setup>
import GanttSidebar from "@/components/gantt/Sidebar.vue";
import GanttCalendar from "@/components/gantt/Calendar.vue";

import { useAppStore } from "@/stores/index";
import { onBeforeMount } from "vue";
import BasicDialog from "@/components/dialog/BasicDialog.vue";
import FloatingButton from "@/components/FloatingButton.vue";

const appStore = useAppStore();

onBeforeMount(() => {
  appStore.fetchData();
});
</script>

<template>
  <div class="relative">
    <div class="gantt">
      <GanttSidebar />
      <GanttCalendar />
    </div>
    <FloatingButton />
    <BasicDialog />
  </div>
</template>
