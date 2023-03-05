<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Todo from "@/components/TodoComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Todo,
  },
});
</script>
