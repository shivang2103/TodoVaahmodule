<template>
  <div class="todo-card">
    <div class="todo-header">
      <h3>{{ todo.name }}</h3>
      <span :class="{ complete: todo.status === 'complete' }">
        {{ todo.status === 'complete' ? 'Complete' : 'Incomplete' }}
      </span>
    </div>
    <p class="todo-description">{{ todo.description }}</p>
    <div class="todo-actions">
      <button @click="$emit('edit', todo)" class="btn btn-edit">Edit</button>
      <button 
        @click="markComplete(todo.id)" 
        v-if="todo.status !== 'complete'" 
        class="btn btn-complete">
        Mark Complete
      </button>
      <button 
        @click="markIncomplete(todo.id)" 
        v-if="todo.status === 'complete'" 
        class="btn btn-incomplete">
        Mark Incomplete
      </button>
      <button @click="confirmDelete(todo.id)" class="btn btn-delete">Delete</button>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoStore';

export default {
  props: ['todo'],
  methods: {
    confirmDelete(todoId) {
      if (confirm('Are you sure you want to delete this Todo?')) {
        this.$emit('delete', todoId);
      }
    },
    markComplete(todoId) {
      const todoStore = useTodoStore();
      console.log('Marking todo as complete:', todoId);
      todoStore.markAsComplete(todoId)
        .then(() => {
          console.log('Todo marked as complete successfully');
        })
        .catch(error => {
          console.error('Error marking complete:', error);
        });
    },
    markIncomplete(todoId) {
      const todoStore = useTodoStore();
      console.log('Marking todo as incomplete:', todoId);
      todoStore.markAsIncomplete(todoId)
        .then(() => {
          console.log('Todo marked as incomplete successfully');
        })
        .catch(error => {
          console.error('Error marking incomplete:', error);
        });
    }
    
    
  }
};
</script>

<style scoped>
.todo-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 10px 0;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.todo-header h3 {
  margin: 0;
}

.todo-description {
  margin: 0;
  color: #555;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}

.btn-edit {
  background: #007bff;
  color: white;
}

.btn-complete {
  background: #28a745;
  color: white;
}

.btn-incomplete {
  background: #ffc107;
  color: white;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.complete {
  color: green;
}
</style>
