<template>
  <div class="pa-4 text-center relative">
    <!-- Sincronizamos v-model con la propiedad isActive -->
    <v-dialog v-model="isActiveModal" max-width="500px"  height="auto">
      <div class="overlay rounded-lg d-flex align-center justify-center flex-column"  v-if="isSended">
        Publicando
        <v-progress-circular color="dark-blue" model-value="10" indeterminate v-if="isSended"></v-progress-circular>
        {{ circular }}
      </div>
      <v-card rounded="lg" id="dialog" class="px-4 py-4">
        <v-card-title class="d-flex justify-end align-center px-5 ">
          <div class="text-h5 text-medium-emphasis">
            <span class="mr-14 font-weight-bold">Crear publicacion</span>
          </div>
          <div class="close-icon ml-10">
            <v-btn icon="mdi-close" color="#5B626A" variant="text" @click="closeModal"></v-btn>
          </div>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <div class="text-medium-emphasis mb-4 d-flex">
          <v-avatar class="img-perfil">
            <v-img alt="John" :src="`http://localhost:3000${img}`" />
          </v-avatar>
          <p>{{ displayedEmojie }}</p>
          <p class="nombre font-weight-bold ml-3">{{ nombreUser }} {{ lastNameUser }}</p>
        </div>
        <form @submit.prevent="createPost(text)">
          <textarea class="create-title cursor-pointer" ref="editable" v-model="text" @focus="clearPlaceholder"
            @input="resizeTextArea" cols="55" rows="1" id="autoGrow">
          </textarea>
          <v-card width="100%" class="border my-4 py-2 px-2" v-show="preview" elevation="0">
            <v-img alt="John" :src="preview" />
          </v-card>
          <div class="containerEmojies" v-show="openListEmojis">
            <Emojis @emoji-selected="handleEmojiSelected" />
          </div>
          <div class="emojieButton d-flex justify-end">
            <i data-visualcompletion="css-img" class="x1b0d499 xl1xv1r" aria-label="Emoji" role="img" style="
              height: 24px;
              width: 24px;
              background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yI/r/qvuzeKVO6hg.png&quot;);
              background-position: 0px -58px;
              background-size: auto;
              background-repeat: no-repeat;
              display: inline-block;" v-on:click="openEmojis">
            </i>
          </div>
          <v-card class="border my-4  px-2 py-4 d-flex  items-center" elevation="0">
            <p class="font-weight-bold">
              Agregar publicacion
            </p>
            <v-img :src="image" @click.prevent="triggerFileInput" width="24px" height="24px" />
          </v-card>
          <div class="mt-2">
            <v-btn type="submit" block class="button ">Publicar</v-btn>
          </div>
          <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" style="display: none;" />
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import OpenImagesIcon from '../assets/images.png';
import Emojis from './Emojis.vue';

