
 
 <template>
  <v-slider v-model="volume" thumb-label></v-slider>
</template>

<script>
import _ from "lodash";

export default {
  name: "Volume",

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
