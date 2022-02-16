<template>
  <div class="ranking">
    <h1>Power Rankings</h1>
    <hr />

    <div class="ranking-content">
      <div
        :class="
          ranking
            ? 'ranking-content-data ranking-content-data-enable'
            : 'ranking-content-data ranking-content-data-disable'
        "
      >
        <div :class="ranking ? 'ranking-data-enable' : 'ranking-data-disable'">
          <div
            :class="
              ranking
                ? 'ranking-options ranking-options-enable'
                : ' ranking-options ranking-options-disable'
            "
          >
            <b-form-select
              class="ranking-option-list"
              v-model="leagueSelected"
              :options="leagueNames"
            ></b-form-select>

            <b-button
              variant="dark"
              v-if="ranking && !isEditable"
              @click="edit()"
              >Editar</b-button
            >
            <b-button
              variant="success"
              v-if="ranking && isEditable"
              @click="save()"
              >Salvar</b-button
            >
          </div>

          <RankingData
            :rankingTeams="ranking.teams"
            :isEditable="isEditable"
            v-if="ranking"
          />
          <div v-else>{{ messageRanking }}</div>
        </div>
      </div>

      <div
        :class="
          ranking
            ? 'ranking-content-info-enable'
            : 'ranking-content-info-disable'
        "
      >
        <RankingInfo v-if="ranking" :categories="ranking.categories" />
      </div>
    </div>
  </div>
</template>

<script>
import RankingData from "./RankingData.vue";
import RankingInfo from "./RankingInfo.vue";

import api from "@/config/api";

export default {
  components: { RankingData, RankingInfo },
  computed: {
    leagueNames() {
      return this.leagues.map((l) => l.name);
    },
  },
  watch: {
    leagueSelected() {
      this.getLeagueRanking();
    },
  },
  data() {
    return {
      leagueSelected: "",
      leagues: [],
      ranking: null,
      isEditable: false,
      messageRanking: "Selecione uma liga para apresentar o power ranking",
    };
  },
  methods: {
    async getLeagueRanking() {
      const leagues = this.leagues.filter(
        (l) => l.name === this.leagueSelected
      );

      if (leagues.length > 0) {
        const league = leagues[0];

        const response = await api.get("/rankings", {
          params: {
            league_id: league.id,
          },
        });

        if (!response.data) {
          this.ranking = null;

          this.messageRanking =
            "Não há nenhum power ranking criado para esta liga.";
        } else {
          this.ranking = response.data;
        }
      }
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
    async updateRanking() {
      try {
        await api.patch("/rankings", {
          teams: this.ranking.teams,
        });
      } catch (err) {
        console.log(err);
        return;
      }
    },
    edit() {
      this.isEditable = true;
    },
    save() {
      this.isEditable = false;
      this.updateRanking();
    },
  },
  async mounted() {
    await this.loadLeagues();
  },
};
</script>

<style>
.ranking {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  width: 100%;
}

hr {
  width: 100%;
}

.ranking > h1 {
  justify-content: center !important;
  align-items: center !important;
  font-size: 1.6rem;
}

.ranking > .custom-select {
  display: inline-block;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.ranking-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.ranking-content-data {
  display: flex;
  width: 100%;
  margin-top: 20px;
}

.ranking-content-data-enable {
  width: 69.2%;
}

.ranking-content-data-disable {
  width: 100%;
}

.ranking-data-enable {
  width: 100%;
}

.ranking-data-disable {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.ranking-content-info-enable {
  margin-top: 58px;
  width: 30%;
  padding-left: 15px;
  border-left: 1px solid #ccc;
}

.ranking-content-info-disable {
  display: none;
}

.ranking-option-list {
  width: 20%;
}

.ranking-options {
  display: flex;
  height: 38px;
}

.ranking-options-enable {
  justify-content: space-between;
  width: 100%;
}

.ranking-options-disable {
  justify-content: center;
  width: 100%;
}
</style>