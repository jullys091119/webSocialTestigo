<template>
  <div class="containerPost">
    <v-card :class="['w-100', 'my-3', 'py-5', 'px-4', 'card-posts']" v-for="post in posts" v-bind:key="post.id"
      :style="styleWidthCurrentPost">
      <div class="header d-flex flex-column border py-2 px-3">
        <div class="headerPicture d-flex items-center pl-4 ga-4">
          <v-avatar class="my-4" size="40px">
            <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
          </v-avatar>
          <v-card-title class="pl-0">
            {{ post.nombre }}
            <v-card-subtitle class="pl-0 bolder-1">
              {{ formattedDate }}
            </v-card-subtitle>
          </v-card-title>
        </div>
        <v-card-text class="contentPost">
          {{ post.contenido.length > 1200 ? post.contenido.slice(0, 1200) + '... Ver mas' : post.contenido }}
        </v-card-text>
      </div>
      <div v-if="post.imagen_url != null">
        <v-img :style="imgWidthFullPost" class="img-post" :src="`http://localhost:3000${post.imagen_url}`"
          cover></v-img>
      </div>
      <div class="likesCount px-7 py-3 d-flex">
        <v-icon :style="{ color: 'white' }" size="12px" class="icon-mini-like mx-3">
              mdi-thumb-up
        </v-icon>
        <!-- Si el usuario dio like, mostrar el mensaje personalizado, si no solo el contador -->
        <span v-if="isLiked[post.id]">{{ `A ti y ${post.likesCount - 1} personas les gusta esto` }}</span>
        <p v-else>{{ post.likesCount }} Likes</p>
      </div>

      <v-divider class="mx-9"></v-divider>
      <div class="containerReactions d-flex justify-center ga-10 py-2">
        <div class="likes">
          <v-btn class="d-flex justify-center reaction-btn" variant="plain" @click="toggleLike(post)">
            <v-icon :style="{ color: isLiked[post.id] ? 'rgb(8, 102, 255)' : 'initial' }" size="20px">
              mdi-thumb-up
            </v-icon>
            <v-card-text :style="{ color: isLiked[post.id] ? 'rgb(8, 102, 255)' : 'initial' }">
              Me gusta
            </v-card-text>
          </v-btn>
        </div>
        <div class="icon-comment">
          <v-btn class="d-flex justify-center" variant="plain" id="comment">
            <v-icon>mdi-comment-outline</v-icon>
            <v-card-text>Comentar</v-card-text>
          </v-btn>
        </div>
      </div>
      <v-divider class="mx-9"></v-divider>
      <div class="comment my-2 px-3 ">
        <div class="inputComment d-flex flex-row align-center ga-3">
          <v-avatar class="miniPictureComment">
            <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
          </v-avatar>
          <input type="text" class="d-flex border input">
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: "CurrentPost",
  props: {
    customWidthCurrentPost: {
      type: String,
      default: ""
    },
    customClass: {
      type: String,
      default: ''
    },
    imgWidthFull: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const imagePerfil = ref(localStorage.getItem('@IMAGEPERFIL'));
    const id = ref(localStorage.getItem('@ID'));
    const posts = ref([]);
    const formattedDate = ref('');
    const styleWidthCurrentPost = ref(props.customWidthCurrentPost);
    const isLiked = ref({}); // Estado de like por post

    const getPost = () => {
      fetch('http://localhost:3000/optenerPost', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          posts.value = data; // Asignamos los posts recibidos
          posts.value.forEach(post => {
            post.likesCount = post.likes_count || 0; // Asignamos el contador de likes a cada post individualmente
            isLiked.value[post.id] = localStorage.getItem(`liked_${post.id}_${id.value}`) === 'true';
          });
        })
        .catch(error => console.error("Error al obtener los posts:", error));
    };

    const toggleLike = (post) => {
      const hasLiked = isLiked.value[post.id]; // Verificamos si el usuario ya ha dado like al post
      if (!hasLiked) {
        // Si no ha dado like, lo agregamos
        fetch('http://localhost:3000/likes', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id.value, idPost: post.id, counter: post.likesCount })
        })
          .then(() => {
            post.likesCount++; // Incrementamos el contador de likes en la UI
            isLiked.value[post.id] = true; // Marcamos el like en la UI

            // Guardamos el estado del like en localStorage
            localStorage.setItem(`liked_${post.id}_${id.value}`, 'true');
          })
          .catch(error => console.error("Error al agregar like:", error));
      } else {
        // Si ya dio like, lo eliminamos
        fetch('http://localhost:3000/eliminaLike', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id.value, idPost: post.id })
        })
          .then(() => {
            post.likesCount--; // Decrementamos el contador de likes en la UI
            isLiked.value[post.id] = false; // Desmarcamos el like en la UI

            // Eliminamos el like del localStorage
            localStorage.removeItem(`liked_${post.id}_${id.value}`);
          })
          .catch(error => console.error("Error al eliminar like:", error));
      }
    };

    onMounted(() => {
      getPost(); // Esperamos a que getPost termine de cargar los datos
    });

    return {
      imagePerfil,
      posts,
      styleWidthCurrentPost,
      formattedDate,
      toggleLike,
      isLiked,
      id
    };
  }
});
</script>



<style scoped>
@font-face {
  font-family: 'segoe';
  src: url('@/assets/fonts/Segoe UI Historic.TTF') format('truetype');
  /* Cambia el nombre y el formato según corresponda */
  font-weight: normal;
  /* Opcional */
  font-style: normal;
  /* Opcional */
}

.post {
  background-color: rgb(19, 19, 19);
  max-width: 100%;
}

.card-posts {
  border-radius: 12px;
  max-width: 100%;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
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

.img-post {
  width: 740px !important;
  height: 382px !important;
  object-fit: contain !important;
}

.reaction-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reaction-btn .v-card-text {
  font-size: 15px;
  padding-left: 5px;
  font-family: 'segoe';
  font-weight: 600;
}

.contentPost {
  font-family: 'segoe';
  font-size: 19px;
  font-weight: 400;
}

.icon-mini-like {
  background-color: #197EFF;
  border-radius: 100%;
  width: 23px !important;
  height: 23px !important;
  padding: 10px !important
}

@media screen and (max-width: 992px) {
  .containerPost {
    max-width: 870px !important;
  }

  .sidePost {
    display: none;
  }
}
</style>