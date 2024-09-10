<template>
    <div>
      <TodoForm @submitTodo="submitTodo" :editTodo="editTodo" />
      <div class="todo-list">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @markComplete="markComplete"
          @markIncomplete="markIncomplete"
          @edit="startEditing"
          @delete="deleteTodo"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useTodoStore } from '../stores/todoStore';
  import TodoForm from './TodoForm.vue';
  import TodoItem from './TodoItem.vue';
  
  const todoStore = useTodoStore();
  const editTodo = ref(null);
  
  onMounted(async () => {
    await todoStore.fetchTodos();
  });
  
  const submitTodo = async (todo) => {
    if (editTodo.value) {
      await todoStore.updateTodo(editTodo.value.id, todo);
      editTodo.value = null;
    } else {
      await todoStore.addTodo(todo);
    }
  };
  
  const markComplete = async (id) => {
    await todoStore.markComplete(id);
  };
  
  const markIncomplete = async (id) => {
    await todoStore.markIncomplete(id);
  };
  
  const startEditing = (todo) => {
    editTodo.value = todo;
  };
  
  const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id);
  };
  </script>
  
  <style scoped>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>
  