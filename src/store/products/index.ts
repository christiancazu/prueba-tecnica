import { Module } from 'vuex'
import { Product } from '../../models'
import { State } from '..'

export interface ProductState {
  products: Product[]
}

function state (): ProductState {
  return {
    products: []
  }
}

export const products: Module<ProductState, State> = {
  namespaced: true,
  state,
  mutations: {
    ['ADD_PRODUCT'] (state: ProductState, product: Product) {
      state.products.push(product)
    }
  }
}
