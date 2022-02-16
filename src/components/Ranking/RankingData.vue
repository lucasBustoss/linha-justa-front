<template>
  <div class="ranking-data">
    <b-table
      class="ranking-data-table"
      :items="rankingTeams"
      :fields="fields"
      tbody-tr-class="ranking-data-table-row"
    >
      <template #cell(team_name)="data">
        <div class="ranking-data-table-teamname">
          {{ data.value }}
        </div>
      </template>
      <template #cell(category)="data">
        <div v-if="!isEditable">
          {{ data.value }}
        </div>
        <b-form-input
          class="ranking-data-table-input"
          v-else
          v-model="rankingTeams[data.index].category"
        ></b-form-input>
      </template>
      <template #cell(homeadvantage)="data">
        <div v-if="!isEditable">
          {{ data.value }}
        </div>
        <b-form-input
          class="ranking-data-table-input"
          v-else
          type="number"
          v-model="rankingTeams[data.index].homeadvantage"
        ></b-form-input>
      </template>
      <template #cell(form)="data">
        <div v-if="!isEditable">
          {{ data.value }}
        </div>
        <b-form-input
          class="ranking-data-table-input"
          v-else
          type="number"
          v-model="rankingTeams[data.index].form"
        ></b-form-input>
      </template>
      <template #cell(shape)="data">
        <div v-if="!isEditable">
          {{ data.value }}
        </div>
        <b-form-input
          class="ranking-data-table-input"
          v-else
          type="number"
          v-model="rankingTeams[data.index].shape"
        ></b-form-input>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["rankingTeams", "isEditable"],
  data() {
    return {
      category: "",
      fields: [
        {
          key: "team_name",
          label: "Time",
          tdClass: "ranking-data-table-teamname",
        },
        {
          key: "category",
          label: "Categoria",
          thClass: "ranking-data-table-column",
          tdClass: "ranking-data-table-value",
        },
        {
          key: "homeadvantage",
          label: "Mando de campo",
          thClass: "ranking-data-table-column",
          tdClass: "ranking-data-table-value",
        },
        {
          key: "form",
          label: "Forma",
          thClass: "ranking-data-table-column",
          tdClass: "ranking-data-table-value",
        },
        {
          key: "shape",
          label: "Desempenho",
          thClass: "ranking-data-table-column",
          tdClass: "ranking-data-table-value",
        },
      ],
    };
  },
};
</script>

<style>
.ranking-data {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  align-items: left;
}

.ranking-data-table {
  width: 100%;
  justify-content: center;
  align-content: center;
}

.ranking-data-table-teamname {
  width: 40%;
}

.ranking-data-table-column,
.ranking-data-table-value {
  text-align: center;
}

.ranking-data-table-row:hover {
  background: rgba(0, 0, 0, 0.18);
}

.ranking-data-table-input {
  text-align: right;
  padding: 0px 6px;
}

.ranking-data-table-input:focus {
  outline: none;
  border: 1px solid #ced4da;
  box-shadow: none;
}
</style>