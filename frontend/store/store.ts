export const state = () => ({
  drawer: false,
  showFormSignIn: true,
})

export const mutations = {
  toggleNav(state: any) {
    state.drawer = !state.drawer
  },
}