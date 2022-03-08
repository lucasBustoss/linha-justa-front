<template>
  <div class="fld-stats">
    <div class="fld-stats-button">
      <b-button
        variant="dark"
        class="fld-stats-button-update"
        v-if="!isEditable"
        @click="isEditable = true"
        >Alterar</b-button
      >
      <b-button
        variant="success"
        class="fld-stats-button-save"
        v-else
        @click="saveFairLine"
        >Salvar</b-button
      >
    </div>

    <div class="fld-stats-analysis">
      <h4>Análise</h4>
      <hr />
      <b-table class="fld-data-table" :items="stats" :fields="statsFields">
        <template #cell(homeTeam)="data">
          <b-form-input
            class="fld-table-input"
            v-if="isEditable && allowEdit(stats[data.index])"
            v-model="stats[data.index].homeTeam"
            type="number"
          ></b-form-input>
          <div v-else>
            {{ data.value }}
          </div>
        </template>

        <template #cell(awayTeam)="data">
          <b-form-input
            class="fld-table-input"
            v-if="isEditable && allowEdit(stats[data.index])"
            v-model="stats[data.index].awayTeam"
            type="number"
          ></b-form-input>
          <div v-else>
            {{ data.value }}
          </div>
        </template>

        <template #cell(analysis)="data">
          <div>
            {{ data.value }}
          </div>
        </template>

        <template #cell(percentAddition)="data">
          <div>
            {{ data.value }}
          </div>
        </template>
      </b-table>
      <div class="fld-data-table-total">
        <div class="fld-data-table-total-label">Total</div>
        <div class="fld-data-table-total-value">{{ getTotalAddition() }}</div>
      </div>
    </div>

    <div class="fld-stats-finalOdds">
      <h4>Odds Finais</h4>
      <hr />
      <b-table striped hover :items="odds" :fields="oddsFields">
        <template #cell(percent)="data">
          <b-form-input
            class="fld-table-input"
            v-if="isEditable && allowEdit(odds[data.index])"
            v-model="odds[data.index].percent"
          ></b-form-input>
          <div v-else>
            {{ data.value }}
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fairLine", "league"],
  data() {
    return {
      isEditable: false,
      stats: [
        {
          analysisFactor: "Mando de campo",
          homeTeam: this.fairLine.homeAdvantage,
          awayTeam: 0,
          analysis: this.league.homeadvantage_analysis,
          percentAddition: Number(
            this.league.homeadvantage_analysis *
              (this.fairLine.homeAdvantage - 0)
          ).toFixed(2),
        },
        {
          analysisFactor: "Necessidade de vitória",
          homeTeam: this.fairLine.homeMustWin_score,
          awayTeam: this.fairLine.awayMustWin_score,
          analysis: this.league.mustwin_analysis,
          percentAddition: Number(
            this.league.mustwin_analysis *
              (this.fairLine.homeMustWin_score -
                this.fairLine.awayMustWin_score)
          ).toFixed(2),
        },
        {
          analysisFactor: "Forma",
          homeTeam: this.fairLine.homeForm_score,
          awayTeam: this.fairLine.awayForm_score,
          analysis: this.league.form_analysis,
          percentAddition: Number(
            this.league.form_analysis *
              (this.fairLine.homeForm_score - this.fairLine.awayForm_score)
          ).toFixed(2),
        },
        {
          analysisFactor: "Shape",
          homeTeam: this.fairLine.homeShape_score,
          awayTeam: this.fairLine.awayShape_score,
          analysis: this.league.shape_analysis,
          percentAddition: Number(
            this.league.shape_analysis *
              (this.fairLine.homeShape_score - this.fairLine.awayShape_score)
          ).toFixed(2),
        },
        {
          analysisFactor: "Desfalques",
          homeTeam: this.fairLine.homeMisses_score,
          awayTeam: this.fairLine.awayMisses_score,
          analysis: this.league.misses_analysis,
          percentAddition: Number(
            this.league.misses_analysis *
              (-this.fairLine.homeMisses_score + this.fairLine.awayMisses_score)
          ).toFixed(2),
        },
      ],
      statsFields: [
        {
          key: "analysisFactor",
          label: "Fator de análise",
          tdClass: "fld-analysisfactor",
        },
        {
          key: "homeTeam",
          label: this.fairLine.homeTeam_name,
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-team",
        },
        {
          key: "awayTeam",
          label: this.fairLine.awayTeam_name,
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-team",
        },
        {
          key: "analysis",
          label: "Peso da análise",
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-analysis",
        },
        {
          key: "percentAddition",
          label: "% de adição",
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-percentAddition",
        },
      ],
      odds: [
        {
          team: this.fairLine.homeTeam_name,
          percent: Number(this.fairLine.finalHome_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.finalHome_percent).toFixed(2),
        },
        {
          team: "Empate",
          percent: Number(this.fairLine.finalDraw_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.finalDraw_percent).toFixed(2),
        },
        {
          team: this.fairLine.awayTeam_name,
          percent: Number(this.fairLine.finalAway_percent * 100).toFixed(2),
          odd: Number(1 / this.fairLine.finalAway_percent).toFixed(2),
        },
      ],
      oddsFields: [
        {
          key: "team",
          label: "Time",
          thClass: "fld-oddTeam",
        },
        {
          key: "percent",
          label: "% de vitória",
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-oddValues",
        },
        {
          key: "odd",
          label: "Odds",
          tdClass: "fld-alignText",
          thClass: "fld-alignText fld-oddValues",
        },
      ],
    };
  },
  methods: {
    allowEdit(item) {
      return (
        item.analysisFactor === "Necessidade de vitória" ||
        item.analysisFactor === "Desfalques" ||
        item.team === "Empate"
      );
    },
    calculateAddition() {
      if (this.stats) {
        this.stats.map((stat) => {
          if (stat.analysisFactor === "Desfalques") {
            stat.percentAddition = Number(
              Number(stat.analysis) *
                (Number(-stat.homeTeam) + Number(stat.awayTeam))
            ).toFixed(2);
          } else {
            stat.percentAddition = Number(
              Number(stat.analysis) *
                (Number(stat.homeTeam) - Number(stat.awayTeam))
            ).toFixed(2);
          }
        });
      }
    },
    async calculateFinalOdds() {
      const totalAddition = await this.getTotalAddition();

      for (let index = 0; index < this.odds.length; index++) {
        const odd = this.odds[index];

        if (index === 0) {
          odd.percent = Number(
            Number(this.fairLine.initialHome_percent * 100) +
              Number(totalAddition)
          ).toFixed(2);
          odd.odd = Number(100 / Number(odd.percent)).toFixed(2);
        }

        if (index === 1) {
          odd.percent = Number(odd.percent).toFixed(2);
          odd.odd = Number(100 / Number(odd.percent)).toFixed(2);
        }

        if (index === 2) {
          odd.percent = Number(
            100 - Number(this.odds[0].percent) - Number(this.odds[1].percent)
          ).toFixed(2);
          odd.odd = Number(100 / Number(odd.percent)).toFixed(2);
        }
      }
    },
    getTotalAddition() {
      let total = 0;

      this.stats.map((a) => {
        total += Number(a.percentAddition);
      });

      return Number(total).toFixed(2);
    },
    async saveFairLine() {
      this.isEditable = false;
      await this.calculateAddition();
      await this.calculateFinalOdds();

      const mustWin = this.stats.filter(
        (st) => st.analysisFactor === "Necessidade de vitória"
      );
      const misses = this.stats.filter(
        (st) => st.analysisFactor === "Desfalques"
      );

      const newFairLine = {
        homeMustWin_score: mustWin.length ? mustWin[0].homeTeam : null,
        homeMisses_score: misses.length ? misses[0].homeTeam : null,
        awayMustWin_score: mustWin.length ? mustWin[0].awayTeam : null,
        awayMisses_score: misses.length ? misses[0].awayTeam : null,
        percentAddition: this.getTotalAddition(),
        finalHome_percent: this.odds[0].percent / 100,
        finalDraw_percent: this.odds[1].percent / 100,
        finalAway_percent: this.odds[2].percent / 100,
      };

      this.$emit("updateFairLine", newFairLine);
    },
  },
  async mounted() {
    await this.calculateFinalOdds();
  },
};
</script>

