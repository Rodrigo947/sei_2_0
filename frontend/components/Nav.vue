<template>
  <v-navigation-drawer
    v-model="drawer"
    permanent
    :mini-variant.sync="mini"
    color="white"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-icon>mdi-menu</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>MENU</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-arrow-expand-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <NuxtLink
        v-for="item in itens"
        :key="item.name"
        :to="item.link"
        :value="false"
        class="no-text-decoration"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavComponent',
  data() {
    return {
      mini: false,
      drawer: this.$store.state.drawer,
      itens: this.$store.state.menuItens.itens,
    }
  },
}
</script>

<style scoped>
.no-text-decoration {
  text-decoration: none;
}
</style>
