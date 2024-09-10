<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-box">
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="$emit('confirm')" class="btn btn-confirm">Yes</button>
        <button @click="$emit('close')" class="btn btn-cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  visible: Boolean
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-confirm {
  background-color: #28a745;
  color: white;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
}
</style>
