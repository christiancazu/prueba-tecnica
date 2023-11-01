import { Module } from 'vuex'
import { State } from '..'
import { axiosInstance } from '../../config'
import { Category } from '../../models'

export interface CategoryState {
}

function state (): CategoryState {
  return {
  }
}

export const categories: Module<CategoryState, State> = {
  namespaced: true,
  state,
  actions: {
    async dispatch_getCategories () {
      try {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)

        })

        return axiosInstance.get<Category[]>('/products/categories')
      } catch (error) {
        return []
      }
    }
  }
}
