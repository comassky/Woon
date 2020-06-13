
 <template>
  <v-bottom-navigation fixed id="StreamBar" horizontal>
    <v-row no-gutters>
      <v-col sm="3">
        <v-btn @click="previousSong()">
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn @click="playOrPause()" value="recent">
          <v-icon v-if="isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>
        <v-btn @click="nextSong()">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </v-col>
      <v-col sm="8" class="text-center">
        <CurrentPlaying :zone="zone" />
        <!-- <v-progress-linear :value="currentPosition" height="5"></v-progress-linear> -->
      </v-col>
      <v-col sm="1">
        <Volume class="pr-4" :zone="zone.zone" @volumeUpdate="updateVolume" />
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

 

<script>
import Volume from "./Volume";
import CurrentPlaying from "./CurrentPlaying";
import RoonServices from "./../services/roonServices";

export default {
  name: "StreamBar",

  components: {
    Volume,
    CurrentPlaying
  },

  props: ["zone"],

  data: () => ({ isPlaying: true }),

  methods: {
    updateVolume(element) {
      this.$emit("volumeToUpdate", element);
    },
    playOrPause() {
      RoonServices.playOrPause(this.zone.zone.zone_id);
    },
    stopSong() {
      RoonServices.playOrPause(this.zone.zone.zone_id);
    },
    nextSong() {
      RoonServices.nextSong(this.zone.zone.zone_id);
    },
    previousSong() {
      RoonServices.previousSong(this.zone.zone.zone_id);
    }
  },

  computed: {
    currentPosition: {
      get() {
        if (this.zone && this.zone.zone && this.zone.seek) {
          return Math.round(
            (this.zone.seek.seek_position / this.zone.zone.now_playing.length) *
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
  height: 80px !important;
}
</style>
 