<template>
  <section>
    <div class="create-post  rounded-lg" :style="avatar">
      <div class="avatarPicture d-flex ga-4">
        <v-avatar class="">
          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>

        <div class="create-post-input " :style="createPostinputPerfil">
          <p class="color-text">¿Qué estás pensando?</p>
        </div>

      </div>
      <v-divider></v-divider>
      <v-img alt="imagen" v-bind:src="OpenImagesIcon" width="25px" height="25px" class="open-image"></v-img>
    </div>

  </section>
</template>
<script>
 import { defineComponent, ref} from 'vue';
 import  OpenImagesIcon from '../assets/images.png' 
 
export default defineComponent({
  props: {
    createPostinputPerfil: {
      type: String,
      default: '', // Puedes agregar un valor por defecto
    },

    avatarPicture : {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const stylePost = ref(props.customClassPost);
    const avatar = ref(props.avatarPicture)
    return { 
      OpenImagesIcon, 
      stylePost,
      avatar,
       // Devuelves props completo para usar `props.customStyle`
    };
  }
});

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
  width: 675px;
  margin: auto;
}

.create-post-input {
  background-color: #f0f2f5;
  height: 40px;
  border-radius: 30px;
  padding: 9px;
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

.create-post > .d-flex { 
  width: 100%;
}
.open-image {
  align-self: flex-start;
}

.color-text {
  color: #65686c;
}
</style>