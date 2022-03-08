<template>
  <div class="matches-list">
    <b-table
      striped
      hover
      :fields="fields"
      :items="leagueFixtures"
      v-if="leagueFixtures"
    >
      <template #cell(league_name)="data">
        {{ data.value }}
      </template>
      <template #cell(date)="data">
        {{ getFormattedDate(data.value) }}
      </template>
      <template #cell(round)="data"> Rodada {{ data.value }} </template>
      <template #cell(hometeam_name)="data">
        <div class="matches-list-name">
          {{ data.value }}
        </div>
      </template>
      <template #cell(home_logo)="data">
        <div class="matches-list-logo">
          <b-img :src="data.item.hometeam_logo"></b-img>
        </div>
      </template>
      <template #cell(separator)="">
        <div class="matches-list-separator">X</div>
      </template>
      <template #cell(away_logo)="data">
        <div class="matches-list-logo">
          <b-img :src="data.item.awayteam_logo"></b-img>
        </div>
      </template>
      <template #cell(awayteam_name)="data">
        {{ data.value }}
      </template>
      <template #cell(analyzedMatch)="data">
        <div class="matches-list-analyzed">
          <router-link
            v-if="!data.item.analyzed"
            :to="{ name: 'lines', params: { selectedMatch: data.item } }"
          >
            <b-button variant="info">Analisar</b-button>
          </router-link>

          <i class="fa fa-check-circle" v-else aria-hidden="true"></i>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  props: ["leagueFixtures"],
  data() {
    return {
      fields: [
        {
          key: "league_name",
          label: "Liga",
          tdClass: "align-middle",
        },
        {
          key: "date",
          label: "Data",
          tdClass: "align-middle",
        },
        {
          key: "round",
          label: "Rodada",
          tdClass: "align-middle",
        },
        {
          key: "hometeam_name",
          label: "Mandante",
          tdClass: "align-middle",
        },
        {
          key: "home_logo",
          label: "",
          tdClass: "align-middle",
        },
        {
          key: "separator",
          label: "",
          tdClass: "align-middle",
        },
        {
          key: "away_logo",
          label: "",
          tdClass: "align-middle",
        },
        {
          key: "awayteam_name",
          label: "Visitante",
          tdClass: "align-middle",
        },
        "Odd Home",
        "Odd Draw",
        "Odd Away",
        "AH Line Home",
        "AH Line Away",
        "AH Odd Away",
        "AH Odd Away",
        {
          key: "analyzedMatch",
          label: "Partida Analisada?",
        },
      ],
    };
  },
  methods: {
    getFormattedDate(date) {
      return format(parseISO(date), "dd/MM/yyyy HH:mm:ss");
    },
  },
};
</script>

<style>
.matches-list {
  display: flex;
  width: 100%;
}

.matches-list-logo > img {
  height: 22px;
  width: 22px;
}

.matches-list-name {
  display: flex;
  min-width: 30%;
}

.matches.list-separator {
  width: 5%;
  margin: 0 5px;
}

.matches-list-analyzed {
  display: flex;
  justify-content: center;
  width: 80%;
}

.matches-list-analyzed > a > button {
  font-size: 0.8rem;
}

.matches-list-analyzed > a > button:focus {
  border: 1px solid #0dcaf0 !important;
  outline: 1px solid #0dcaf0 !important;
}

.matches-list-analyzed > a > button:active {
  background: #07a7c7;
}

.fa-check-circle {
  color: green;
  font-size: 1.7rem;
}
</style>