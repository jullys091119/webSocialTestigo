<template>
  <section class="section-histories my-10">
    <v-sheet class="d-flex justify-start container-histories">
      <v-card class="histories rounded-lg position-relative card elevation-3" max-width="140px" height="240px">
        <v-img height="170px" width="140px" :src="`http://localhost:3000${imgPerfil}`" cover />
        <v-btn icon class="position-absolute bottom-20 my-n6 ml-11  btn" @click="onButtonClick">
          <v-icon class="btn-histories">mdi-plus</v-icon>
        </v-btn>
        <v-card-text class="mt-6 text-center text-caption">Crear historia</v-card-text>
      </v-card>
    </v-sheet>
    <v-sheet class="d-flex justify-start container-histories" v-if="lastHistorie && lastHistorie.contenido">
      <v-card class="histories rounded-lg position-relative card elevation-3" max-width="140px" height="240px">
        <v-img height="70%" width="140px" :src="`http://localhost:3000${lastHistorie.contenido}`" cover />
        <p class="absolute-text text-caption pl-2">Tu historia</p>
        <div class="overlay"></div>
      </v-card>
    </v-sheet>
    <v-sheet class="d-flex justify-start container-histories" v-for="historie in otherUsersLastHistories" :key="historie.id">
      <v-card class="histories rounded-lg position-relative card elevation-3" max-width="140px" height="240px">
        <v-img height="70%" width="140px" :src="`http://localhost:3000${historie.contenido}`" cover />
        <p class="absolute-text text-caption pl-2">{{ historie.nombre_usuario || 'Historia' }}</p>
        <div class="overlay"></div>
      </v-card>
    </v-sheet>
  </section>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';

// Define las props del componente
defineProps({
  onButtonClick: {
    type: Function, // Cambia a `String` si es lo que realmente necesitas
    required: true
  },
});

const historiasData = ref([])
const id = ref('')
const userId = localStorage.getItem("@ID");
id.value = userId
const lastHistorie = ref({})
const otherUsersLastHistories = ref([])
const imgPerfil = localStorage.getItem("@IMAGEPERFIL")

const getHistories = async () => {
  try {
    const response = await fetch('http://localhost:3000/historias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener historias');
    }

    const data = await response.json();
    historiasData.value = data || [];

    // Agrupar historias por usuario
    const historiasPorUsuario = data.reduce((acc, historia) => {
      if (!acc[historia.id_usuario]) {
        acc[historia.id_usuario] = [];
      }
      acc[historia.id_usuario].push(historia);
      return acc;
    }, {});

    // Obtener última historia del usuario actual
    if (historiasPorUsuario[id.value]) {
      const userStories = historiasPorUsuario[id.value]
        .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      lastHistorie.value = userStories[0];
    } else {
      lastHistorie.value = null;
    }

    // Obtener últimas historias de otros usuarios
    otherUsersLastHistories.value = Object.entries(historiasPorUsuario)
      .filter(([userId]) => userId !== id.value)
      .map(([, historias]) => {
        return historias.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))[0];
      });

  } catch (error) {
    console.error('Error al obtener historias:', error);
    historiasData.value = [];
    lastHistorie.value = null;
    otherUsersLastHistories.value = [];
  }
};

onMounted(async () => {
  await getHistories();
});
</script>

<style scoped>
.section-histories {
  max-width: 840px;
  background-color: #f2f4f7;
  display: flex;
  gap: 10px;
  margin: auto;
}

.absolute-text {
  position: absolute;
  bottom: 10px;
  font-size: 13px;
}

.histories {
  position: relative;
}

.container-histories {
  background-color: transparent
}

.btn {
  background-color: #0866ff !important;
  color: white;
  border: 5px solid white;
  width: 40px;
  height: 40px;
}

.card {
  background-color: #fff;
}

.btn-histories {
  z-index: 1 !important;
}

.hiddenCard {
  display: none;
}

.overlay {
  background-color: #e2e5e940;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  height: 70px;
  width: 100%;
}
</style>
