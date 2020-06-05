<template>
  <v-app id="inspire">
    <Menu />
    <v-app-bar app clipped-left></v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink">
            <CurrentPlaying :zone="selectedZone"/>
            <Zone
              v-for="zone in zones"
              :zone="zone"
              :key="zone.id_zone"
              @volumeUpdate="updateVolume" hidden
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <StreamBar :zone="selectedZone" @volumeToUpdate="updateVolume" />
  </v-app>
</template>

<script>
import Zone from "./components/Zone";
import Menu from "./components/Menu";
import StreamBar from "./components/StreamBar";
import CurrentPlaying from "./components/CurrentPlaying";
import _ from "underscore";

import RoonServices from "./services/roonServices";

export default {
  name: "App",

  components: {
    Zone,
    Menu,
    StreamBar,
    CurrentPlaying
  },

  data: () => ({
    zones: [],
    selectedZone: {zone:null, seek:null},
    myRoonInstance: {}
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    this.myRoonInstance = RoonServices;
    this.myRoonInstance.connectToRoon().then(() => {
      this.zones = this.myRoonInstance.getRoonZones();
      this.myRoonInstance.subscribeToZone(this.updateZone);
      //BOUCHON
      this.selectedZone.zone = this.zones[0];
    });
  },

  methods: {
    updateVolume(volumeInfo) {
      this.myRoonInstance.updateVolume(volumeInfo.output, volumeInfo.volume);
    },
    updateZone(response, data) {
      this.selectedZone.seek = _.first(data.zones_seek_changed);
    }
  }
};
</script>
