<template>
  <v-app>
    <Nav />
    <Header />
    <v-main class="background-main">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
.background-main {
  background-color: #f8f9fe;
}
</style>
