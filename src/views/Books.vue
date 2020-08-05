<template>
  <div class="">
    <BooksComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import BooksComponent from "@/components/BooksComponent.vue";

export default {
  name: "Books",
  components: {
    BooksComponent
  }
};
</script>
