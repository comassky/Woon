
 <template>
  <v-bottom-navigation id="StreamBar" horizontal>
    <v-row no-gutters>
      <v-col sm="3">
        <v-btn value="recent">
          <span>Recent</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>
      </v-col>
      <v-col sm="8" class="text-center">
        <!-- <span>{{zone.now_playing.one_line.line1}}</span> -->
        <v-progress-linear :value="currentPosition" height="5"></v-progress-linear>
      </v-col>
      <v-col sm="1">
        <Volume class="pr-4" :zone="zone.zone" @volumeUpdate="updateVolume" />
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<script>
import Volume from "./Volume";

export default {
  name: "StreamBar",

  components: {
    Volume
  },

  props: ["zone"],

  data: () => ({}),

  methods: {
    updateVolume(element) {
      this.$emit("volumeToUpdate", element);
    }
  },

  computed: {
    currentPosition: {
      get() {
        if (this.zone && this.zone.zone && this.zone.seek) {
          return Math.round(
            (this.zone.seek.seek_position /
              this.zone.zone.now_playing.length) *
              100
          );
        }
        return 0;
      }
    }
  }
};
</script>

<style>
#StreamBar {
  z-index: 999;
}
</style>
 