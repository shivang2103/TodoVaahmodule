<template>
    <div class="todo-app">
      <h1>Todo App</h1>
      <TodoForm :editTodo="currentTodo" @submitTodo="handleFormSubmit" />
      <Tabs :activeTab="activeTab" @changeTab="changeTab" />
      <div>
        <TodoItem 
          v-for="todo in filteredTodos" 
          :key="todo.id" 
          :todo="todo" 
          @edit="handleEdit" 
          @delete="handleDelete" 
          @markComplete="markComplete" 
          @markIncomplete="markIncomplete" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useTodoStore } from '../stores/todoStore';
  import TodoForm from '../components/TodoForm.vue';
  import TodoItem from '../components/TodoItem.vue';
  import Tabs from '../components/Tabs.vue';
  
  const todoStore = useTodoStore();
  const activeTab = ref('all');
  const currentTodo = ref(null);
  
  const filteredTodos = computed(() => {
    return activeTab.value === 'all' 
      ? todoStore.todos 
      : todoStore.todos.filter(todo => todo.status === 'complete');
  });
  
  const changeTab = (tab) => {
    activeTab.value = tab;
  };
  
  const handleFormSubmit = async (todo) => {
    if (currentTodo.value) {
      await todoStore.updateTodo(todo);
    } else {
      const newTodo = await todoStore.addTodo(todo);
      todoStore.todos.push(newTodo); // Add the new Todo to the existing list
    }
    currentTodo.value = null;
  };
  
  const handleEdit = (todo) => {
    currentTodo.value = todo;
  };
  
  const handleDelete = async (id) => {
    await todoStore.deleteTodo(id);
  };
  
  const markComplete = async (todo) => {
    await todoStore.markComplete(todo.id);
  };
  
  const markIncomplete = async (todo) => {
    await todoStore.markIncomplete(todo.id);
  };
  </script>
  
  <style scoped>
  .todo-app {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  </style>
  