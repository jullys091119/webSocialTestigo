<template>
	<div class="container-img">
		<p>perfil de usuario</p>
		<v-avatar class="img-perfil">
			<v-img alt="John" :src="`http://localhost:3000${img}`" />
		</v-avatar>
		<v-icon class="camera-absolute" @click="triggerFileInput">
			mdi-camera
		</v-icon>
		<input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" style="display: none;" />
	</div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'PerfilUser',
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


		return { returnHome, triggerFileInput, handleFileChange, img }
	}
})
</script>

<style scoped>
.container-img {
	position: relative;
}

.camera-absolute {
	position: absolute;
	bottom: 20px;
	left: 115px;
}

.img-perfil {
	width: 140px !important;
	height: 140px !important;
}
</style>