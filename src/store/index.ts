import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import { products, ProductState } from './products'

export interface State {
  products: ProductState;
}

export const stateKey: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    products
  },

  plugins: [createPersistedState({ key: 'prueba-tecnica' })]
})
