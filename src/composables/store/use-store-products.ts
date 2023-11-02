import { computed } from 'vue'
import { useStore } from 'vuex'

import { Order, Product } from '../../models'
import { stateKey } from '../../store'

export const useStoreProducts = () => {
  const { state, dispatch, commit } = useStore(stateKey)

  return {
    products: computed<Product[]>(() => state.products.products),

    myOrders: computed<Order[]>(() => state.products.myOrders),

    dispatch_getProducts: (category: string) => dispatch('products/dispatch_getProducts', category),

    SET_VIEW_MORE: ({ id, value }: {id: number, value: boolean}) => commit(`products/SET_VIEW_MORE`, { id, value }),

    ADD_ORDER: (order: Order) => commit(`products/ADD_ORDER`, order),

    MODIFY_ORDER: ({ order, amount }: { order: Order, amount: number }) => commit('products/MODIFY_ORDER', { order, amount }),

    REMOVE_ORDER: (id: string) => commit(`products/REMOVE_ORDER`, id),

    REMOVE_ORDERS: () => commit(`products/REMOVE_ORDERS`)
  }
}
