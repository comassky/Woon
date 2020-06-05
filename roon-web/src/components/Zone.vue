 <template>
  <v-card class="mx-auto" min-width="200">
    <v-card-subtitle class="pb-0">{{zone.display_name}}</v-card-subtitle>
    <v-card-text class="text--primary">
      <v-slider v-model="volume" thumb-label="always"></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from "lodash";

export default {
  name: "Zone",

  props: ["zone"],

  computed: {
    volume: {
      get() {
        if (
          this.zone &&
          this.zone.outputs &&
          this.zone.outputs[0] &&
          this.zone.outputs[0].volume &&
          this.zone.outputs[0].volume.value
        ) {
          return this.zone.outputs[0].volume.value;
        }
        return 0;
      },
      set: _.debounce(function(newValue) {
        this.$emit("volumeUpdate", {
          output: this.zone.outputs[0].output_id,
          volume: newValue
        });
      }, 500)
    }
  },
  data: () => ({})
};
</script>
