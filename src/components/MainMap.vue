<template>
  <div id="mainmap">
    <title-wrapper>
      <template v-slot:title>
        Històric i previsions referents a Covid-19 a Catalunya - Regions Sanitàries
      </template>
    </title-wrapper>

    <base-card>
      <section>
        <!-- MAP -->
        <Plotly 
          :data="map_data" 
          :layout="map_layout" 
          :display-mode-bar="false"
          ref="mainMapRef"
        ></Plotly>
      </section>
    </base-card>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly';

import RegSanObs09 from '../static/reg_san_obs_09.geojson.json';

const LAYER_TO_GEOJSON = {
  "reg_san_obs_09": RegSanObs09,
}

export default {
  components: {
    Plotly,
  },
  emits: ['patch_selected'],
  props: {
    defaultSelectedPatch: {default: null},
    layer: {default: "reg_san_obs_09"},
    zoom: {default: 6.5},
    lon: {default: 1.86},
    lat: {default: 41.82}
  },
  data() {
    const geojson = LAYER_TO_GEOJSON[this.layer];
    const data = [{ 
      type: "choroplethmapbox",
      locations: geojson.features.map(patch=>patch.id),
      geojson: geojson,
      customdata: geojson.features.map(patch=>[patch.properties.rs_name]),
      hovertemplate: "%{customdata[0]}<extra></extra>",
      z: geojson.features.map(()=>0),
      showscale: false,
      marker: { opacity: 0.6 },
    }]
    const layout = { 
      mapbox: {
        center: {lon: this.lon, lat: this.lat},
        zoom: this.zoom,
        style: 'carto-positron',
        layers: this.buildLayers(this.defaultSelectedPatch)
      }, 
      margin: {"r":0,"t":0,"l":0,"b":0}, 
      height: 500 
    }
    return {
      map_data: data,
      map_layout: layout,
      selectedPatch: this.defaultSelectedPatch
    }
  },
  methods: {
    selectPatch(patch) {
      this.selectedPatch = patch;
      this.$emit('patch_selected', patch);
    },
    buildLayers(selectedPatch) {
      let patch = selectedPatch

      if (!patch || !patch.id) {
        // No patch selected
        return []
      } else {
        // Patch selected
        const geojson = LAYER_TO_GEOJSON[this.layer];  
        return [{
            color: "black",
            line: {"width": 2.5},
            opacity: 1,
            sourcetype: "geojson",
            type: "line",
            source: {
                type: "FeatureCollection",
                features: [geojson.features.find(y=>y.id == patch.id)]
            },
        }]
      }
    }
  },
  watch: {
    selectedPatch(patch) {
      let new_layout = Object.assign({}, this.map_layout);
      new_layout.mapbox.layers = this.buildLayers(patch)
      this.map_layout = new_layout;
    },
  },
  created() {
  },
  mounted() {
    // Setup the map click actions
    this.$refs.mainMapRef.$on('click', object => {
      const id = object.points[0].location;
      const name = object.points[0].properties.rotulo || object.points[0].properties.NOMABS || object.points[0].properties.rs_name;
      const patch = {id: id, name: name}
      this.selectPatch(patch);
    });
  }
}
</script>

<style scoped>
#mainmap {
  margin-top: 1rem;
}
section {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
