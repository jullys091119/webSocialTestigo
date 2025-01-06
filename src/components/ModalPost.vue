<template>
  <div class="text-center relative">
    <!-- Sincronizamos v-model con la propiedad isActive -->
    <v-dialog v-model="isActiveModal" max-width="500px" max-height="800px" ref="containerSticky">
      <div class="overlay rounded-lg d-flex align-center justify-center border flex-column"  v-if="isSended" >
        Publicando
        <v-progress-circular color="dark-blue" model-value="10" indeterminate v-if="isSended"></v-progress-circular>
        {{ circular }}
      </div>
      <v-card rounded="lg" id="dialog" class="px-4 py-4 ">
        <v-card-title class="d-flex justify-end align-center px-5">
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
          <p class="nombre font-weight-bold ml-3">{{ nombreUser }} {{ lastNameUser }}</p>
        </div>
        <form @submit.prevent="createPost">
          <textarea class="create-title cursor-pointer" ref="editable" v-model="text" @focus="clearPlaceholder"
            @input="resizeTextArea" cols="55" rows="1" id="autoGrow"
            :style="{ fontSize: text.length >= 200 ? '16px' : '23px' }">
          </textarea>
          <v-card width="100%" maxHeight="370px" class=" my-2 py-4 px-4  d-flex justify-center rounded border"
            v-show="preview" elevation="0" v-if="preview">
            <v-img alt="John" maxWidth="481px" maxHeight="252px" width="200px !important" class="rounded" :src="preview"
              cover />
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
              display: inline-block;" @click="openEmojis">
            </i>
          </div>
          <input id="fileInput" type="file" @change="handleFileChange" accept="image/*" style="display: none;" />
          <div class="containerFixed">
            <v-card class="border my-4 px-2 py-4 d-flex items-center" elevation="0">
              <p class="font-weight-bold">Agregar publicacion</p>
              <v-img :src="image" @click.prevent="triggerFileInput" width="24px" height="24px" />
            </v-card>
            <div class="">
              <v-btn type="submit" block class="button">Publicar</v-btn>
            </div>
          </div>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';
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
  setup(props, { emit, }) {
    const isActiveModal = ref(false);
    const nombreUser = localStorage.getItem("@NAMEUSER");
    const editable = ref(null);
    const text = ref(`¿Qué estás pensando, ${nombreUser}?`);
    const image = ref(OpenImagesIcon);
    const imgPerfil = localStorage.getItem("@IMAGEPERFIL");
    const lastNameUser = localStorage.getItem("@LASTNAMEUSER");
    const id = localStorage.getItem("@ID");
    const img = ref(imgPerfil);
    const imgPost = ref(null);
    const preview = ref(null);
    const openListEmojis = ref(false);
    // const selectedEmoji = ref(null);
    const displayedEmojie = ref('');
    const circular = ref('');
    const isSended = ref(false);
    const containerSticky = ref(null);
    const height = ref(0);

    onMounted(async () => {
      await nextTick(); // Asegura que Vue haya actualizado el DOM
      console.dir(containerSticky.value.height, "Container sticky")
      height.value = containerSticky.value.height;

    });

    watch(
      () => props.isActive,
      (newValue) => {
        isActiveModal.value = newValue;
      }
    );

    const handleEmojiSelected = (emoji) => {
      const textarea = editable.value;  // Accedemos al textarea directamente

      // Obtenemos la posición actual del cursor
      const cursorPos = textarea.selectionStart;
      const textBefore = text.value.slice(0, cursorPos);  // El texto antes del cursor
      const textAfter = text.value.slice(cursorPos);  // El texto después del cursor

      // Insertamos el emoji en la posición del cursor
      text.value = textBefore + emoji + textAfter;

      // Movemos el cursor a la nueva posición después del emoji insertado
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos + emoji.length;
        textarea.focus();  // Aseguramos que el textarea siga enfocado
      });
    };


    const clearPlaceholder = () => {
      if (text.value === `¿Qué estás pensando, ${nombreUser}?`) {
        text.value = '';
        console.log("limpiando pantalla");
      }
    };

    const updateText = (event) => {
      console.log(event.target.textContent);
      text.value = event.target.textContent;
    };

    const createPost = async () => {
      isSended.value = true;
      const formData = new FormData();
      formData.append('file', imgPost.value);
      formData.append('txt', text.value);
      formData.append('id', id);
      formData.append('nombreUser', nombreUser);
      console.log(imgPost.value, "imagen value");
      try {
        const response = await fetch('http://localhost:3000/insertarPost', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Post creado:', data);
          setTimeout(() => {
            isSended.value = false;
            closeModal();
            text.value = "";
            imgPost.value = null;
            preview.value = null;
          }, 2000);
        } else {
          console.error('Error al crear el post:', data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    const resizeTextArea = () => {
      const textarea = document.getElementById('autoGrow');
      textarea.style.height = `${textarea.scrollHeight}px`;
    };


    // Función para abrir el selector de archivos utilizando querySelector
    const triggerFileInput = () => {
      // Usamos el selector para acceder al input por su id
      const fileInput = document.querySelector('#fileInput');

      if (fileInput) {
        // console.log("Referencia al input de archivo encontrada:", fileInput);
        fileInput.click();  // Dispara el clic para abrir el selector de archivos
      } else {
        console.error("No se pudo acceder al input de archivo.");
      }
    };

    const handleFileChange = (event) => {
      console.log(event);
      const file = event.target.files[0];
      if (file) {
        const img = new Image();
        preview.value = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        img.onload = function () {
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
    };

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
      isSended,
      containerSticky,
      height,
    };
  },
});
</script>

<style scoped>
.create-title {
  color: #ACAEB0;
  max-height: auto !important;
  max-width: 467px;
  resize: none;
  font-size: 23px;
}

.v-img__img {
  width: 0px !important;
}

.create-title:focus {
  outline: none;
  border: none;
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
  height: 100%;
  background-color: #F0F2F590;
  position: absolute;
  z-index: 1;
  overflow: hidden;
}

.containerFixed {
  position: sticky;
  bottom: -24px;
  width: 100%;
  background-color: white;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>