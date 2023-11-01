import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { products, ProductState } from './products'
import { categories, CategoryState } from './categories'

export interface State {
  products: ProductState;
  categories: CategoryState;
}

export const stateKey: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    products,
    categories
  },

  plugins: [createPersistedState({ key: 'prueba-tecnica' })]
})
