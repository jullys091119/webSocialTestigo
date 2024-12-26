<template>
  <v-card class="w-100 my-10" max-width="100%">
    <v-card-title>
      Top western road trips
    </v-card-title>
    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>
    <v-card-item class="d-flex flex-column items-center justify-center post">
      <v-img  width="500px"  height="888px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
    </v-card-item>

  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "CurrentPost",
  setup() {

  }
})
</script>

<style scoped>
.post {
  background-color: rgb(19, 19, 19);
}
</style>