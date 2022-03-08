<template>
  <header class="menu-header">
    <h1 class="menu-title">
      <b-sidebar
        id="sidebar-backdrop"
        title="Linha justa"
        bg-variant="dark"
        text-variant="light"
        header-class="sidebar-header"
        backdrop
        shadow
      >
        <hr />
        <router-link to="/">
          <div class="sidebar-option">Home</div>
        </router-link>
        <router-link to="/ranking">
          <div class="sidebar-option">Power Ranking</div>
        </router-link>
        <router-link to="/lines">
          <div class="sidebar-option">Linha justa</div>
        </router-link>
        <router-link to="/matches">
          <div class="sidebar-option">Próximos jogos</div>
        </router-link>
      </b-sidebar>
    </h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      toggleCollapse: false,
    };
  },
  methods: {
    toggleCollapseIcon() {
      this.toggleCollapse = !this.toggleCollapse;
    },
  },
};
</script>

<style>
.sidebar-header {
  padding: 15px !important;
  margin: 5px 0px;
}

.sidebar-header > button,
.sidebar-header > button > svg {
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}

.sidebar-header > button {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

.sidebar-option {
  font-size: 0.6em;
  padding: 15px;
  color: #ddd;
  transition: 0.5s all;
}

.sidebar-option:hover {
  background: #414141;
}
</style>