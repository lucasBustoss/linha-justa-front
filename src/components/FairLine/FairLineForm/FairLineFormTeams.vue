<template>
  <b-form-group class="fld-teams-home">
    <b-form-input
      id="fld-teams-home-name"
      :placeholder="`Informe o time ${teamAlias}`"
      :disabled="match != null"
      :value="match ? getTeamName(match) : ''"
    ></b-form-input>

    <b-button v-if="!match" variant="info" class="fld-teams-home-btnsearch"
      >Pesquisar</b-button
    >
    <b-form-input
      v-else
      disabled
      class="fld-teams-home-category"
      :value="category"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: ["teamAlias", "match", "category"],
  methods: {
    getTeamName(match) {
      if (this.teamAlias === "mandante") {
        return match.hometeam_name || match.homeTeam_name;
      }

      if (this.teamAlias === "visitante") {
        return match.awayteam_name || match.awayTeam_name;
      }

      return "";
    },
  },
};
</script>

<style>
.fld-teams-home > div {
  display: flex;
  margin-top: 10px;
}

.fld-teams-home-btnsearch {
  margin-left: 25px;
  font-size: 0.8rem;
  width: 25%;
}

.fld-teams-home-btnsearch:focus {
  border: 1px solid #0dcaf0 !important;
  outline: 1px solid #0dcaf0 !important;
}

.fld-teams-home-btnsearch:active {
  background: #07a7c7;
}

.fld-teams-home-category {
  width: 36%;
  margin-left: 25px;
}
</style>