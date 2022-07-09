export const state = () => ({
    recipes: [],
    next: null,
    prev: null
  })
  
  export const mutations = {
    setRecipes(state, recipes) {
      state.recipes = recipes
    },
    setNext(state, next) {
      state.next = next
    },
    setPrevious(state, prev) {
      state.prev = prev
    },
  }
  
  export const actions = {
    async fetch({commit}) {
      const heroes = await this.$axios.$get('/api/recipes/?limit=2')
      commit('setRecipes', heroes.results);
      commit('setNext', heroes.next)
      commit('setPrevious', heroes.previous);
    },
    async filterByHp({commit}, heroes) {
      const filteredHeroes = [...heroes].filter(hero => hero.ingredients.toLowerCase().includes('яблоко'));
      commit('setRecipes', filteredHeroes)
    },
    async fetchAll({commit}) {
      const heroes = await this.$axios.$get('/api/recipes/')
      commit('setRecipes', heroes.results)
      commit('setNext', heroes.next);
      commit('setPrevious', heroes.previous);
    },
    sortByNames({commit}, heroes) {
      const sortedHeroes = [...heroes].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      commit('setRecipes', sortedHeroes);
    },
    async fetchNext({commit}, nextLink) {
      const heroes = await this.$axios.$get('/api/' + nextLink.split('/api/')[1]); 
      commit('setRecipes', heroes.results);
      commit('setNext', heroes.next);
      commit('setPrevious', heroes.previous);
    },
    async fetchPrev({commit}, prevLink) {
      const heroes = await this.$axios.$get('/api/' + prevLink.split('/api/')[1]); 
      commit('setRecipes', heroes.results);
      commit('setNext', heroes.next);
      commit('setPrevious', heroes.previous);
    },
  }
  
  export const getters = {
    recipes: s => {
      console.log('got data')
      return s.recipes
    },
    next: s => s.next,
    prev: s => s.prev
  }
  