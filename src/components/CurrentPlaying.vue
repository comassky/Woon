 <template>
  <div>
    {{zone.zone.now_playing.image_key}} 
    <v-img :src="imgUrl" aspect-ratio="1"></v-img>
  </div>
</template>

<script>
export default {
  name: "CurrentPlaying",

  props: ["zone"],

  data: () => ({}),

  computed: {
    imgUrl: {
      get() {
        return (
          "http://192.168.1.1:9100/api/image/" +
          this.zone.zone.now_playing.image_key +
          "?scale=fit&width=500&height=500"
        );
      }
    }
  }
};
</script>
