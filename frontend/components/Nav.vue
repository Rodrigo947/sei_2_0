<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    :disable-resize-watcher="disableResizeWatcher"
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
      <v-list-item v-for="item in itens" :key="item.name" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavComponent',
  data() {
    return {
      mini: false,
      drawer: true,
      disableResizeWatcher: false,
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
