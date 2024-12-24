<template>
  <form @submit.prevent="handleLogin">
    <p>Usuario</p>
    <input type="text" v-model="user" id="usuario" placeholder="Usuario" required />
    <br>
    <p>Contraseña</p>
    <input type="password" v-model="pass" id="clave" placeholder="Contraseña" required />
    <br><br>
    <button type="submit">Iniciar sesión</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  
  </form>

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const user = ref('');
    const pass = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const saveIdUser = (id) => {
      try {
      localStorage.setItem("@ID", id)
      // localStorage.setItem("@USERNAME",)
      console.log("id almacenado")
      } catch (error) {
       console.log(error, "ID save problem")
      }
    }
    // Función para manejar el login
    const handleLogin = () => {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: user.value,
          clave: pass.value
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data, "data")
          const idUser = data.user.id
          saveIdUser(idUser)
          if (data.success) {
            console.log('Login exitoso');
            router.push('/homeScreen');
          } else {
            errorMessage.value = data.message || 'Credenciales incorrectas';
          }
        })
        .catch(err => {
          console.error('Error al intentar iniciar sesión:', err);
          errorMessage.value = 'Hubo un error en el inicio de sesión';
        });
    };

    return {
      user,
      pass,
      errorMessage,
      handleLogin
    };
  }
};
</script>
