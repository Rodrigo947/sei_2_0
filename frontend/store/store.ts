export const state = () => ({
  drawer: true,
})

export const mutations = {
  toggleNav(state: any) {
    state.drawer = !state.drawer
  },
  updateDrawer(state: any, value: boolean) {
    state.drawer = value
  },
}