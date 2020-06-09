 <template>
  <v-row>
    <v-col sm="2">
      <v-img :src="url" aspect-ratio="1" contain width="50" height="50"></v-img>
    </v-col>
    <v-col sm="10">
      <span text-left v-if="zone && zone.zone && zone.zone.now_playing">{{zone.zone.now_playing.one_line.line1}}</span>
    </v-col>
  </v-row>
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
          this.url = roonServices.getImage(
            val.zone.now_playing.image_key,
            50,
            50
          );
        }
      },
      deep: true
    }
  }
};
</script>
