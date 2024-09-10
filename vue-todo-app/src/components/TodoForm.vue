<template>
  <div class="todo-form">
    <h2>{{ editTodo ? 'Edit Todo' : 'Create New Todo' }}</h2>
    <form @submit.prevent="submitForm">
      <input v-model="todo.name" type="text" placeholder="Todo Name" required />
      <textarea v-model="todo.description" placeholder="Todo Description" required></textarea>
      <button type="submit" class="btn btn-submit">
        {{ editTodo ? 'Update Todo' : 'Add Todo' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  editTodo: Object
});

const emit = defineEmits(['submitTodo']);

const todo = ref({
  name: '',
  description: ''
});

watch(() => props.editTodo, (newTodo) => {
  if (newTodo) {
    todo.value = { ...newTodo };
  }
}, { immediate: true });

const submitForm = () => {
  emit('submitTodo', todo.value);
  todo.value = { name: '', description: '' }; // Reset form
};
</script>

<style scoped>
.todo-form {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.todo-form h2 {
  margin: 0 0 16px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  background: #007bff;
  color: white;
  font-size: 16px;
}
</style>
