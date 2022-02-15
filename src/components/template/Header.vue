<template>
  <header class="header">
    <div class="header-container container-link">
      <a v-b-toggle.sidebar-backdrop class="container-link-icon">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div class="header-container container-title">
      <h1 class="title">Linha justa</h1>
    </div>
    <div class="header-container container-usermenu"></div>
  </header>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
  background: #2a2a2a;
  color: white;
}
.header-container {
  display: flex;
  width: 33%;
  height: 60px;
  align-items: center;
  padding: 0 40px;
}
.container-link-icon {
  cursor: pointer;
  transition: 0.3s all;
  color: white;
}
.container-link-icon:hover {
  color: rgba(255, 255, 255, 0.6);
}
.container-title {
  justify-content: center;
}
.container-usermenu {
  justify-content: flex-end;
}
</style>