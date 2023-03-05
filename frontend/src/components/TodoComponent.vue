<template>
  <div class="container">
    <Toast v-if="showToast" :message="toastMessage" :showToast="showToast" />
    <h1 class="text-center my-5">Todo List</h1>
    <div>
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div
            class="card mb-3"
            v-for="todo in todos"
            :key="todo.id"
            :class="{ 'bg-success': todo.completed }"
          >
            <div class="card-body d-flex align-items-center">
              <div class="form-check mb-0">
                <input
                  class="form-check-input"
                  type="checkbox"
                  disabled="true"
                  :id="'todo-' + todo.id"
                  v-bind:checked="todo.status === 'processed'"
                />
              </div>
              <p class="text-center mb-0" :for="'todo-' + todo.id">
                {{ todo.text }}
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTodo" class="form-horizontal">
                <div class="form-group mb-3">
                  <label class="mb-3" for="new-todo">New Todo</label>
                  <input
                    type="text"
                    class="form-control"
                    id="new-todo"
                    v-model="newTodoTitle"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!Object.keys(todos).length">
      <br />
      <p>No todos yet. Add a new todo using the form above.</p>
    </div>
  </div>
</template>

<script>
import { fetchTodos, addTodo } from "@/api";
import Toast from "@/components/ToastComponent.vue";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      todos: {},
      newTodoTitle: "",
      showToast: false,
      toastMessage: "",
    };
  },
  async created() {
    await this.fetchTodos();
  },
  methods: {
    toastShow(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    },
    async fetchTodos() {
      const { data } = await fetchTodos();
      this.todos = data;
    },
    async addTodo() {
      let response;
      try {
        response = await addTodo(this.newTodoTitle);
      } catch (e) {
        console.log(e);
      }
      if (response) {
        this.todos = {
          ...this.todos,
          [response.data.id]: { ...response.data },
        };
        this.toastShow("Todo added successfully");
        this.newTodoTitle = "";
        console.log(this.todos);
      } else this.toastShow("Todo not added!");
    },
  },
};
</script>
