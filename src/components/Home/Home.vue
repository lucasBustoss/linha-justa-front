<template>
  <div class="home">
    <router-link to="ranking" class="home-link">Power Ranking</router-link>
    <router-link to="leagues" class="home-link">Leagues</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.home-link {
  display: flex;
  color: #757575;
  width: 30%;
  justify-content: center;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 7px;
  transition: background 0.3s, color 0.2s;
}

.home-link:hover {
  background: #aaa;
  color: #eee;
}
</style>