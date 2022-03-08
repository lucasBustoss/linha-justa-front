<template>
  <div class="fair-line">
    <h1>Linhas justas</h1>

    <hr />

    <FairLineData
      v-if="!match"
      :fairLines="fairLines"
      @setMatch="setMatch"
      @treatOdds="treatOdds"
    />
    <FairLineForm
      v-if="match && fairLine"
      :match="match"
      :rankings="rankings"
      :fairLine="fairLine"
      @updateFairLine="updateFairLine"
    />
  </div>
</template>

<script>
import api from "@/config/api";

import FairLineData from "./FairLineData/FairLineData.vue";
import FairLineForm from "./FairLineForm/FairLineForm.vue";

export default {
  props: ["selectedMatch"],
  components: { FairLineData, FairLineForm },
  data() {
    return {
      rankings: [],
      fairLine: null,
      fairLines: [],
      match: null,
    };
  },
  methods: {
    async getRankings() {
      try {
        const response = await api.get("/rankings", {
          params: {
            league_id: this.match.league_id,
          },
        });

        if (response && response.data) {
          this.rankings = response.data;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getFairLine() {
      try {
        let fixture_id;

        if (this.match) {
          if (this.selectedMatch) {
            fixture_id = this.match.id;
          } else {
            fixture_id = this.match.fixture_id;
          }
        } else {
          fixture_id = null;
        }

        const response = await api.get("/fairlines", {
          params: {
            fixture_id,
          },
        });

        if (response && response.data) {
          if (this.match) {
            this.fairLine = response.data;
          } else {
            this.fairLines = response.data;
          }
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async treatOdds(odds) {
      await this.insertOdds(odds.oddsToInsert);
      await this.deleteOdds(odds.oddsToDelete);

      await this.getFairLine();
    },
    async insertOdds(odds) {
      await api.post("/odds", {
        odds,
      });
    },
    async deleteOdds(odds) {
      await api.delete("/odds", {
        data: { odds },
      });
    },
    async updateFairLine(fairLine) {
      try {
        let fixture_id;

        if (this.match) {
          if (this.selectedMatch) {
            fixture_id = this.match.id;
          } else {
            fixture_id = this.match.fixture_id;
          }
        } else {
          fixture_id = null;
        }

        fairLine.fixture_id = fixture_id;
        const response = await api.patch("/fairlines", fairLine);

        if (response && response.data) {
          this.fairLine = response.data;
        }
      } catch (err) {
        console.log("deu erro");
        console.log(err);
        return;
      }
    },
    async setMatch(match) {
      this.match = match;

      await this.getRankings();
      await this.getFairLine();
    },
  },
  async mounted() {
    if (this.selectedMatch) {
      this.match = this.selectedMatch;
      await this.getRankings();
      await this.getFairLine();
    } else {
      await this.getFairLine();
    }
  },
};
</script>

<style>
.fair-line {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
</style>