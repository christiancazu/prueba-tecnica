import { Module } from 'vuex'
import { Product } from '../../models'
import { State } from '..'
import { axiosInstance } from '../../config'

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

  actions: {
    async dispatch_getProducts ({ state }, category: string) {
      try {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })

        const prefixRequest = ['', 'All'].some(o => o === category)

        const { data } = await axiosInstance.get<{data: Product[]}>(`/products/${prefixRequest ? '' : 'category/' + category}`)
        state.products = data

        return data
      } catch (error) {

      }
    }
  },

  mutations: {
    ['ADD_PRODUCT'] (state: ProductState, product: Product) {
      state.products.push(product)
    }
  }
}
