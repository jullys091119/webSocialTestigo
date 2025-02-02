<template>

  <div class="containerPost">
    <v-card :class="['w-100', 'my-3', 'py-5', 'px-4', 'card-posts']" v-for="post in posts" v-bind:key="post.id"
      :style="styleWidthCurrentPost">
      <div class="header d-flex flex-column border py-2 px-3">
        <!-- Información del post (Avatar, nombre, fecha) -->
        <div class="headerPicture d-flex items-center pl-4 ga-4">
          {{ post.id }}
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
        <!-- Contenido del post -->
        <v-card-text class="contentPost">
          {{ post.contenido.length > 1200 ? post.contenido.slice(0, 1200) + '... Ver mas' : post.contenido }}
        </v-card-text>
      </div>

      <!-- Imagen del post -->
      <div v-if="post.imagen_url != null">
        <v-img class="img-post" :src="`http://localhost:3000${post.imagen_url}`" cover></v-img>
      </div>
      <!-- :style="imgWidthFullPost" -->
      <!-- Likes y comentarios -->
      <div class="likesCount px-7 py-3 d-flex">
        <v-icon :style="{ color: 'white' }" size="12px" class="icon-mini-like mx-3">
          mdi-thumb-up
        </v-icon>
        <span v-if="isLiked[post.id]">{{ `A ti y ${post.likesCount - 1} personas les gusta esto` }}</span>
        <p v-else>{{ post.likesCount }} Likes</p>
      </div>

      <v-divider class="mx-9"></v-divider>

      <!-- Botones de reacción -->
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
          <!-- @click="toggleComment(post.id)" -->
          <v-btn class="d-flex justify-center" variant="plain" @click="openDialogComments(post.id)">
            <v-icon>mdi-comment-outline</v-icon>
            <v-card-text>Comentar</v-card-text>
          </v-btn>
        </div>
      </div>

      <v-divider class="mx-9"></v-divider>

      <!-- Comentarios: solo se abre el input si el comentario para este post está abierto -->
      <!-- <div class="comment my-2 px-3" v-if="isOpenComments(post.id)">
        <form @submit.prevent="sendComment(post.id)">
          <div class="inputComment d-flex flex-row align-center ga-3">
            <v-avatar class="miniPictureComment">
              <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
            </v-avatar>
            <input v-model="textComment[post.id]" type="text" class="d-flex border input"
              placeholder="Escribe un comentario...">
          </div>
        </form>
      </div> -->

    </v-card>
    <div class="overLay" v-show="isOpenDialogComments">
      <div class="modal">
        <div class="modalHeader bg-white d-flex justify-center py-4 px-10 position-relative">
          <div > <p class="publicationAutor"> Publicación de {{ selectedPost?.nombre }}</p> </div>
          <div class="closeModal  position-absolute right-0 mx-3">
            <v-icon class="icon-chevron p-1" @click="isOpenDialogComments = false">mdi-close</v-icon>
          </div>
        </div>
        <div class="modalBody">
          <!-- Mostrar detalles del post -->
          <div v-if="selectedPost">
            <p><strong>ID:</strong> {{ selectedPost.id }}</p>
            <p><strong>Nombre:</strong> {{ selectedPost.nombre }}</p>
            <p><strong>Contenido:</strong> {{ selectedPost.contenido }}</p>
            <v-img v-if="selectedPost.imagen_url" :src="'http://localhost:3000' + selectedPost.imagen_url"
              cover></v-img>

            <!-- Mostrar los comentarios relacionados con el post -->
            <div class="comments-container">
              <div v-for="comment in comments[selectedPost.id]" :key="comment.id" class="comment">
                <p>{{ comment.comentario }}</p>
              </div>
            </div>

            <!-- Formulario para agregar un nuevo comentario -->
            <!-- v-if="isOpenComments(selectedPost.id)" -->
            <div class="comment my-2 px-3" >
              <form @submit.prevent="sendComment(selectedPost.id)">
                <div class="inputComment d-flex flex-row align-center ga-3">
                  <v-avatar class="miniPictureComment">
                    <v-img alt="Perfil" :src="'http://localhost:3000' + imagePerfil"></v-img>
                  </v-avatar>
                  <input v-model="textComment[selectedPost.id]" type="text" class="d-flex border input"
                    placeholder="Escribe un comentario...">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';



