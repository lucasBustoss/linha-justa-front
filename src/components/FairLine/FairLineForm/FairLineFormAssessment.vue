<template>
  <div class="fld-initialOdds">
    <h4>Notas</h4>
    <hr />
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          "Notas dos Fatores": 0,
          Influência: "Nula",
        },
        {
          "Notas dos Fatores": 1,
          Influência: "Baixa",
        },
        {
          "Notas dos Fatores": 2,
          Influência: "Média",
        },
        {
          "Notas dos Fatores": 3,
          Influência: "Alta",
        },
      ],
    };
  },
};
</script>

<style>
.fld-Assessment {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 7px;
}
</style>