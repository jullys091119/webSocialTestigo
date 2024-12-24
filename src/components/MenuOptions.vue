<template>
	<div class="pa-4 text-center">
		<v-dialog v-model="dialog" width="auto" scrollable>
			<template v-slot:="dialog">
				<v-card>
					<v-card-item v-on:click="openPerfilUser">
						<p>Julian Ontiveros</p>
					</v-card-item>
					<v-divider class="mt-3"></v-divider>
					<v-card-text class="px-4" style="height: 300px;" v-on:click="closeSession">
						<v-icon>
							mdi-export
						</v-icon>
						Cerrar sesion
					</v-card-text>
					<v-divider></v-divider>
				</v-card>
			</template>
		</v-dialog>
	</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "MenuOptions",
	props: {
		visibility: {
			type: Boolean,
		}
	},
	setup(props) {
		let dialog = ref(props.visibility)
		const router = useRouter()
		// Usamos watch para que cuando `visibility` cambie en el padre, `dialog` se actualice
		watch(() => props.visibility, (newVal) => {
			dialog.value = newVal;
		});

		const closeSession = async () => {
			try {
				localStorage.removeItem("@ID")
				localStorage.removeItem("@NAMEUSER")
				localStorage.removeItem("@LASTNAMEUSER")
				localStorage.removeItem("@EMAILUSER")
				localStorage.removeItem("@PASSWORD")
				localStorage.removeItem("@IMAGEPERFIL")
				console.log("Sesion cerrada")
				router.push('./login')

			} catch (error) {
				console.log(error, "al Salir de la sesion")
			}
		}

		const openPerfilUser = () => {
			router.push('/perfilUser')
		}
		// Emisión de cambios si se necesita
		// watch(dialog, (newVal) => {
		// 	// Si es necesario que el hijo comunique el cambio al padre, puedes usar un evento
		// 	// Ejemplo: this.$emit('update:visibility', newVal);
		// });
		return { dialog, closeSession, openPerfilUser }
	}
})
</script>