export default defineComponent({
  name: "CurrentPost",
  components: {

  },
  setup() {
    const imagePerfil = ref(localStorage.getItem('@IMAGEPERFIL'));
    const id = ref(localStorage.getItem('@ID'));
    const posts = ref([]);
    const formattedDate = ref('');
    const styleWidthCurrentPost = ref('');
    const isLiked = ref({});
    const commentOpen = ref({});  // Para controlar qué post tiene los comentarios abiertos
    const textComment = ref({})
    const comments = ref({})
    const isOpenDialogComments = ref({})
    const selectedPost = ref(null);

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
            commentOpen.value[post.id] = false; // Inicialmente los comentarios están cerrados para todos los posts
            getComments(post.id);
          });
        })
        .catch(error => console.error("Error al obtener los posts:", error));
    };

    const getComments = async (postId) => {
      console.log("Post ID:", postId); // Verificar que postId tenga un valor
      if (!postId) {
        console.error("El postId es undefined o null");
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/optenerComentarios?id=' + postId, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Comentarios recibidos:", data);  // Inspeccionar los datos en la consola

          if (data.length > 0 && data != undefined) {
            comments.value[postId] = data;  // Asegúrate de almacenar los comentarios para el post correspondiente
          }
        } else {
          console.log("Error al obtener los comentarios");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };



    const toggleLike = (post) => {
      const hasLiked = isLiked.value[post.id]; // Verificamos si el usuario ya ha dado like al post
      if (!hasLiked) {
        fetch('http://localhost:3000/likes', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id.value, idPost: post.id, counter: post.likesCount })
        })
          .then(() => {
            post.likesCount++;
            isLiked.value[post.id] = true;
            localStorage.setItem(`liked_${post.id}_${id.value}`, 'true');
          })
          .catch(error => console.error("Error al agregar like:", error));
      } else {
        fetch('http://localhost:3000/eliminaLike', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id.value, idPost: post.id })
        })
          .then(() => {
            post.likesCount--;
            isLiked.value[post.id] = false;
            localStorage.removeItem(`liked_${post.id}_${id.value}`);
          })
          .catch(error => console.error("Error al eliminar like:", error));
      }
    };


    const openDialogComments = (postId) => {
      selectedPost.value = posts.value.find(post => post.id === postId);
      // isOpenDialogComments.value = !isOpenDialogComments.value
      isOpenDialogComments.value = true;
    }


    const isOpenComments = (postId) => {
      return commentOpen.value[postId];  // Devuelve true si los comentarios están abiertos para este post
    };

    const toggleComment = (postId) => {
      commentOpen.value[postId] = !commentOpen.value[postId]; // Alterna el estado de los comentarios
    };

    const setComment = (postId) => {
      textComment.value[postId] || {}
    }

    const sendComment = (postId) => {

      fetch('http://localhost:3000/comentarios', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id.value, idPost: postId, text: textComment.value[postId] })
      }).then((data) => {
        if (data.ok) {
          comments.value[postId] = data
          textComment.value = {}
        }

      }).catch(error => { console.error('Error al agregar comentario', error) })
    }

    onMounted(() => {
      getPost(); // Cargar los posts al montar el componente,
    });

    return {
      imagePerfil,
      posts,
      styleWidthCurrentPost,
      formattedDate,
      toggleLike,
      isLiked,
      commentOpen,
      isOpenComments,
      toggleComment,
      sendComment,
      setComment,
      openDialogComments,
      textComment,
      comments,
      isOpenDialogComments,
      selectedPost

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

.modal {
  max-width: 800px;
  width: 700px;
  max-height: 800px;
  height: 800px;
  background-color: #FFFFFF;
  overflow-y: scroll;
}

.overLay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-height: 100vh;
  display: flex;
  /* Usar flexbox puede ayudarte a centrar contenido si lo necesitas */
  align-items: center;
  /* Opcional: centrar el contenido verticalmente */
  justify-content: center;
}

.closeModal {
  background-color: #E2E5E9;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 8px;
}

.publicationAutor {
  font-family: 'segoe';
  font-size: 20px;
  color: #080809
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