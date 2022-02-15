<template>
  <div class="ranking">
    <h1>Power Rankings</h1>

    <b-form-select
      v-model="leagueSelected"
      :options="leagueNames"
    ></b-form-select>
  </div>
</template>

<script>
import api from "@/config/api";

export default {
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
    };
  },
  methods: {
    async getLeagueRanking() {
      const leagues = this.leagues.filter(
        (l) => l.name === this.leagueSelected
      );

      if (leagues.length > 0) {
        const league = leagues[0];
        console.log(league);
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
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.ranking > .custom-select {
  display: inline-block;
  width: 15%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>