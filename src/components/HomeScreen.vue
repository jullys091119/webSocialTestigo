<template>
  <HeaderComponent />
  <div class="container">
    <main class="containerMain">
      <HistoriesPost :onButtonClick="openCreateHistories" />
      <section class="posts">
        <div class="currentPost">
          <PostUser :customWidthPosts = "{maxWidth: '100% !important'}" />
          <Post :imgWidthFull="{width:'100% !important'}"/>
        </div>
      </section>
    </main>
  </div>
  <CreateHistorie v-if="isOpen" />
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import PostUser from './PostUser.vue';
import HistoriesPost from './HistoriesPost.vue';
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import Post from './Post.vue';


export default defineComponent({
  name: "HomeScreen",
  components: {
    HeaderComponent,
    PostUser,
    HistoriesPost,
    Post
  },

  setup() {
    let isOpen = ref('false')

    const router = useRouter();

    const openCreateHistories = () => {
      isOpen.value = true
      router.push('/createHistorie')
    }

    const getDataUser = async () => {
      const id = localStorage.getItem("@ID");  // No necesitas await aquí

      if (!id) {
        console.error("ID no encontrado en localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
          headers: {
            'Content-type': 'application/json',
          },
        });

        const data = await response.json();  // Usamos await para esperar la respuesta
        if (data && data.length > 0) {
          const user = data[0];  // Accedemos al primer objeto en el array
          // Guardamos los datos en localStorage
          localStorage.setItem("@NAMEUSER", user.nombre);
          localStorage.setItem("@LASTNAMEUSER", user.apellido);
          localStorage.setItem("@EMAILUSER", user.correo);
          localStorage.setItem("@PASSWORD", user.clave);
          localStorage.setItem("@IMAGEPERFIL", user.foto_perfil);

          console.log(data, "data sacando datos del usuario");

          return id;  // Devuelve el id
        } else {
          console.error("No se encontraron datos para este usuario");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };


    onMounted(() => {
      getDataUser()
    })

    return {
      isOpen,
      openCreateHistories,
    }
  }

})

</script>

<style scoped>
.container {
  background-color: #f2f4f7;
  min-height: 100vh
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid  #ccc;
  max-height: 60px;
}

.search-bar {
  width: 300px;
  padding: 5px;
}

.nav-icons button {
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
}

/* Feed de Publicaciones */
main {
  padding: 20px;
}

.create-post {
  display: flex;
  margin-bottom: 20px;
}


.posts {
  display: flex;
  flex-direction: column;
  /* margin-top: 240px; */
}

.post-card {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
}

.post-header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.post-content {
  margin-top: 10px;
}

.post-actions button {
  background: #008CFF;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}

.post-actions button:hover {
  background: #005F99;
}

@media (min-width: 848px) {
  .currentPost {
    max-width: 840px !important;
    width: 840px;
    margin: 0 auto !important;
  }
}

</style>