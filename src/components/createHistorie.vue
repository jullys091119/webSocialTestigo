<style scoped>
.container {
  display: flex;
}

.container-card {
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #f2f4f7;
}

.card-file {
  width: 200px !important;
  flex-direction: column;
  gap: 10px;
  color: white;
}

.rotate {
  background-position: bottom;
  background-repeat: no-repeat;
}

.bg-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
}

.weigth-text {
  font-weight: 600;
  max-width: 200px;
  font-size: 13px;
}

.sidebar-right {
  flex: 1;
  padding: 10px;
}

.btn-histories {
  transform: rotate(45deg);
}

.icon-close {
  background-color: #BCC0C4;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>


<template>
  <div class="container">
    <div class="sidebar-right">
      <header class="header border-bottom py-2 px-2">
        <div class="icon-close" v-on:click="returnHome">
          <v-icon class="btn-histories">mdi-plus</v-icon>
        </div>
      </header>
    </div>
    <div class="container-card">
      <v-card :disabled="loading" :loading="loading"
        class=" my-12 d-flex align-center justify-center card-file rounded-lg" max-width="220" height="330"
        :style="{ backgroundImage: 'url(' + backgroundCard + ')' }" @click="triggerFileInput">
        <div class="border bg-img">
          <v-img height="40px" width="40px" :src="listIcon" class="rounded" style="border-radius: 50%;" />
        </div>
        <v-text class="weigth-text">Crear una historia con foto</v-text>
        <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" style="display: none;" />
      </v-card>
      <v-card :disabled="loading" :loading="loading"
        class="my-12 d-flex align-center justify-center card-file rotate  rounded-lg" max-width="220" height="330"
        :style="{ backgroundImage: 'url(' + backgroundCard + ')' }">
        <div class="border bg-img">
          <v-img height="44px" width="44px" :src="fontsize" class="rounded" style="border-radius: 50%;" />
        </div>
        <v-text class="weigth-text">Crear una historia con texto</v-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import listIcon from '../assets/imgUpload.png'
import fontsize from '../assets/font-size.png'
import backgroundCard from '../assets/backgroundCard.png'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const loading = ref(false);
    const router = useRouter();

    const getIdUser = async () => {
      try {
        const idUser = await localStorage.getItem("@ID")
        return idUser
      } catch (error) {
        console.log(error, "No se pudo optener el id del usuario")
      }

    }

    const uploadImage = async (img) => {
      const responseId = await getIdUser(); // Obtener el ID del usuario
      console.log('ID del usuario:', responseId); // Asegúrate de que responseId no sea null ni undefined

      if (!responseId) {
        console.error("No se obtuvo un id de usuario válido");
        return;
      }

      const formData = new FormData();
      formData.append('file', img); // Se añade la imagen al FormData
      formData.append('idUser', responseId); // Se añade el idUser al FormData

      try {
        loading.value = true; // Mostrar loading
        const response = await fetch('http://localhost:3000/crearHistoria', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error en la solicitud: ${response.statusText}`);
        }

        console.log('Respuesta del servidor:', data);

        return { foto_perfil: data.data.foto_perfil, idUser: responseId };
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        loading.value = false; // Ocultar loading
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


    return { listIcon, backgroundCard, fontsize, returnHome, triggerFileInput, handleFileChange, loading }
  }
})
</script>
