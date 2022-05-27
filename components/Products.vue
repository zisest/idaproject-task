<script>
const SORTING_FUNCTIONS = {
  DEFAULT: null,
  ALPHABET: (a, b) => a.name.localeCompare(b.name),
  PRICE_ASC: (a, b) => a.price - b.price,
  PRICE_DESC: (a, b) => b.price - a.price,
}

export default {
  props: ['products'],
  data() {
    return {
      order: 'DEFAULT',
    }
  },
  computed: {
    sortedProducts() {
      const sortingFunction = SORTING_FUNCTIONS[this.order]
      if (!sortingFunction) return this.products
      return this.products.sort(sortingFunction)
    },
  },
  emits: ['deleteProduct'],
}
</script>

<template>
  <div>
    {{ order }}
    <select v-model="order">
      <option value="DEFAULT">По умолчанию</option>
      <option value="ALPHABET">По алфавиту</option>
      <option value="PRICE_ASC">По возрастанию цены</option>
      <option value="PRICE_DESC">По убыванию цены</option>
    </select>
    <Product
      v-for="product in sortedProducts"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :description="product.description"
      :image="product.image"
      :price="product.price"
      @deleteProduct="$emit('deleteProduct', $event)"
    />
  </div>
</template>