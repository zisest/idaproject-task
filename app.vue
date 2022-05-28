<script>
import { nanoid } from 'nanoid'
import DEFAULT_PRODUCTS from './default-products.json'

export default {
  mounted() {
    this.products = this.getProducts()
  },
  data() {
    console.log('app -> data()')

    return {
      products: [],
    }
  },
  methods: {
    getProducts() {
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
      return products
    },
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
    <div class="left-section">
      <h1>Добавление товара</h1>
      <Form @submit="addProduct" />
    </div>
    <div class="products">
      <Products :products="products" @deleteProduct="deleteProduct" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';

.app {
  background: var(--bg-page);
  padding: var(--24pt) var(--32pt);
  display: flex;
  gap: var(--16pt);
  justify-content: space-evenly;

  min-height: 100%;

  flex-direction: column;

  @media (min-width: $break-md) {
    flex-direction: row;
  }
}

h1 {
  line-height: var(--36pt);
  font-size: var(--28pt);
  font-weight: 600;
  white-space: nowrap;
}
.form {
  position: sticky;
  top: var(--24pt);

}
.left-section {
  display: flex;
  flex-direction: column;
  gap: var(--16pt);

  flex-basis: 50%;
  @media (min-width: $break-lg) {
    max-width: var(--332pt);
  }
}
.products {
  flex-basis: 75%;
}
</style>