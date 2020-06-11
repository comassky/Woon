module.exports = {
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks'),
      config.optimization.minimize(false)
  },
  "transpileDependencies": [
    "vuetify"
  ],

}