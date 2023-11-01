import { useStore } from 'vuex'

import { stateKey } from '../../store'

export const useStoreCategories = () => {
  const { dispatch } = useStore(stateKey)

  return {
    dispatch_getCategories: () => dispatch('categories/dispatch_getCategories')
  }
}
