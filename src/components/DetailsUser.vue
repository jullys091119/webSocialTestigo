<template>
      <h2>Detalles</h2>
      <div class="btn1 text-center py-2 sm">
         <p>Agregar Presentacion</p>
      </div>
      <div class="btn2 text-center py-2 sm">
         <p>Editar detalles</p>
      </div>
      <div class="btn3 text-center py-2 sm">
         <p>Agregar destacados</p>
      </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
   name: "DetailsUser",
   setup() {

   }
})
</script>

<style scoped>
.btn1,
.btn2,
.btn3 {
   max-width: 458px;
   width: 458px;
   height: 36px;
   margin: 15px auto 10px auto;
   background-color: #D6D9DD;
   border-radius: 7px;
   color: #080809;
   font-size: 15px;
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   font-weight: 500;
}

@media (max-width: 1290px) {
  .side-datails .btn1, .btn2, .btn3  {
   max-width: 400px !important;
   width: 360px !important;
  }
}
@media screen and (max-width: 992px) {
   .side-datails .btn1, .btn2, .btn3  {
   max-width: 845px !important;
   width: 100% !important;
  }
}
</style>