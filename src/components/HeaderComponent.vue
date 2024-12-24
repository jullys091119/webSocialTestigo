<template>
  <header>
    <div class="logo">testiGO</div>
    <input type="text" placeholder="Buscar..." class="search-bar" />
    <div class="nav-icons">
      <div class="container-perfil">
        <v-avatar class="relative">
          <v-img alt="John" :src="`http://localhost:3000${img}`"></v-img>
        </v-avatar>
        <v-avatar color="#D0D3D7" size="x-sm" class="mini-avatar" v-on:click="visibility = !visibility">
          <v-icon class="icon-chevron py-1">mdi-chevron-down</v-icon>
        </v-avatar>
      </div>
      <MenuOptions :visibility="visibility" />
    </div>
  </header>
</template>
<script>
import { defineComponent, ref } from 'vue';
import MenuOptions from './MenuOptions.vue';

export default defineComponent({
  name: "HeaderComponent",
  components: {
    MenuOptions,
  },
  setup() {
    const imgPerfil = localStorage.getItem("@IMAGEPERFIL")
    const visibility = ref(false)
    const img = ref(imgPerfil)
    return { visibility, img }
  }
})
</script>
<style scoped>
.container-perfil {
  position: relative;
}

.icon-chevron {
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mini-avatar {
  position: absolute;
  bottom: -4px;
  right: 15px;
}
</style>