<style>
.fld-stats {
  margin: 10px 50px;
}

.fld-stats-button {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.fld-stats-button-update:focus {
  border: 1px solid #212529 !important;
  outline: 1px solid #212529 !important;
}

.fld-stats-button-update:active {
  background: #5b6570;
}

.fld-stats-button-save:focus {
  border: 1px solid #198754 !important;
  outline: 1px solid #198754 !important;
}

.fld-stats-button-save:active {
  background: #0f9c5b;
}

.fld-stats-analysis {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 7px;
}

.fld-stats-analysis > table {
  margin: 0;
}

.fld-stats-finalOdds {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 7px;
  margin-top: 50px;
}

.fld-table-input {
  text-align: right;
  padding: 0px 6px;
}

.fld-table-input:focus {
  outline: none;
  border: 1px solid #ced4da;
  box-shadow: none;
}

.fld-analysisfactor {
  width: 40%;
}

.fld-team {
  width: 15%;
}

.fld-analysis,
.fld-percentAddition {
  width: 15%;
}

.fld-alignText {
  text-align: right;
}

.fld-oddTeam {
  width: 60%;
}

.fld-oddValues {
  width: 20%;
}

.fld-data-table-total {
  margin: 7px 10px;
  display: flex;
  justify-content: space-between;
}
</style>