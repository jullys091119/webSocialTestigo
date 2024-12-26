<template>
  <div class="container">
    <div class="container-main">
      <div class="container-banner">
        <div class="containerChangePicture cursor-pointer">
          <v-col cols="auto">
            <div class="btn">
              <v-icon class="mdi-icon color-red" size="18px">mdi-camera</v-icon>
              <span class="title-changePicture">Editar foto de portada</span>
            </div>
          </v-col>
        </div>
      </div>
      <div class="container-data-user">
        <div class="container-img">
          <v-avatar class="img-perfil">
            <v-img alt="John" :src="`http://localhost:3000${img}`" />
          </v-avatar>
          <div class="background-icon camera-absolute">
            <v-icon @click="triggerFileInput">
              mdi-camera
            </v-icon>
          </div>
          <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" style="display: none;" />
          <div class="data-user-title my-2">
            <h1>Julian Ontiveros</h1>
            <div class="long-user-friends">
              <p class="color-longitud">31 amigos</p>
            </div>
            <div class="buble-friends cursor-pointer my-2">
              <v-avatar size="32px">
                <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
              </v-avatar>
            </div>
          </div>
        </div>
        <div class="btn-container d-flex ga-2 py-3 align-self-end  ga-2">
          <div class="btn btn-color-plus cursor-pointer">
            <v-icon class="mdi-icon" size="18px">mdi-plus</v-icon>
            <span class="title-changePicture">Agregar historia</span>
          </div>
          <div class="btn btn-color-edit cursor-pointer">
            <v-icon class="mdi-icon " size="18px">mdi-pencil</v-icon>
            <span class="title-changePicture">Editar perfil</span>
          </div>
        </div>
      </div>

      <section class="posts-details d-flex">
        <div class="side-datails d-flex my-10">
          <div class="details">
            <DetailsUser />
          </div>
        </div>
        <div class="side-post  my-10 ">
          <PostUser :createPostinputPerfil="{
            flexGrow: 1,
            width: '100%',
            minWidth: '0',
          }" :avatarPicture="{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            flex: 1,
            width: '100%',
            borderWidth: 10
          }" />
          <CurrentPost/>
        </div>

      </section>
    </div>

  </div>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import PostUser from './PostUser.vue';
import DetailsUser from './DetailsUser.vue';
import CurrentPost from './Post.vue';

export default defineComponent({
  name: 'PerfilUser',
  components: {
    PostUser,
    DetailsUser,
    CurrentPost,
  
  },
  setup() {
    const router = useRouter();
    const imgPerfil = localStorage.getItem("@IMAGEPERFIL")
    const img = ref(imgPerfil)

    const getIdUser = async () => {
      try {
        const idUser = await localStorage.getItem("@ID")
        return idUser
      } catch (error) {
        console.log(error, "No se pudo optener el id del usuario")
      }

    }

    const uploadImage = async (img) => {
      const nameUser = await localStorage.getItem("@NAMEUSER")
      const lastNameUser = await localStorage.getItem("@LASTNAMEUSER")
      const emailUser = await localStorage.getItem("@EMAILUSER")
      const password = await localStorage.getItem("@PASSWORD")
      const responseId = await getIdUser(); // Obtener el ID del usuario
      console.log('ID del usuario:', responseId); // Asegúrate de que responseId no sea null ni undefined

      if (!responseId) {
        console.error("No se obtuvo un id de usuario válido");
        return;
      }

      const formData = new FormData();
      formData.append('file', img); // Se añade la imagen al FormData
      formData.append('idUser', responseId); // Se añade el idUser al FormData
      formData.append('nameUser', nameUser)
      formData.append('lastNameUser', lastNameUser)
      formData.append('emailUser', emailUser)
      formData.append('password', password)
      formData.append('isProfileImage', true);

      try {
        // loading.value = true; // Mostrar loading
        const response = await fetch('http://localhost:3000/subirImagen', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log(data, "data");

        if (!response.ok) {
          throw new Error(data.message || `Error en la solicitud: ${response.statusText}`);
        }

        console.log('Respuesta del servidor:', data);

        return {
          foto_perfil: data.data.foto_perfil,
          idUser: responseId,
          isProfileImage: true,
          nameUser: nameUser,
          lastNameUser: lastNameUser,
          emailUser: emailUser,
          password: password
        };
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        // loading.value = false; // Ocultar loading
        console.log("finalmente")
      }
    };


    const returnHome = () => {
      router.push('./homeScreen')
    }

    const triggerFileInput = () => {
      const fileInput = document.querySelector('input[type="file"]'); // Accedemos al input oculto
      fileInput.click(); // Disparamos el clic en el input de tipo archivo
    };


    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadImage(file)
      }
    };

    return {
      returnHome, triggerFileInput, handleFileChange, img
    }
  }
})
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


.container {
  max-width: 100%;
}

.container-main {
  background-color: #f2f4f7;
  max-width: 1290px;
  margin: auto;
}

.container-banner {
  background-color: black;
  max-width: 1250px;
  height: 462.94px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.containerChangePicture {
  height: 50px;
  width: 600px;
  position: absolute;
  right: 7px;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.title-changePicture {
  max-width: 200px;
}

.background-icon {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.container-img {
  width: 700px;
  display: flex;
  position: relative;
  gap: 50px;
}

.container-data-user {
  display: flex;
  justify-content: space-between;
  max-height: 134px;
}

.btn {
  background-color: #FFFFFF;
  height: 40px;
  width: 207.42px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 5px;
}

.button-changePicture {
  width: 240.42px;
  height: 36px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
}

.btn-container {
  margin-right: 38px;
}

.btn-color-plus {
  background-color: #0866FF;
  color: white;
  max-width: 167px;
}

.btn-color-edit {
  background-color: #E2E5E9;
  max-width: 125px;
}

.color-longitud {
  color: #65686C;
  font-size: 15px;
}

.camera-absolute {
  position: absolute;
  bottom: 15px;
  left: 160px;
  background-color: #D6D9DD;
  color: #000;
  width: 35px;
  height: 35px;
  padding: 6px;
}

.data-user-title {
  width: 300px;
}

.img-perfil {
  width: 168px !important;
  height: 168px !important;
  overflow: hidden;
  border: 6px solid white;
  top: -40px;
  left: 40px;
}

.details {
  max-width: 490px;
  height: 228px;
  max-height: 228px;
  border-radius: 12px;
  padding: 10px;
  background-color: white;
}

.side-datails {
  flex: 1;
}

.side-post {
  flex: 2;
}

.posts-details {
  gap: 12px;
  padding: 0 40px;
}

@media (max-width: 1200px) {
  .details {
    max-width: 400px !important;
  }
}
</style>