import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTodos() {
      this.loading = true;
      try {
        const response = await axios.get('/todos');
        this.todos = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addTodo(todo) {
      this.loading = true;
      try {
        await axios.post('/todos', todo);
        await this.fetchTodos();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateTodo(id, updatedTodo) {
      this.loading = true;
      try {
        await axios.put(`/todos/${id}`, updatedTodo);
        await this.fetchTodos();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteTodo(id) {
      this.loading = true;
      try {
        await axios.delete(`/todos/${id}`);
        await this.fetchTodos();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async markComplete(id) {
      this.loading = true;
      try {
        const response = await axios.patch(`/todos/${id}/complete`);
        const updatedTodo = response.data;
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async markIncomplete(id) {
      this.loading = true;
      try {
        const response = await axios.patch(`/todos/${id}/incomplete`);
        const updatedTodo = response.data;
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});
