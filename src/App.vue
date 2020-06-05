<template>
  <v-app id="inspire">
    <Menu />
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink">
            <Zone
              v-for="zone in zones"
              :zone="zone"
              :key="zone.id_zone"
              @volumeUpdate="updateVolume"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Zone from "./components/Zone";
import Menu from "./components/Menu";

const RoonServices = require("./services/roonServices");

export default {
  name: "App",

  components: {
    Zone,
    Menu
  },

  data: () => ({
    zones: [],
    selectedZone: {},
    myRoonInstance: {}
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    this.myRoonInstance = new RoonServices();
    this.myRoonInstance.connectToRoon().then(() => {
      this.zones = this.myRoonInstance.getRoonZones();
    });
  },

  methods: {
    updateVolume(volumeInfo) {
      this.myRoonInstance.updateVolume(volumeInfo.output, volumeInfo.volume);
    }
  }
};
</script>
