<template>
  <div class="ranking-form-container-category">
    <b-form-group
      id="input-group-2"
      label-class="ranking-form-container-label"
      label-for="input-2"
      class="ranking-form-container-input-check"
    >
      <b-form-checkbox
        id="checkbox-1"
        name="checkbox-1"
        v-model="allowEditCategory"
        @change="changeAllowEdit"
      >
      </b-form-checkbox>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Categoria:"
      label-class="ranking-form-container-label"
      label-for="input-3"
      class="ranking-form-container-input-category"
    >
      <b-form-input id="input-3" :value="categoryValue" disabled></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-4"
      label="Descrição da categoria:"
      label-class="ranking-form-container-label"
      class="ranking-form-container-input-description"
      label-for="input-4"
    >
      <b-form-input
        id="input-4"
        :placeholder="allowEditCategory ? categoryPlaceholder : ''"
        :disabled="!allowEditCategory"
        v-model="categoryDescription"
        @input="changeCategories"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["categoryValue", "categoryPlaceholder", "allowEdit", "categories"],
  data() {
    return {
      allowEditCategory: this.allowEdit,
      categoryDescription: "",
    };
  },
  methods: {
    changeAllowEdit() {
      this.categoryDescription = "";
      this.removeCategoryFromList();
    },
    changeCategories(item) {
      if (item != "") {
        const category = this.categories.filter(
          (c) => c.category === this.categoryValue
        );

        if (category.length > 0) {
          category[0].description = item;
        } else {
          const newCategory = {
            category: this.categoryValue,
            description: item,
          };

          this.categories.push(newCategory);
        }
      } else {
        this.removeCategoryFromList();
      }
    },
    removeCategoryFromList() {
      const category = this.categories.filter(
        (c) => c.category === this.categoryValue
      );

      if (category.length > 0) {
        this.categories.pop(category[0].index);
      }
    },
  },
};
</script>

<style>
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
</style>