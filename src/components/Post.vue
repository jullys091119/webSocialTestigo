<template>
  <div class="containerPost">
    <v-card :class="['w-100', 'my-3', 'py-5', 'px-4','card-posts']" v-for="post in posts"
      v-bind:key="post.id" :style="styleWidthCurrentPost">
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
        <v-card-text>
          {{ post.contenido.length > 1200 ? post.contenido.slice(0, 1200) + '... Ver mas' : post.contenido }}
        </v-card-text>
      </div>
      <div class="mb-4" v-if="post.imagen_url != null" >
        <v-img   :style="imgWidthFullPost" class="img-post" :src="`http://localhost:3000${post.imagen_url}`" cover></v-img>
      </div>
       
      <v-divider class="mx-9"></v-divider>
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
      <v-divider class="mx-9"></v-divider>
      <div class="comment my-2 px-3 ">
        <div class="inputComment d-flex flex-row align-center ga-3">
          <v-avatar class="miniPictureComment">
            <v-img alt="John" :src="'http://localhost:3000' + imagePerfil"></v-img>
          </v-avatar>
          <input type="text" class=" d-flex border input">
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import dayjs from "dayjs"; 
import "dayjs/locale/es";
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
    const imagePerfil = ref(localStorage.getItem('@IMAGEPERFIL'))
    const posts = ref([])
    let  formattedDate = ref('')
    const refStyleWidthCurrentPost = ref(props.customWidthCurrentPost)
    const styleWidthCurrentPost = refStyleWidthCurrentPost.value

    const refClassforCurrentPost = ref(props.customClass)
    const classforCurrentPost = refClassforCurrentPost.value

    const refImgWidthFull = ref(props.imgWidthFull)
    const imgWidthFullPost = refImgWidthFull.value


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
          formattedDate.value = dayjs(data.fecha_publicacion).locale("es").format("D MMMM,  YYYY")
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    onMounted(() => {
      getPost()
    })
    return { 
      imagePerfil,
      getPost,
      posts,
      styleWidthCurrentPost,
      classforCurrentPost,
      imgWidthFullPost,
      formattedDate,
    }
  }
})
</script>

<style scoped>
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

.img-post  {
  width: 740px !important;
  height: 382px !important;
  object-fit: contain !important;
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