<template>
  <div class="matches">
    <h1>Jogos</h1>

    <hr />

    <div
      :class="
        leagueFixtures
          ? 'matches-options matches-options-enable'
          : ' matches-options matches-options-disable'
      "
    >
      <b-form-select
        class="matches-option-list"
        aria-placeholder="Selecione"
        v-model="leagueSelected"
        :options="leagueNames"
      >
      </b-form-select>

      <b-button
        v-if="leagueFixtures"
        class="matches-option-load"
        variant="warning"
        @click="getNewFixtures"
        >Carregar novos jogos</b-button
      >
    </div>
    <div v-if="!leagueFixtures">
      Selecione uma liga para apresentar os próximos jogos
    </div>

    <div class="matches-content">
      <MatchesData :leagueFixtures="leagueFixtures" v-if="leagueFixtures" />
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

import api from "@/config/api";

import MatchesData from "./MatchesData.vue";

export default {
  components: { MatchesData },
  computed: {
    leagueNames() {
      return this.leagues && this.leagues.map((l) => l.name);
    },
  },
  watch: {
    leagueSelected() {
      this.getFixturesByLeague();
    },
  },
  data() {
    return {
      leagueSelected: "",
      leagues: null,
      fixtures: null,
      leagueFixtures: null,
    };
  },
  methods: {
    async loadData() {
      await this.loadLeagues();
      await this.loadFixtures();
    },
    async loadLeagues() {
      try {
        const response = await api.get("/leagues");

        if (response && response.data) {
          this.leagues = response.data;
        }
      } catch (err) {
        // showError(err);
        return;
      }
    },
    async loadFixtures() {
      try {
        const response = await api.get("/fixtures/league");

        if (response && response.data) {
          this.fixtures = response.data;
        }
      } catch (err) {
        // showError(err);
        return;
      }
    },
    async getNewFixtures() {
      try {
        const response = await api.post("/fixtures/", {
          date: format(new Date(), "yyyy-MM-dd"),
        });

        if (response && response.data) {
          await this.loadData();
          this.getFixturesByLeague();
        }
      } catch (err) {
        // showError(err);
        return;
      }
    },
    getFixturesByLeague() {
      if (this.fixtures) {
        const newFixtures = [];
        for (let index = 0; index < this.fixtures.length; index++) {
          const fixture = this.fixtures[index];

          if (fixture.league.name === this.leagueSelected) {
            for (let j = 0; j < fixture.fixtures.length; j++) {
              const leagueFixture = fixture.fixtures[j];
              const newFixture = {
                id: leagueFixture.id,
                league: leagueFixture.league,
                league_name: leagueFixture.league.name,
                league_id: leagueFixture.league.id,
                league_homeadvantage:
                  leagueFixture.league.homeadvantage_analysis,
                league_mustwin: leagueFixture.league.mustwin_analysis,
                league_form: leagueFixture.league.form_analysis,
                league_shape: leagueFixture.league.shape_analysis,
                league_misses: leagueFixture.league.misses_analysis,
                hometeam_id: leagueFixture.hometeam.id,
                hometeam_name: leagueFixture.hometeam.name,
                hometeam_logo: leagueFixture.hometeam.logo,
                awayteam_id: leagueFixture.awayteam.id,
                awayteam_name: leagueFixture.awayteam.name,
                awayteam_logo: leagueFixture.awayteam.logo,
                round: leagueFixture.round,
                date: leagueFixture.date,
              };

              newFixtures.push(newFixture);
            }
          }
        }

        this.leagueFixtures = newFixtures.sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date <= b.date) return -1;

          return 0;
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.matches {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.matches-option-list {
  width: 20%;
}

.matches-options {
  display: flex;
  height: 38px;
  width: 100%;
}

.matches-options-enable {
  justify-content: center;
  width: 100%;
}

.matches-options-disable {
  justify-content: center;
  width: 100%;
}

.matches-option-load {
  margin-left: 25px;
}

.matches-option-load:focus {
  border: 1px solid #ffc107 !important;
  outline: 1px solid #ffc107 !important;
}

.matches-option-load:active {
  background: #d8a303;
}

.matches-content {
  width: 100%;
}
</style>