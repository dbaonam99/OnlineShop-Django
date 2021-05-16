import axiosAuth from './axiosAuth'

const Brand = {
  // async getList(params) {
  //   return axiosAuth.post('/console/sku-brand/retrieve', {
  //     ...params,
  //   })
  // },
  async createNew(params) {
    return axiosAuth.post('/api/products', {
      ...params,
    })
  },
  // async deleteBrand(id) {
  //   return axiosAuth.post('/console/sku-brand/delete', {
  //     id: id,
  //   })
  // },
  // async editBrand(params) {
  //   return axiosAuth.post('/console/sku-brand/edit', {
  //     ...params,
  //   })
  // },
  // async getById(id) {
  //   return axiosAuth.post('/console/sku-brand/get', {
  //     id: id,
  //   })
  // },
}

export default Brand
