<template>
  <div class="leagues">
    <h1>Leagues</h1>

    <b-list-group class="leagues-list">
      <b-list-group-item
        v-for="league in leagues"
        :key="league.id"
        class="leagues-list-item"
      >
        {{ league.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import api from "@/config/api";

export default {
  data() {
    return {
      leagues: [],
    };
  },
  methods: {
    async loadLeagues() {
      try {
        const response = await api.get("/leagues");

        if (response && response.data) {
          this.leagues = response.data;
        }

        console.log(this.leagues);
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
.leagues {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.leagues-list {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 30%;
}

.leagues-list-item {
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: center;
  margin-top: 5px;
  border: 1px solid #333 !important;
  background: inherit !important;
}
</style>