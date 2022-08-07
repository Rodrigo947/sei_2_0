<template>
  <v-app>
    <Header />
    <Nav />
    <v-main class="background-main">
      <v-container fluid fill-height>
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
