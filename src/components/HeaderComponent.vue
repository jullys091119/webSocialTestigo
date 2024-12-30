<template>
  <header class="header" :style="styleHeaderPerfil">
    <div class="logo d-flex" contain>
     <img  height="230px" width="230px" :src="logoSocial" class="img-logo" alt="">
    </div>
    <div class="search d-flex items-center justify-center">
      <v-icon size="20px"  class="mt-2 mx-3">mdi-magnify</v-icon>
      <input type="text" placeholder="Buscar..." class="search-bar" />
    </div>
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
import logoSocial from '@/assets/logoSocial.png';

export default defineComponent({
  name: "HeaderComponent",
  components: {
    MenuOptions,
  },
  props: {
    headerCustom: {
      type: String,
      require: true
   }
  },
  setup(props) {

    console.log(props.headerCustom, "headerProps")
    const imgPerfil = localStorage.getItem("@IMAGEPERFIL")
    const visibility = ref(false)
    const img = ref(imgPerfil)
    const styleHeaderPerfil =  ref(props.headerCustom)
    return { visibility, img, logoSocial, styleHeaderPerfil }
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
.search {
  background-color: #F0F2F5;
  width: 252px;
  height: 40px;
  border-radius: 20px;
}

.search input:focus {
  border: none !important;
  outline: none !important;
}
.img-logo {
  margin-top: -87px;
  margin-left: -66px;
}

</style>