<template>
  <div class="ranking-info">
    <b-table :items="thinCategories" :fields="fields">
      <template #cell(team_name)="data">
        <div>
          {{ data.value }}
        </div>
      </template>
    </b-table>

    <b-table
      class="ranking-info-signal"
      :items="infoSignal"
      :fields="signalFields"
    >
      <template #cell(team_name)="data">
        <div>
          {{ data.value }}
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  computed: {
    thinCategories() {
      const thinCategories = [];

      for (let index = 0; index < this.categories.length; index++) {
        const category = this.categories[index];

        const letter = category.category.substring(0, 1);

        const existsThinCategory = thinCategories.filter(
          (c) => c.category === letter
        );

        if (
          existsThinCategory.length === 0 &&
          !category.category.includes("+")
        ) {
          thinCategories.push(category);
        }
      }

      return thinCategories;
    },
  },
  data() {
    return {
      fields: [
        {
          key: "category",
          label: "Categoria",
          tdClass: "ranking-info-column",
        },
        {
          key: "description",
          label: "Descrição",
          tdClass: "ranking-info-column",
        },
      ],
      signalFields: [
        {
          key: "signal",
          label: "Sinal",
          tdClass: "ranking-info-column",
        },
        {
          key: "observation",
          label: "Observação",
          tdClass: "ranking-info-column",
        },
      ],
      infoSignal: [
        {
          signal: "+",
          observation: "Melhor ranqueado na categoria",
        },
        {
          signal: "-",
          observation: "Pior ranqueado na categoria",
        },
        {
          signal: "sem sinal",
          observation: "Ranqueado na média da categoria",
        },
      ],
    };
  },
};
</script>

<style>
.ranking-info {
  width: 100%;
}

.ranking-info-column {
  text-align: left;
  font-size: 0.8rem;
}

.ranking-info-signal {
  margin-top: 50px;
}
</style>