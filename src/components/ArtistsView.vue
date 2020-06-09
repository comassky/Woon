 <template>
  <v-content>
    <v-row class="pr-5">
      <v-col v-for="artist in sortedArtist" :key="artist.title" sm="2" class="pl-6">
        <v-card>
          <v-img :src="getImage(artist.image_key)" height="200px"></v-img>
          <v-card-title>{{artist.title}}</v-card-title>
          <v-card-subtitle>{{artist.subtitle}}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import roonServices from "../services/roonServices";
import _ from "underscore";

export default {
  name: "ArtistsView",

  props: ["artists", "filter"],

  data: () => ({ sortedArtist: [{}] }),

  mounted() {
    this.sortedArtist = this.artists;
  },

  methods: {
    getImage(id) {
      return roonServices.getImage(id);
    }
  },

  watch: {
    filter: {
      handler: _.debounce(function() {
        this.sortedArtist = this.artists;
        if (this.filter !== "") {
          this.sortedArtist = this.artists.filter(artist => {
            const artistName = artist.title.toUpperCase();
            const filter = this.filter.toUpperCase();
            return artistName.includes(filter);
          });
        }
      }, 150)
    },
    artists: {
        handler(val) {
            this.sortedArtist = val;
        }
    }
  }
};
</script>
