<template>
  <div class="fair-line-form">
    <div class="fld-info">
      <div class="fld-teams">
        <div class="fld-teams-labels">
          <div class="fld-teams-labels-name fld-teams-labels-teamName">
            Times
          </div>
          <div class="fld-teams-labels-name fld-teams-labels-category">
            Categoria
          </div>
        </div>
        <FairLineFormTeams
          teamAlias="mandante"
          :match="match"
          :category="getCategory(match.hometeam_id || match.homeTeam_id)"
        />
        <FairLineFormTeams
          teamAlias="visitante"
          :match="match"
          :category="getCategory(match.awayteam_id || match.awayTeam_id)"
        />
      </div>

      <FairLineFormInitial :fairLine="fairLine" />
      <FairLineFormAssessment />
    </div>

    <div class="fld-info-stats">
      <FairLineFormStats
        :fairLine="fairLine"
        :league="match.league"
        @updateFairLine="updateFairLine"
      />
    </div>
  </div>
</template>

<script>
import FairLineFormTeams from "./FairLineFormTeams";
import FairLineFormInitial from "./FairLineFormInitial";
import FairLineFormAssessment from "./FairLineFormAssessment";
import FairLineFormStats from "./FairLineFormStats";

export default {
  props: ["match", "rankings", "fairLine"],
  components: {
    FairLineFormTeams,
    FairLineFormInitial,
    FairLineFormAssessment,
    FairLineFormStats,
  },
  data() {
    return {
      items: [
        {
          time: "Mandante",
          initialPercent: "48%",
          Odds: "2,08",
        },
        {
          time: "Empate",
          initialPercent: "26%",
          Odds: "3,85",
        },
        {
          time: "Visitante",
          initialPercent: "26%",
          Odds: "3,85",
        },
      ],
    };
  },
  methods: {
    getCategory(team_id) {
      if (team_id && this.rankings.teams) {
        const category = this.rankings.teams.filter(
          (rt) => rt.team_id === team_id
        );

        if (category.length > 0) {
          return category[0].category;
        }
      }
    },

    teste() {
      console.log(this.fairLine);
    },
    updateFairLine(fairLine) {
      this.$emit("updateFairLine", fairLine);
    },
  },
};
</script>

<style>
.fair-line-form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.fld-teams-labels {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.fld-info {
  width: 32%;
  padding-right: 48px;
  border-right: 1px solid #ccc;
}

.fld-info-stats {
  width: 69.5%;
}

.fld-teams-labels-name {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #aaa;
  font-size: 1.1rem;
}

.fld-teams-labels-teamName {
  width: 67%;
}

.fld-teams-labels-category {
  width: 25%;
}
</style>