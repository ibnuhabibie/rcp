<script setup>
import { storeToRefs } from "pinia";

import { useAppStore } from "@/stores/index";
import { renderCapacity } from "@/utils";
import { onBeforeMount } from "vue";

const appStore = useAppStore();
const { allDates, dates, filteredUsers, userLoads, dialog, detailLoad } =
  storeToRefs(appStore);

onBeforeMount(() => {
  appStore.fetchData();
});
const handleClick = (e) => {
  detailLoad.value = e.target.dataset.capacity;
  dialog.value = "detail-capacity";
};
</script>

<template>
  <div class="gantt-container">
    <div class="gantt-wrapper">
      <div
        class="gantt-date-wrapper border-r last:border-r-0"
        v-for="(allDates, key) in dates"
        :key="key"
      >
        <div class="gantt-month">{{ key }}</div>
        <div class="gantt-dates">
          <div
            v-for="data in allDates"
            :key="data.date.getDate()"
            class="flex flex-col"
          >
            <span class="uppercase">
              {{ data.date.toLocaleDateString("id", { weekday: "short" }) }}
            </span>
            <span>{{ data.date.getDate() }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="gantt-load">
      <div class="member-load" v-for="i in filteredUsers" :key="i.id">
        <div
          v-for="date in allDates"
          :key="date"
          class="flex items-center justify-center"
          v-html="renderCapacity(userLoads, date, i.id)"
          @click="handleClick"
        ></div>
      </div>
    </div>
  </div>
</template>
