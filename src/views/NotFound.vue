<template>
  <div class="">
    <NotFoundComponent  />
  </div>
</template>

<script>
// @ is an alias to /src
import NotFoundComponent from "@/components/NotFoundComponent.vue";

export default {
  name: "NotFound",
  components: {
    NotFoundComponent
  }
};
</script>
