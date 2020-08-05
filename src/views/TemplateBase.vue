<template>
  <div class="template-base">
    <NavigationComponent />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
    name: "TemplateBase",
    components: {
        NavigationComponent
    }
};
</script>
