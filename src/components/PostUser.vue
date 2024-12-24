<template>
  <section class="d-flex justify-center">
    <div class="create-post  rounded-lg">
      <v-avatar>
        <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-avatar>
      <div class="create-post-input">
        <p class="color-text">¿Qué estás pensando?</p>
      </div>
      <v-divider ></v-divider>
      <v-img alt="imagen" v-bind:src="OpenImagesIcon" width="25px" height="25px" class="open-image"></v-img>
    </div>
   
  </section>
</template>
<script>
 import { defineComponent } from 'vue';
 import  OpenImagesIcon from '../assets/images.png' 
 export default defineComponent({
   setup () {
    return {OpenImagesIcon}
   }
 })
</script>
<style scoped>
.create-post {
  max-width: 100%;
  height: 123px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.create-post-input {
  background-color: #f0f2f5;
  width: 600px;
  height: 40px;
  border-radius: 30px;
  padding: 9px;
}

.open-image {
  align-self: flex-start;
}

.color-text {
  color: #65686c;
}
</style>