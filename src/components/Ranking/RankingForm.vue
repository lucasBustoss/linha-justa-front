<template>
  <div class="ranking-form">
    <b-form @submit="saveRanking" class="ranking-form-container">
      <b-form-group id="input-group-1" label="Campeonato:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="email"
          :value="leagueName"
          disabled
        ></b-form-input>
      </b-form-group>

      <RankingFormCategory
        categoryValue="A"
        categoryPlaceholder="Ex.: Times que brigam pelo título"
        :allowEdit="true"
        :categories="categories"
      />

      <RankingFormCategory
        categoryValue="B"
        categoryPlaceholder="Ex.: Times que lutam pelo G4"
        :allowEdit="false"
        :categories="categories"
      />

      <RankingFormCategory
        categoryValue="C"
        categoryPlaceholder="Ex.: Times que lutam pela vaga indireta no torneio continental"
        :allowEdit="false"
        :categories="categories"
      />

      <RankingFormCategory
        categoryValue="D"
        categoryPlaceholder="Ex.: Times que lutam para não cair"
        :allowEdit="false"
        :categories="categories"
      />

      <RankingFormCategory
        categoryValue="E"
        categoryPlaceholder="Ex.: Times candidatos ao rebaixamento"
        :allowEdit="false"
        :categories="categories"
      />

      <div class="ranking-form-container-button">
        <b-button type="submit" variant="success">Criar</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import RankingFormCategory from "./RankingFormCategory.vue";

export default {
  props: ["leagueName"],
  components: { RankingFormCategory },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    saveRanking() {
      event.preventDefault();
      this.$emit("insertRanking", this.categories);
    },
  },
};
</script>

<style>
.ranking-form {
  width: 40%;
  padding: 50px 30px;
}

.ranking-form-container {
  padding: 30px;
  border: 1px solid #bbb;
  border-radius: 5px;
}

.ranking-form-container > div {
  margin-top: 15px;
}

.ranking-form-container > div > label {
  margin-bottom: 5px;
}

.ranking-form-container-category {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.ranking-form-container-input-check {
  width: 5%;
  margin-top: 22px;
  margin-left: 3px;
}

.ranking-form-container-input-category {
  width: 13%;
}

.ranking-form-container-input-description {
  width: 79%;
}

.ranking-form-container-button {
  display: flex;
  margin-top: 15px;
  justify-content: flex-end;
}
</style>