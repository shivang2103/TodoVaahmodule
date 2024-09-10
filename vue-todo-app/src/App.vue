<template>
  <div class="app-container">
    <Tabs :activeTab="activeTab" @changeTab="changeTab" />
    <TodoForm @submitTodo="submitTodo" :editTodo="editTodo" />
    <div class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @edit="startEditing"
        @markComplete="markComplete"
        @markIncomplete="markIncomplete"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';
import TodoItem from './components/TodoItem.vue';
import TodoForm from './components/TodoForm.vue';
import Tabs from './components/Tabs.vue';

const todoStore = useTodoStore();
const activeTab = ref('all');
const editTodo = ref(null);

onMounted(() => {
  fetchTodos();
});

const fetchTodos = async () => {
  await todoStore.fetchTodos();
};

const submitTodo = async (todo) => {
  if (editTodo.value) {
    await todoStore.updateTodo(editTodo.value.id, todo);
    editTodo.value = null;
  } else {
    await todoStore.addTodo(todo);
  }
};

const startEditing = (todo) => {
  editTodo.value = todo;
};

const markComplete = async (id) => {
  await todoStore.markComplete(id);
};

const markIncomplete = async (id) => {
  await todoStore.markIncomplete(id);
};

const deleteTodo = async (id) => {
  await todoStore.deleteTodo(id);
};

const changeTab = (tab) => {
  activeTab.value = tab;
};

const filteredTodos = computed(() => {
  return activeTab.value === 'all'
    ? todoStore.todos.filter(todo => !todo.is_complete)
    : todoStore.todos.filter(todo => todo.is_complete);
});
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
