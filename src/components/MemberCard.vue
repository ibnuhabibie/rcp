<script setup>
import { computed } from "vue";

const props = defineProps(["user"]);

const avatar = computed(
  () => `https://api.dicebear.com/6.x/lorelei/svg?seed=${props.user.name}`
);
</script>

<template>
  <div class="member-card">
    <img :src="avatar" :alt="props.user?.name" />
    <div class="flex flex-col">
      <h3>{{ props.user?.name }}</h3>
      <p>{{ props.user?.email }}</p>
    </div>
  </div>
</template>
]
