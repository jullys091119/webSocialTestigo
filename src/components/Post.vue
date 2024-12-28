<template>
  <v-card class="w-100 my-3 py-5 px-4 card-posts" max-width="100%" v-for="post in posts" v-bind:key="post.id">
    <div class="header d-flex">
      <v-avatar class="" size="40px">
        <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
      </v-avatar>
      <v-card-title>
        {{ post.nombre }}
      </v-card-title>
    </div>
    <v-card-subtitle>
      {{ post.fecha_publicacion }}
    </v-card-subtitle>
    <v-card-text>
      {{ post.contenido }}
    </v-card-text>
    <v-card-item class="d-flex flex-column items-center justify-center post"  v-if="post.imagen_url != null">
      <v-img width="600px" height="888px"
        :src="`http://localhost:3000${post.imagen_url}`" cover></v-img>
    </v-card-item>
    <v-divider></v-divider>
    <div class="containerReactions d-flex justify-center ga-10 py-2">
      <div class="likes">
        <v-btn class="d-flex justify-center" variant="plain">
          <v-icon>mdi-thumb-up</v-icon>
          <v-card-text>Me gusta</v-card-text>
        </v-btn>
      </div>
      <div class="icon-comment">
        <v-btn class="d-flex justify-center" variant="plain">
          <v-icon>mdi-comment-outline</v-icon>
          <v-card-text>Comentar</v-card-text>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="comment my-2">
      <div class="inputComment d-flex flex-row align-center ga-3">
        <v-avatar class="miniPictureComment">
          <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
        </v-avatar>
        <input type="text" class=" d-flex border input">
      </div>
    </div>
  </v-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  name: "CurrentPost",
  setup() {
    const imagePerfil = ref(localStorage.getItem('@IMAGEPERFIL'))
    const posts = ref([])

    const getPost = () => {
      fetch('http://localhost:3000/optenerPost', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })     
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al leer los posts");
          }
          return response.json(); // Leer el cuerpo solo una vez
        })
        .then(data => {
          console.log(data); // Maneja los datos de la respuesta aquí
          posts.value = data
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    onMounted(() => {
      getPost()
    })
    return { imagePerfil, getPost, posts }
  }
})
</script>

<style scoped>
.post {
  background-color: rgb(19, 19, 19);
}
.card-posts {
  border-radius: 12px;
}
.miniPictureComment {
  width: 32px;
  height: 32px;
}
.input {
  width: 100% !important;
  background-color: #F0F2F5;
  border: none !important;
  height: 40px;
  border-radius: 100px;
  padding-left: 20px;
}

.input:focus {
  border: none !important;
  outline: none; 
}
/* .btn-comment {
  border: none !important;
  background: none;
} */
</style>