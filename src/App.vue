<template>
  <div id="app">


    <TheHeader></TheHeader>
    
    <base-card v-if="showMaintenance">
      <div style="margin: 20px">        
        <h2>Web en manteniment</h2>
        Nostre lloc web està en procés de manteniment programat. Torneu a comprovar-ho aviat.
      </div>
    </base-card>

    <div v-else>
      <MainMap
        layer="reg_san_obs_09"
        :defaultSelectedPatch="selectedPatch"
        @patch_selected="onPatchSelected">
      </MainMap>

      <div v-if="selectedPatch" id="infobox">
        <title-wrapper mode="withButtons">
          <template v-slot:title>
            Previsions a 21 dies per a {{ selectedPatch.name }}
          </template>
          <template v-slot:buttons>
            <button-wrapper class="mybtn">
              <!-- SWIPE ONE PLOT TO MULTIPLE -->
              <button @click="togglePlotRepresentation">
                <svg v-if="!singlePlot" xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/><path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg>
              </button>
            </button-wrapper>

            <!-- ERROR MARGIN -->
            <button-wrapper class="mybtn">
              <button @click="toggleErrorMarginVisibility">
                <svg v-if="!showErrorMargin" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/></svg>
                Marge d'error
              </button>
            </button-wrapper>

            <!-- CALENDAR -->
            <button-wrapper class="mybtn">
              <the-calendar
                :start_date="startDate"
                :end_date="endDate"
                :min_date="minDateCalendar"
                :max_date="maxDateCalendar"
                @change_dates="onChangeDates"
              ></the-calendar>
            </button-wrapper>

          </template>
        </title-wrapper>

        <base-card>
          Mostrant les prediccions per a la simulació que comença el dia {{ endDate }} 

          <div v-if="singlePlot">
            <PanelOnePlot
              :realData="realData"
              :predictions="predictions"
              :showErrorMargin="showErrorMargin"
            ></PanelOnePlot>
          </div>

          <div v-else>
            <PanelMultiplePlots
              :realData="realData"
              :predictions="predictions"
              :showErrorMargin="showErrorMargin"
            ></PanelMultiplePlots>
          </div>

        </base-card>

      </div>
    </div>
  </div>
</template>

<script>
import MainMap from './components/MainMap.vue';
import TheHeader from './components/TheHeader.vue';
import TheCalendar from './components/TheCalendar.vue';
import PanelMultiplePlots from './components/PanelMultiplePlots.vue';
import PanelOnePlot from './components/PanelOnePlot.vue';

function addToDate(dateStr, days) {
  let date = new Date(dateStr)
  date.setDate(date.getDate() + days)
  return date.toJSON().slice(0,10)
}

export default {
  data: function () {
    return {
      selectedPatch: {id: "13", name: "Barcelona Ciutat"},
      minDateCalendar: '2020-03-01',
      maxDateCalendar: '2021-08-01',
      startDate: '2021-06-01', 
      endDate: '2021-06-20',
      baseUrl: 'https://flowmaps.life.bsc.es/api',
      singlePlot: false,
      showErrorMargin: true,
      showMaintenance: false
    }
  },
  components: {
    TheHeader,
    MainMap,
    TheCalendar,
    PanelOnePlot,
    PanelMultiplePlots,
  },
  asyncComputed: {
    async realData() {
      if (!this.selectedPatch) {
        return null;
      }
      const filters = JSON.stringify({
          "type": "consolidated",
          "ev": "09.covid_region",
          "layer": "reg_san_obs_09",
          "id": this.selectedPatch.id,
          "date": {
              $gte: this.startDate,
              $lte: addToDate(this.endDate, 20),
          },
      });
        const url = this.baseUrl + '/layers.data.consolidated/?where=' + 
                    filters + 
                    '&max_results=1000' +
                    '&projection={"date":1, "active_cases_14":1, "new_cases":1, "INGRESSOS_CRITIC":1, "INGRESSATS_CRITIC":1, "INGRESSOS_TOTAL":1, "Q500":1, "Q250":1, "Q975":1}' +
                    '&sort=[("date", 1)]';
      try {
        const response = await fetch(url);
        let responseData = await response.text();
        responseData = JSON.parse(responseData.replace(/\bNaN\b/g, "null"));
        return responseData._items
      } catch(error) {
        // error fetching real data from DB
        this.showMaintenance = true
        return null
      }
    },
    async predictions() {
      if (!this.selectedPatch) {
        return null;
      }
      const filters = JSON.stringify({
          "dataset": "observatori_reg_san_obs_09",
          "layer": "reg_san_obs_09",
          "id": this.selectedPatch.id,
          "data": this.endDate,
      });
      const url = this.baseUrl + '/layers.predictions/?where=' + filters + '&max_results=1000&sort=[("data_simulacio", 1)]'
      try {
        const response = await fetch(url);
        let responseData = await response.text();
        responseData = JSON.parse(responseData.replace(/\bNaN\b/g, "null"));
        return responseData._items
      } catch(error) {
        // error fetching predictions from DB
        this.showMaintenance = true
        return null
      }
    }
  },
  watch: {
  },
  async created() {

    // query maximum date for predictions
    const url1 = this.baseUrl + '/layers.predictions?where={%22dataset%22:%22observatori_reg_san_obs_09%22,%22id%22:%2211%22}&sort=-data&max_results=1'

    // query maximum available date for real data, with Rt different from NaN
    const url2 = this.baseUrl + '/layers.data.consolidated/?where={%22type%22:%22consolidated%22,%22ev%22:%2209.covid_region%22,%22layer%22:%22reg_san_obs_09%22,%22id%22:%2211%22,%22Q500%22:{%22$ne%22:NaN}}&sort=-date&max_results=1'

    const responses = await Promise.all([fetch(url1), fetch(url2)])
    const data = await Promise.all(responses.map(r=>r.json()))
    var maxPredDateStr = data[0]._items[0]['data']; 
    var maxRtDateStr = data[1]._items[0]['date'];
    var maxAvailable = [maxPredDateStr, maxRtDateStr].sort()[0] // get maximum date for which we have predictions and real data

    this.maxDateCalendar = maxAvailable

    // set initial date range
    this.endDate = maxAvailable
    this.startDate = addToDate(maxAvailable, -60)
  },
  methods: {
    onChangeDates(range) {
      this.startDate = range.start_date;
      this.endDate = range.end_date;
    },
    onPatchSelected(patch) {
      this.store.scroll = true // scroll initializes as false, but it is activated once the first patch is selected
      this.selectedPatch = patch
    },
    togglePlotRepresentation() {
      this.singlePlot = !this.singlePlot;
    },
    toggleErrorMarginVisibility() {
      this.showErrorMargin = !this.showErrorMargin;
    },
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
  background-color: #f5f5f5 !important;
}

#infobox {
  padding: 0;
  padding-bottom: 2rem;
  width: 100%;
  margin: 0;
}

#multiple-choice-icon {
  height: 30px;
}

button {
  padding: 0.3rem;
  border: none;
  background: none;
}

.mybtn {
  margin: 4px !important;
}

.container {
  max-width: 1320px !important;
}

</style>
