<template>
  <div class="tabs">
    <button @click="$emit('changeTab', 'all')" :class="{ active: activeTab === 'all' }">All Todos</button>
    <button @click="$emit('changeTab', 'completed')" :class="{ active: activeTab === 'complete' }">Completed Todos</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  activeTab: String
});
</script>

<style scoped>
.tabs {
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 16px;
}

.tabs button.active {
  background-color: #007bff;
  color: white;
}
</style>
