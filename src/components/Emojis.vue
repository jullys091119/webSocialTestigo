<template>
  <div>
    <div v-for="(emoji, name) in listEmojis" :key="name" class="containerEmoji">
      <p v-on:click="iconSelected(emoji.emoji)" ref="icon"> {{ emoji.emoji }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
export default defineComponent({
  name: "listEmojies",
  setup(_, {emit}) {
    const listEmojis = ref([])
    const emojis = [
      { name: 'smile', emoji: '😀' },
      { name: 'grin', emoji: '😁' },
      { name: 'joy', emoji: '😂' },
      { name: 'heart_eyes', emoji: '😍' },
      { name: 'thinking', emoji: '🤔' },
      { name: 'crying', emoji: '😢' },
      { name: 'sunglasses', emoji: '😎' },
      { name: 'wink', emoji: '😉' },
      { name: 'heart_red', emoji: '❤️' },
      { name: 'heart_yellow', emoji: '💛' },
      { name: 'heart_blue', emoji: '💙' },
      { name: 'heart_green', emoji: '💚' },
      { name: 'heart_purple', emoji: '💜' },
      { name: 'heart_black', emoji: '🖤' },
      { name: 'broken_heart', emoji: '💔' },
      { name: 'wave', emoji: '👋' },
      { name: 'raised_hand', emoji: '✋' },
      { name: 'ok_hand', emoji: '👌' },
      { name: 'praying_hands', emoji: '🤲' },
      { name: 'dog', emoji: '🐶' },
      { name: 'cat', emoji: '🐱' },
      { name: 'lion', emoji: '🦁' },
      { name: 'fox', emoji: '🦊' },
      { name: 'unicorn', emoji: '🦄' },
      { name: 'monkey', emoji: '🐒' },
      { name: 'apple', emoji: '🍎' },
      { name: 'pizza', emoji: '🍕' },
      { name: 'burger', emoji: '🍔' },
      { name: 'fries', emoji: '🍟' },
      { name: 'beer', emoji: '🍻' },
      { name: 'wine', emoji: '🍷' },
      { name: 'coffee', emoji: '☕' },
      { name: 'cherry_blossom', emoji: '🌸' },
      { name: 'tree', emoji: '🌳' },
      { name: 'sun', emoji: '🌞' },
      { name: 'rain_cloud', emoji: '🌧️' },
      { name: 'rainbow', emoji: '🌈' },
      { name: 'car', emoji: '🚗' },
      { name: 'bike', emoji: '🚴‍♂️' },
      { name: 'airplane', emoji: '✈️' },
      { name: 'rocket', emoji: '🚀' },
      { name: 'briefcase', emoji: '💼' },
      { name: 'fire', emoji: '🔥' },
      { name: 'party', emoji: '🎉' },
      { name: 'music_notes', emoji: '🎶' },
      { name: 'gift', emoji: '🎁' },
      { name: 'red_circle', emoji: '🔴' },
      { name: 'green_circle', emoji: '🟢' },
      { name: 'yellow_circle', emoji: '🟡' },
      { name: 'blue_circle', emoji: '🔵' },
      { name: 'soccer_ball', emoji: '⚽' },
      { name: 'lock', emoji: '🔒' },

      // Nuevos emojis agregados:
      { name: 'tears_of_joy', emoji: '😂' },
      { name: 'smiling_face_with_heart_eyes', emoji: '🥰' },
      { name: 'heart_face', emoji: '❤️' },
      { name: 'angry_face', emoji: '😡' },
      { name: 'thinking_face', emoji: '🤔' },
      { name: 'crying_face', emoji: '😭' },
      { name: 'starry_night', emoji: '🌌' },
      { name: 'moon', emoji: '🌙' },
      { name: 'sparkles', emoji: '✨' },
      { name: 'watermelon', emoji: '🍉' },
      { name: 'grapes', emoji: '🍇' },
      { name: 'strawberry', emoji: '🍓' },
      { name: 'mango', emoji: '🥭' },
      { name: 'cake', emoji: '🍰' },
      { name: 'donut', emoji: '🍩' },
      { name: 'ice_cream', emoji: '🍦' },
      { name: 'beer_mug', emoji: '🍺' },
      { name: 'wine_glass', emoji: '🍷' },
      { name: 'cocktail', emoji: '🍸' },
      { name: 'teacup', emoji: '🍵' },
      { name: 'popcorn', emoji: '🍿' },
      { name: 'sushi', emoji: '🍣' },
      { name: 'chocolate_bar', emoji: '🍫' },
      { name: 'sandwich', emoji: '🥪' },
      { name: 'taco', emoji: '🌮' },
      { name: 'burrito', emoji: '🌯' },
      { name: 'french_fries', emoji: '🍟' },
      { name: 'hotdog', emoji: '🌭' },
      { name: 'fruit_cup', emoji: '🍊' },
      { name: 'dog_face', emoji: '🐕' },
      { name: 'cat_face', emoji: '🐈' },
      { name: 'rabbit', emoji: '🐇' },
      { name: 'panda_face', emoji: '🐼' },
      { name: 'tiger_face', emoji: '🐯' },
      { name: 'koala', emoji: '🐨' },
      { name: 'whale', emoji: '🐋' },
      { name: 'elephant', emoji: '🐘' },
      { name: 'duck', emoji: '🦆' },
      { name: 'horse', emoji: '🐴' },
      { name: 'giraffe', emoji: '🦒' },
      { name: 'panda', emoji: '🐼' },
      { name: 'monkey_face', emoji: '🐵' },
      { name: 'unicorn_face', emoji: '🦄' },
      { name: 'mushroom', emoji: '🍄' },
      { name: 'cactus', emoji: '🌵' },
      { name: 'snowflake', emoji: '❄️' },
      { name: 'sun_with_face', emoji: '🌞' },
      { name: 'cloud_with_sun', emoji: '🌤️' },
      { name: 'wind_face', emoji: '🌬️' },
      { name: 'tornado', emoji: '🌪️' },
      { name: 'rainbow_flag', emoji: '🏳️‍🌈' },
      { name: 'heart_eyes_cat', emoji: '😻' },
      { name: 'smiling_face_with_smiling_eyes', emoji: '😊' },
      { name: 'face_with_medical_mask', emoji: '😷' },
      { name: 'face_with_thermometer', emoji: '🤒' },
      { name: 'rainbow_emoji', emoji: '🌈' },
      { name: 'clown_face', emoji: '🤡' },
      { name: 'ghost', emoji: '👻' },
      { name: 'alien', emoji: '👽' },
      { name: 'robot_face', emoji: '🤖' },
      { name: 'princess', emoji: '👸' },
      { name: 'superhero', emoji: '🦸‍♂️' },
      { name: 'superheroine', emoji: '🦸‍♀️' },
      { name: 'genie', emoji: '🧞‍♂️' },
      { name: 'wizard', emoji: '🧙‍♀️' },
      { name: 'magician', emoji: '🧙‍♂️' },
      { name: 'construction_worker', emoji: '👷‍♀️' },
      { name: 'artist', emoji: '👩‍🎨' },
      { name: 'chef', emoji: '👨‍🍳' },
      { name: 'dancer', emoji: '💃' },
      { name: 'singer', emoji: '🎤' },
      { name: 'athlete', emoji: '🏅' },
      { name: 'violin', emoji: '🎻' },
      { name: 'drum', emoji: '🥁' },
      { name: 'trumpet', emoji: '🎺' },
      { name: 'guitar', emoji: '🎸' },
      { name: 'cello', emoji: '🎻' },
      { name: 'saxophone', emoji: '🎷' },
      { name: 'piano', emoji: '🎹' },
      { name: 'microphone', emoji: '🎙️' },
      { name: 'headphones', emoji: '🎧' },
      { name: 'movie_camera', emoji: '🎥' },
      { name: 'clapperboard', emoji: '🎬' }
    ];

    listEmojis.value = emojis

    const iconSelected = (icon) => {
      emit('emoji-selected', icon);
    }


    return { listEmojis, iconSelected }
  }
})


</script>

<style scoped>
/* Agrega tu estilo aquí */
.containerEmoji {
  padding: 0 30px;
  display: inline-block;
  /* Usamos flexbox para alinear los emojis horizontalmente */
  padding: 2px;
  justify-content: center;
}


.emoji:hover {
  background-color: #e0e0e0;
  /* Cambio de color cuando se pasa el ratón */
}
</style>
