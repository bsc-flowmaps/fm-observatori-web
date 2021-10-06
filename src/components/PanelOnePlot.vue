<template>
  <section>
    <div class="plotContainer">
      <Plotly :data="graph_data_layout.data" 
              :layout="graph_data_layout.layout" 
              :display-mode-bar="false"
              ref="generalGraphRef"
      ></Plotly>
    </div>
    <div class="plotContainer">
      <Plotly :data="rt_data_layout.data" 
              :layout="rt_data_layout.layout" 
              :display-mode-bar="false"
              ref="RtGraphRef"
      ></Plotly>
    </div>
  </section>
</template>

<script>
import { Plotly } from 'vue-plotly';

export default {
  components: {
    Plotly
  },
  props: {
    realData: {default: null},
    predictions: {default: null},
    showErrorMargin: {default: true},
  },
  updated() {
    if (this.store.scroll) {
      document.getElementById('infobox').scrollIntoView({behavior: "smooth"})
    }
  },
  methods: {
    generateLines(realDataField, predictionField, color, name, yaxis) {
      let lines = [
        {
          x: this.realData.map(x=>x.date),
          y: this.realData.map(x=>x[realDataField]),
          legendgroup: name,
          legendgrouptitle_text: name, // not working, might be plotly version: https://stackoverflow.com/a/68228794/3790814
          mode: 'lines', type: 'scatter', yaxis: yaxis,
          name: name, line: { color: color},
        },
        {
          x: this.predictions.map(x=>x.data_simulacio),
          y: this.predictions.map(x=>x[predictionField]),
          legendgroup: name,
          mode: 'lines', type: 'scatter', yaxis: yaxis,
          name: 'Prediccions '+name, line: { color: color, dash: 'dashdot'}
        },
      ]

      if (this.showErrorMargin) {
        let dates = this.predictions.map(x=>x.data_simulacio)
        let sup = this.predictions.map(x=>x[predictionField+'_error_sup'])
        let inf = this.predictions.map(x=>x[predictionField+'_error_inf'])
        lines.push(
          {
            x: [].concat(dates, dates.slice().reverse()),
            y: [].concat(sup, inf.reverse()),
            legendgroup: name,
            showlegend: false,
            mode: 'lines', type: 'scatter', yaxis: yaxis,
            hoverinfo: 'skip', fill: 'toself',
            name: 'Prediccions '+name+' error', line: { color: color, width: 1, alpha: 0.1}
          }
        )
      }

      return lines
    }
  },
  computed: {
    graph_data_layout() {
      if (!this.realData || !this.predictions) {
        return {data: null, layout: null}
      }
      let data = [].concat(
        this.generateLines('new_cases', 'casos_reportats', 'red', 'Casos reportats', 'y1'),
        this.generateLines('active_cases_14', 'casos_actius', 'orange', 'Casos actius', 'y1'),
        this.generateLines('INGRESSATS_CRITIC', 'ocupacio_uci', 'blue', 'Ocupació UCI', 'y2'),
        this.generateLines('INGRESSOS_CRITIC', 'ingresos_uci', 'purple', 'Ingressos UCI', 'y2'),
        this.generateLines('INGRESSOS_TOTAL', 'hospitalitzacions', 'green', 'hospitalitzacions', 'y2'),
      )

      let layout = {
        margin: {l: 6, r: 6},
        xaxis: {fixedrange: true, title: 'Data', showgrid: false, zeroline: false},
        legend: {orientation: 'h', x: 0.7, xanchor: 'right', y: 1.2, yanchor: 'bottom'},
        yaxis: {fixedrange: true, automargin: true, side: 'left', title: {text: "Casos"}},
        yaxis2: {fixedrange: true, automargin: true, side: 'right', title: {text: "Ingressos / Ocupació"}, overlaying: 'y'},
        shapes: [{ 
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: this.predictions[0].data_simulacio,
          y0: 0,
          x1: this.predictions[this.predictions.length - 1].data_simulacio,
          y1: 1,
          fillcolor: '#3e5f8a',
          opacity: 0.2,
          line: {
              width: 0
          }
        }]
      }

      return {data, layout}
    },
    rt_data_layout() {
      if (!this.realData || !this.predictions) {
        return {data: null, layout: null}
      }

      let data = this.generateLines('Q500', 'rt', 'black', 'Rt')

      let layout = {
        margin: {l: 25, r: 5},
        title: {text:'Nombre de reproducció Rt', y: 0.85},
        xaxis: {fixedrange: true, title: 'Data', showgrid: false, zeroline: false},
        yaxis: {fixedrange: true, range: [0, 2]},
        legend: {orientation: 'h', x: 0.7, xanchor: 'right', y: 1.2, yanchor: 'bottom'},
        shapes: [{ 
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: this.predictions[0].data_simulacio,
          y0: 0,
          x1: this.predictions[this.predictions.length - 1].data_simulacio,
          y1: 1,
          fillcolor: '#3e5f8a',
          opacity: 0.2,
          line: {
              width: 0
          }
        }]
      }
      return {data, layout}
    }
  },
}
</script>

<style scoped>
section {
  width: 100%;
  padding: 0;
  margin: 0;
}
.plotContainer {
  padding:30px;
}
@media (max-width: 978px) {
    .plotContainer {
      padding:0;
    }
}
</style>
