import { Module } from 'vuex'
import { Order, Product } from '../../models'
import { State } from '..'
import { axiosInstance } from '../../config'

export interface ProductState {
  products: Product[],
  myOrders: Order[],
}

function state (): ProductState {
  return {
    products: [],
    myOrders: []
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
    ['SET_VIEW_MORE'] (state: ProductState, { id, value }: {id: number, value: boolean}) {
      const product = state.products.find(product => product.id === id)

      if (product) {
        product.viewMore = value
      }
    },

    ['ADD_ORDER'] (state: ProductState, order: Order) {
      state.myOrders.push(order)
    }
  }
}
