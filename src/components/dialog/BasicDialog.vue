<script setup>
import { computed, ref, shallowRef, watch } from "vue";
import { useAppStore } from "@/stores";
import { storeToRefs } from "pinia";
import CapacityForm from "@/components/form/CapacityForm.vue";
import DetailCapacity from "@/components/card/DetailCapacity.vue";

const appStore = useAppStore();
const { dialog, detailLoad } = storeToRefs(appStore);

const title = ref(null);
const form = shallowRef(null);
const isVisible = ref(false);

watch(dialog, () => {
  if (dialog.value) isVisible.value = true;
  else isVisible.value = false;

  switch (dialog.value) {
    case "add-capacity":
      title.value = "Add Capacity";
      form.value = CapacityForm;
      break;
    case "detail-capacity":
      title.value = "Detail User Capacity";
      form.value = DetailCapacity;
      break;
  }
});

const handleClose = () => {
  dialog.value = null;
  detailLoad.value = null;
};
</script>

<template>
  <el-dialog v-model="isVisible" :title="title" @closed="handleClose">
    <component :is="form" />
  </el-dialog>
</template>
