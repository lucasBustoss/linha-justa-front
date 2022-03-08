<template>
  <div class="fair-line-data">
    <div class="fld-button-option">
      <b-button
        class="fld-button-edit"
        v-if="!isEditable"
        variant="dark"
        @click="edit"
        >Editar</b-button
      >
      <b-button class="fld-button-save" variant="success" v-else @click="save()"
        >Salvar</b-button
      >
    </div>
    <b-table
      striped
      hover
      :items="fairLines"
      :fields="fields"
      class="fld-table"
    >
      <template #cell(teamSeparator)=""> x </template>
      <template #cell(homeAH)="data">
        <div v-if="!fieldIsEditable(data.item)">
          {{ data.value }}
        </div>
        <div class="fld-offerodd-table-input" v-else>
          <b-form-input
            type="number"
            v-model="fairLines[data.index].homeAH"
          ></b-form-input>
        </div>
      </template>
      <template #cell(awayAH)="data">
        <div v-if="!fieldIsEditable(data.item)">
          {{ data.value }}
        </div>
        <div class="fld-offerodd-table-input" v-else>
          <b-form-input
            type="number"
            v-model="fairLines[data.index].awayAH"
          ></b-form-input>
        </div>
      </template>
      <template #cell(homeOddAH)="data">
        <div v-if="!fieldIsEditable(data.item)">
          {{ data.value }}
        </div>
        <div class="fld-offerodd-table-input" v-else>
          <b-form-input
            type="number"
            v-model="fairLines[data.index].homeOddAH"
          ></b-form-input>
        </div>
      </template>
      <template #cell(awayOddAH)="data">
        <div v-if="!fieldIsEditable(data.item)">
          {{ data.value }}
        </div>
        <div class="fld-offerodd-table-input" v-else>
          <b-form-input
            type="number"
            v-model="fairLines[data.index].awayOddAH"
          ></b-form-input>
        </div>
      </template>
      <template #cell(evHome)="data">
        <div :class="data.value > 0 ? 'evPositive' : 'evNegative'">
          {{ data.value }}{{ data.value ? "%" : "" }}
        </div>
      </template>
      <template #cell(evAway)="data">
        <div :class="data.value > 0 ? 'evPositive' : 'evNegative'">
          {{ data.value }}{{ data.value ? "%" : "" }}
        </div>
      </template>
      <template #cell(buttonAnalyze)="data">
        <b-button
          v-if="!data.item.evHome && !itemHasNoOdds(data.item)"
          variant="info"
          class="fld-data-analyze"
          @click="setMatch(data.item)"
          >Analisar</b-button
        >
        <b-button
          v-if="itemHasNoOdds(data.item)"
          variant="danger"
          class="fld-data-infoodds"
          @click="setMatch(data.item)"
          >Precisa informar odds</b-button
        >
        <b-button
          v-if="data.item.evHome && !itemHasNoOdds(data.item)"
          variant="warning"
          class="fld-data-showAnalyze"
          @click="setMatch(data.item)"
          >Ver análise</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["fairLines"],
  data() {
    return {
      isEditable: false,
      fields: [
        {
          key: "homeTeam_name",
          label: "Home",
          tdClass: "fld-homeTeamName align-middle",
        },
        {
          key: "teamSeparator",
          label: "",
          tdClass: "fld-teamSeparator align-middle",
        },
        {
          key: "awayTeam_name",
          label: "Away",
          thClass: "fld-awayTeamName",
          tdClass: "fld-awayTeamName align-middle",
        },
        {
          key: "homeAdjustedOdd",
          label: "Odd AH Home",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers align-middle",
        },
        {
          key: "awayAdjustedOdd",
          label: "Odd AH Away",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers align-middle",
        },
        {
          key: "homeAH",
          label: "AH Off. Home",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers fld-offerodd align-middle",
        },
        {
          key: "awayAH",
          label: "AH Off. Away",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers fld-offerodd align-middle",
        },
        {
          key: "homeOddAH",
          label: "Odd Off. Home",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers fld-offerodd align-middle",
        },
        {
          key: "awayOddAH",
          label: "Odd Off. Away",
          thClass: "fair-line-data-th",
          tdClass: "fld-numbers fld-offerodd align-middle",
        },
        {
          key: "evHome",
          label: "EV Home",
          thClass: "fair-line-data-th fld-ev",
          tdClass: "fld-numbers align-middle",
        },
        {
          key: "evAway",
          label: "EV Away",
          thClass: "fair-line-data-th fld-ev",
          tdClass: "fld-numbers fld-ev align-middle",
        },
        {
          key: "buttonAnalyze",
          label: "",
        },
      ],
    };
  },
  methods: {
    setMatch(match) {
      this.$emit("setMatch", match);
    },
    fieldIsEditable(item) {
      return (
        this.isEditable &&
        item.oddManually &&
        (item.homeMustWin_score !== 0 ||
          item.homeMisses_score !== 0 ||
          item.awayMustWin_score !== 0 ||
          item.awayMisses_score !== 0)
      );
    },
    itemHasNoOdds(item) {
      return (
        !item.homeAdjustedOdd &&
        (item.homeMustWin_score !== 0 ||
          item.homeMisses_score !== 0 ||
          item.awayMustWin_score !== 0 ||
          item.awayMisses_score !== 0)
      );
    },
    edit() {
      this.isEditable = true;
    },
    save() {
      this.isEditable = false;
      const odds = {
        oddsToInsert: [],
        oddsToDelete: [],
      };

      for (let index = 0; index < this.fairLines.length; index++) {
        const fairLine = this.fairLines[index];

        if (
          fairLine.oddManually &&
          fairLine.homeOddAH &&
          fairLine.awayOddAH &&
          fairLine.homeAH &&
          fairLine.awayAH
        ) {
          const newOdd = {
            fixture_id: fairLine.fixture_id,
            homeLineBase: fairLine.homeAH,
            oddHomeBase: fairLine.homeOddAH,
            awayLineBase: fairLine.awayAH,
            oddAwayBase: fairLine.awayOddAH,
          };

          odds.oddsToInsert.push(newOdd);
        }

        // homeAdjustedOdd indica que é uma fairLine que havia sido calculada já.
        // Ou seja, se for uma fairline calculada e não tiver mais dados, excluo as odds informadas
        if (
          fairLine.homeAdjustedOdd &&
          !fairLine.homeOddAH &&
          !fairLine.awayOddAH &&
          !fairLine.homeAH &&
          !fairLine.awayAH
        ) {
          const newOdd = {
            fixture_id: fairLine.fixture_id,
          };

          odds.oddsToDelete.push(newOdd);
        }
      }

      this.$emit("treatOdds", odds);
    },
  },
};
</script>

