import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'
let useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr: <any>[],
      c1Id: '',
    }
  },
  actions: {
    async getC1() {
      let result = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
