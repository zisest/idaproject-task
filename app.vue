<script>
import { nanoid } from 'nanoid'
import DEFAULT_PRODUCTS from './default-products.json'

export default {
  data() {
    console.log('app -> data()')
    let products = localStorage.getItem('PRODUCTS')
    if (products) {
      try {
        products = JSON.parse(products)
      } catch {
        products = DEFAULT_PRODUCTS
        localStorage.setItem('PRODUCTS', JSON.stringify(products))
      }
    } else {
      products = DEFAULT_PRODUCTS
      localStorage.setItem('PRODUCTS', JSON.stringify(products))
    }

    return {
      products,
    }
  },
  methods: {
    addProduct({ name, description, image, price }) {
      console.log({ name, description, image, price })
      const newProducts = [
        ...this.products,
        { name, description, image, price, id: nanoid() },
      ]
      this.products = newProducts
      localStorage.setItem('PRODUCTS', JSON.stringify(newProducts))
    },
    deleteProduct(id) {
      console.log('del', id)
      const newProducts = this.products.filter((p) => p.id !== id)
      this.products = newProducts
      localStorage.setItem('PRODUCTS', JSON.stringify(newProducts))
    },
  },
}
</script>

<template>
  <div class="app">
    <Form @submit="addProduct" />
    <Products :products="products" @deleteProduct="deleteProduct" />
  </div>
</template>

<style lang="scss" scoped>
.app {
  background: var(--bg-page);
  padding: var(--40pt);
  display: flex;
  gap: var(--16pt);
}
</style>