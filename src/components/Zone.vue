
 
 <template>
  <v-card class="mx-auto" min-width="200">
  </v-card>
</template>

<script>

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
      }
    }
  },
  data: () => ({})
};
</script>
