<template>
<div align="center">
    <br>
    <router-link to="/"></router-link>
    <router-view/>
      </div>
    <br><br>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

body {
  background-color: #ffffff;
}

nav {
  padding: 10px;
  background-color: #ffffff;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #ffffff;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
