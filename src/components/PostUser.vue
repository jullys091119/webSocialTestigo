<template>
  <section width="100%" class="">
    <div class="create-post  my-4s rounded-lg" :style="[avatar, customWidthPosts]">
      <div class="avatarPicture d-flex ga-4">
        <v-avatar class="">
          <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
        </v-avatar>
        <div class="create-post-input" :style="createPostinputPerfil" v-on:click="activateModalProps = true">
          <ModalPost v-model:isActive="activateModalProps" />
          <p class="color-text">¿Qué estás pensando?</p>
        </div>
      </div>
      <v-divider></v-divider>
      <v-img alt="imagen" v-bind:src="OpenImagesIcon" width="25px" height="25px" class="open-image"></v-img>
    </div>
    <!-- Pasa el valor de activateModalProps y recibe actualizaciones mediante v-model -->
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import OpenImagesIcon from '../assets/images.png';
import ModalPost from './ModalPost.vue';

export default defineComponent({
  components: {
    ModalPost,
  },
  props: {
    createPostinputPerfil: {
      type: String,
      default: '', // Valor por defecto
    },
    avatarPicture: {
      type: String,
      default: '',
    },

    customWidthPosts: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const avatar = ref(props.avatarPicture);
    const imagePerfil = ref(localStorage.getItem('@IMAGEPERFIL'));
    const activateModalProps = ref(false);
    const customWidthPostRef = ref(props.customWidthPosts);
    console.log(customWidthPostRef.value, 'custom with post ref')
    

    return {
      OpenImagesIcon,
      avatar,
      imagePerfil,
      activateModalProps,
      customWidthPostRef
    };
  },
});
</script>

<style scoped>
.create-post {
  margin: auto;
  height: 123px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 100%;
}

.create-post-input {
  background-color: #f0f2f5;
  height: 40px;
  border-radius: 30px;
  padding: 9px 30px;
  display: flex;
  flex-grow: 1 !important;
}

.create-post-input-perfil {
  flex-grow: 1 !important;
  background-color: #f0f2f5;
  height: 40px;
  border-radius: 30px;
  padding: 9px;
  flex-grow: 1 !important;
  /* Hace que el input crezca para llenar el espacio disponible */
  max-width: 100%;
  /* Asegura que no se desborde */
  min-width: 0;
  /* Evita que el input se haga más pequeño de lo necesario */
}

.create-post>.d-flex {
  width: 100%;
}

.open-image {
  align-self: flex-start;
}

.color-text {
  color: #65686c;
  margin-left: -15px;
}
</style>