export default defineComponent({
  components: {
    Emojis
  },
  name: "ModalPost",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isActiveModal = ref(false)
    const nombreUser = localStorage.getItem("@NAMEUSER");
    const editable = ref(null); // Definir la referencia
    const text = ref(`¿Qué estás pensando, ${nombreUser}?`);
    const image = ref(OpenImagesIcon);
    const imgPerfil = localStorage.getItem("@IMAGEPERFIL");
    const lastNameUser = localStorage.getItem("@LASTNAMEUSER")
    const id = localStorage.getItem("@ID");
    const img = ref(imgPerfil);
    const imgPost = ref({})
    const preview = ref(null)
    const openListEmojis = ref(false)
    const selectedEmoji = ref(null);
    const displayedEmojie = ref('')
    const circular = ref('')
    const isSended = ref(false)


    watch(selectedEmoji, (newValue) => {
      console.log(newValue, "nuevo valor");

      // Verificar que no sea null ni vacío antes de agregar el emoji
      if (newValue) {
        text.value += newValue;  // Agregar el emoji al texto

        // Resetear selectedEmoji después de agregar el emoji

        selectedEmoji.value = null;  // Asegúrate de que solo se resetee después de agregar el emoji
      }

      // Si el texto es igual al placeholder, limpiarlo
      if (text.value === `¿Qué estás pensando, Julian?${newValue}`) {
        console.log(text.value);  // Borra el texto placeholder cuando se hace focus
        text.value = '';  // Limpiar el texto si es el placeholder
        text.value += newValue;
      }
    });


    watch(
      () => props.isActive,
      (newValue) => {
        isActiveModal.value = newValue; // Mantener sincronizados los valores
      }
    );


    const handleEmojiSelected = (emoji) => {
      selectedEmoji.value = emoji;  // Asignar el emoji seleccionado
    };



    const clearPlaceholder = () => {
      if (text.value === "¿Qué estás pensando, Julian?") {
        text.value = ''; // Borra el texto placeholder cuando se hace focus
        console.log("limpiando pantalla")
      }
    };


    const updateText = (event) => {
      console.log(text.value, "text valueupdate content")
      text.value = event.target.textContent; // Actualiza el modelo reactivo

    };

    const createPost = async () => {
      isSended.value = true
      const formData = new FormData();
      formData.append('file', imgPost.value); // Archivo seleccionado
      formData.append('txt', text.value); // Texto del post
      formData.append('id', id); // ID del usuario
      formData.append('nombreUser', nombreUser); // Nombre del autor

      try {
        const response = await fetch('http://localhost:3000/insertarPost', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json(); // Asegúrate de intentar obtener un JSON
        
        if (response.ok) {
          console.log('Post creado:', data);
          setTimeout(()=> {
            isSended.value = false
            closeModal()
            text.value = ""
          },2000)
        } else {
          console.error('Error al crear el post:', data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    const resizeTextArea = () => {
      const textarea = document.getElementById('autoGrow');
      textarea.style.height = `${textarea.scrollHeight}px`;  // Ajusta la altura según 
    };

    const triggerFileInput = () => {
      const fileInput = document.querySelector('input[type="file"]'); // Accedemos al input oculto
      fileInput.click(); // Disparamos el clic en el input de tipo archivo
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const img = new Image();
        preview.value = URL.createObjectURL(file);
        // Cargar la imagen seleccionada
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        img.onload = function () {
          // Detectar orientación
          if (img.width > img.height) {
            console.log('La imagen es horizontal');
            // Puedes hacer algo específico para las imágenes horizontales, como redimensionarlas o ajustarlas.
          } else if (img.width < img.height) {
            console.log('La imagen es vertical');
            // Aquí puedes hacer lo mismo para las imágenes verticales.
          } else {
            console.log('La imagen es cuadrada');
          }

          // Asignar la imagen seleccionada al estado o propiedad correspondiente
          imgPost.value = file;
        };
      }
    };


    const closeModal = () => {
      isActiveModal.value = false;
      emit('update:isActive', false);
    };

    const openEmojis = () => {
      openListEmojis.value = !openListEmojis.value;
    }

    return {
      isActiveModal,
      closeModal,
      img,
      editable,
      text,
      updateText,
      createPost,
      clearPlaceholder,
      resizeTextArea,
      triggerFileInput,
      handleFileChange,
      preview,
      image,
      openEmojis,
      openListEmojis,
      handleEmojiSelected,
      displayedEmojie,
      lastNameUser,
      nombreUser,
      circular,
      isSended
    };
  },
});
</script>

<style scoped>
.create-title {
  color: #ACAEB0;
  max-height: 500px !important;
  max-width: 500px;
  resize: none;
  font-size: 23px;

}

.v-img__img {
  width: 0px !important;
}

.create-title:focus {
  outline: none;
  /* Elimina el contorno de enfoque */
  border: none;
  /* Elimina cualquier borde si es que existe */
}

.close-icon {
  background-color: #D6D9DD;
  border-radius: 100%;
}

.button {
  width: 100%;
  max-height: 500px;
  background-color: #0866FF;
  color: white;
}

.overlay {
  width: 100%;
  height: 38vh;
  background-color: #F0F2F590;
  position: absolute;
  z-index: 1;
  overflow: hidden;

}
</style>