<style>
.fair-line-data {
  width: 100%;
}

.fld-button-option {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.fld-button-edit,
.fld-button-save {
  width: 8%;
}

.fld-button-edit:focus,
.fld-button-edit:active {
  border: 1px solid #212529 !important;
  outline: 1px solid #212529 !important;
}

.fld-button-save:focus,
.fld-button-save:active {
  border: 1px solid #198754 !important;
  outline: 1px solid #198754 !important;
}

.fld-table {
  justify-content: center;
  align-content: center;
}

.fair-line-data-th {
  font-size: 0.9rem;
}

.fld-homeTeamCategory {
  width: 6%;
  font-weight: bold;
  text-align: center;
}

.fld-awayTeamCategory {
  width: 6%;
  font-weight: bold;
  text-align: center;
}

.fld-homeTeamName {
  width: 20%;
  text-align: left;
}

.fld-awayTeamName {
  width: 20%;
  text-align: right;
}

.fld-teamSeparator {
  width: 2%;
}

.fld-offerodd {
  width: 6.5%;
  padding: 0;
}

.fld-numbers {
  text-align: right;
  font-weight: bold;
  text-align: center;
}

.evPositive {
  color: green;
  font-weight: bold;
}

.evNegative {
  color: red;
  font-weight: bold;
}

.fld-ev {
  width: 5%;
  text-align: right;
}

.fld-data-analyze,
.fld-data-showAnalyze,
.fld-data-infoodds {
  font-size: 0.8rem;
  text-align: center;
  width: 100%;
}

.fld-data-analyze:focus {
  border: 1px solid #0dcaf0 !important;
  outline: 1px solid #0dcaf0 !important;
}

.fld-data-analyze:active {
  background: #07a7c7;
}

.fld-data-infoodds:focus {
  border: 1px solid #dc3545 !important;
  outline: 1px solid #dc3545 !important;
}

.fld-data-infoodds:active {
  background: #f36574;
}

.fld-data-showAnalyze:focus {
  border: 1px solid #ffc107 !important;
  outline: 1px solid #ffc107 !important;
}

.fld-data-showAnalyze:active {
  background: #d8a303;
}

.fld-offerodd-table-input {
  text-align: right;
  width: 100%;
}

.fld-offerodd-table-input > input {
  padding: 0;
}

.fld-offerodd-table-input:focus {
  outline: none;
  border: 1px solid #ced4da;
  box-shadow: none;
}
</style>