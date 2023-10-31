import { computed } from 'vue'
import { useStore } from 'vuex'

import { Product } from '../../models'
import { stateKey } from '../../store'

export const useStoreProducts = () => {
  const { state, commit } = useStore(stateKey)

  return {
    products: computed<Product[]>(() => state.products.products),

    ADD_PRODUCT: (product: Product) => commit(`products/ADD_PRODUCT`, product)
  }
}
