<template>
  <v-app id="inspire">
    <Menu />
    <v-app-bar app clipped-left>
      <v-col offset-sm="4" sm="2">
        <v-text-field v-model="filter" label="Filled" solo></v-text-field>
      </v-col>
      <v-col offset-sm="4" sm="2" class="pa-0" align="center">
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
    <ArtistsView id="ArtistsView" :filter="filter" :artists="sortedArtist" />
    <StreamBar :zone="selectedZone" @volumeToUpdate="updateVolume" />
  </v-app>
</template>


<style>
#ArtistsView {
  margin-bottom: 80px;
}
</style>
 
<script>
import Menu from "./components/Menu";
import StreamBar from "./components/StreamBar";
import ArtistsView from "./components/ArtistsView";
import _ from "underscore";

import RoonServices from "./services/roonServices";

export default {
  name: "App",

  components: {
    Menu,
    StreamBar,
    ArtistsView
  },

  data: () => ({
    zones: [],
    selectedZone: { zone: null, seek: null },
    myRoonInstance: {},
    artists: [],
    sortedArtist: [],
    filter: ""
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    this.myRoonInstance = RoonServices;
    this.myRoonInstance
      .connectToRoon(this.updateZones, this.updateZoneSeek, this.loadArtist)
      .then(() => {
        this.zones = this.myRoonInstance.getRoonZones();

        //BOUCHON
        this.selectedZone.zone = this.zones[1];
        this.myRoonInstance.getArtists((err, result) => {
          this.artists = result.items;
          this.sortedArtist = this.artists;
        });
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
        console.log(
          "zone.zone_id : ",
          zone.zone_id,
          " VS  this.selectedZone.zone.zone_id :",
          this.selectedZone.zone.zone_id
        );
        if (zone.zone_id === this.selectedZone.zone.zone_id) {
          this.selectedZone.zone = zone;
        }
      });
    }
  }
};
</script>
