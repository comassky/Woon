 <template>
  <v-content>
        <h1>{{zone.zone.now_playing.one_line.line1}}</h1>
    <v-img :src="url" aspect-ratio="1" contain width="500" height="500"></v-img>
  </v-content>
</template>

<script>
import roonServices from "../services/roonServices";

export default {
  name: "CurrentPlaying",

  props: ["zone"],

  data: () => ({
    url: ""
  }),

  watch: {
    zone: {
      handler(val) {
        if (val && val.zone) {
          this.url = roonServices.getImage(val.zone.now_playing.image_key);
        }
      },
      deep: true
    }
  }
};
</script>
