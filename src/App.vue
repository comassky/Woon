<template>
  <v-app id="inspire">
    <Menu />
    <v-app-bar app clipped-left>
      <v-col offset-sm="8" sm="4">
        <v-select
          v-model="selectedZone.zone"
          :items="zones"
          item-value="value"
          return-object
          label="Select a zone"
          item-text="display_name"
          solo
        ></v-select>
      </v-col>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink">
            <CurrentPlaying :zone="selectedZone" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <StreamBar :zone="selectedZone" @volumeToUpdate="updateVolume" />
  </v-app>
</template>

<script>
import Menu from "./components/Menu";
import StreamBar from "./components/StreamBar";
import CurrentPlaying from "./components/CurrentPlaying";
import _ from "underscore";

import RoonServices from "./services/roonServices";

export default {
  name: "App",

  components: {
    Menu,
    StreamBar,
    CurrentPlaying
  },

  data: () => ({
    zones: [],
    selectedZone: { zone: null, seek: null },
    myRoonInstance: {}
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    this.myRoonInstance = RoonServices;
    this.myRoonInstance
      .connectToRoon(this.updateZones, this.updateZoneSeek)
      .then(() => {
        this.zones = this.myRoonInstance.getRoonZones();

        //BOUCHON
        this.selectedZone.zone = this.zones[1];
      });
  },

  methods: {
    updateVolume(volumeInfo) {
      this.myRoonInstance.updateVolume(volumeInfo.output, volumeInfo.volume);
    },
    updateZoneSeek(data) {
      this.selectedZone.seek = _.first(data.zones_seek_changed);
    },
    updateZones(msg) {
      msg.zones_changed.forEach(zone => {
        console.log("zone.zone_id : ", zone.zone_id, " VS  this.selectedZone.zone.zone_id :",  this.selectedZone.zone.zone_id)
        if (zone.zone_id === this.selectedZone.zone.zone_id) {
          this.selectedZone.zone = zone;
        }
      });
    }
  }
};
</script>
