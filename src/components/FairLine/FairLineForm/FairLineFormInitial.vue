<template>
  <div class="fld-initialOdds">
    <h4>Odds Iniciais</h4>
    <hr />
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  props: ["fairLine"],
  computed: {
    getInitialOdds() {
      if (this.fairLine) {
        const initialOdds = [];

        const homeOdds = {
          team: this.fairLine.homeTeam_name,
          percent: Number(this.fairLine.initialHome_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialhome_percent).toFixed(2),
        };
        const drawOdds = {
          team: "Empate",
          percent: Number(this.fairLine.initialDraw_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialDraw_percent).toFixed(2),
        };
        const awayOdds = {
          team: this.fairLine.awayTeam_name,
          percent: Number(this.fairLine.initialAway_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialAway_percent).toFixed(2),
        };

        initialOdds.push(homeOdds, drawOdds, awayOdds);
        return initialOdds;
      }

      return [];
    },
  },
  data() {
    return {
      items: [
        {
          team: this.fairLine.homeTeam_name,
          percent: Number(this.fairLine.initialHome_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialHome_percent).toFixed(2),
        },
        {
          team: "Empate",
          percent: Number(this.fairLine.initialDraw_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialDraw_percent).toFixed(2),
        },
        {
          team: this.fairLine.awayTeam_name,
          percent: Number(this.fairLine.initialAway_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.initialAway_percent).toFixed(2),
        },
      ],
      fields: [
        {
          key: "team",
          label: "Time",
        },
        {
          key: "percent",
          label: "% de vitória",
        },
        {
          key: "odd",
          label: "Odd",
        },
      ],
    };
  },
};
</script>

<style>
.fld-initialOdds {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 7px;
}
</style>