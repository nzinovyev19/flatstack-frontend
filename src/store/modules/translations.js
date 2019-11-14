export default {
  namespaced: true,
  state: {
    staticWords: null,
    basicStaticWords: null
  },
  mutations: {
    setStaticWords: (state, words) => {
      state.staticWords = words;
    },
    setBasicStaticWords: (state, words) => {
      state.basicStaticWords = words;
    }
  },
  actions: {
    async fetchStaticWords({ commit, state }) {
      try {
        const { default: listNames } = await import(`@/assets/translations/${localStorage.lang}.json`);
        commit('setStaticWords', listNames);
      } catch (e) {
        const { default: listNames } = await import('@/assets/translations/en.json');
        commit('setStaticWords', listNames);
      }
    },
    async fetchBasicStaticWords({ commit, state }) {
      try {
        const { default: listNames } = await import('@/assets/translations/en.json');
        commit('setBasicStaticWords', listNames);
      } catch (e) {
        console.error(e);
      }
    }
  },
  getters: {
    localized: (state) => (property) => state.staticWords[property] || state.basicStaticWords[property] || '???'
  }
};