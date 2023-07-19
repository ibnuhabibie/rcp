<script setup>
import { storeToRefs } from "pinia";

import RoleFilter from "@/components/RoleFilter.vue";
import MemberCard from "@/components/MemberCard.vue";

import { useAppStore } from "@/stores/index";

const appStore = useAppStore();
const { dateFilter, filteredUsers } = storeToRefs(appStore);

const handleScroll = (e) => {
  let container = document.querySelector(".gantt-container");
  container.scrollTo(0, e.target.scrollTop);
};
</script>

<template>
  <div class="gantt-member" @scroll="handleScroll">
    <div class="pt-2 px-2 dark:bg-slate-700 bg-gray-100 sticky top-0">
      <el-date-picker
        v-model="dateFilter"
        type="daterange"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        size="small"
        @change="appStore.handleDateFilter"
      />
    </div>
    <RoleFilter />
    <MemberCard v-for="user in filteredUsers" :key="user.id" :user="user" />
  </div>
</template>
