import { computed } from 'vue'
import { useStore } from 'vuex'

import { Product } from '../../models'
import { stateKey } from '../../store'

export const useStoreProducts = () => {
  const { state, dispatch, commit } = useStore(stateKey)

  return {
    products: computed<Product[]>(() => state.products.products),

    dispatch_getProducts: (category: string) => dispatch('products/dispatch_getProducts', category),

    ADD_PRODUCT: (product: Product) => commit(`products/ADD_PRODUCT`, product)
  }
}
