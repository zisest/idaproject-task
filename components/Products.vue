<script>
const SORTING_FUNCTIONS = {
  DEFAULT: {
    fn: null,
    displayName: 'По умолчанию',
  },
  ALPHABET: {
    fn: (a, b) => a.name.localeCompare(b.name),
    displayName: 'По алфавиту',
  },
  PRICE_ASC: {
    fn: (a, b) => a.price - b.price,
    displayName: 'По возрастанию цены',
  },
  PRICE_DESC: {
    fn: (a, b) => b.price - a.price,
    displayName: 'По убыванию цены',
  },
}

const ORDERING_TYPES = {}

export default {
  props: ['products'],
  data() {
    return {
      order: 'DEFAULT',
    }
  },
  computed: {
    sortedProducts() {
      const sortingFunction = SORTING_FUNCTIONS[this.order].fn
      if (!sortingFunction) return this.products
      const sorted = [...this.products].sort(sortingFunction)
      return sorted
    },
    sortingOptions() {
      return Object.entries(SORTING_FUNCTIONS).map(
        ([value, { displayName }]) => ({
          value,
          displayName,
        })
      )
    },
    sortingOrder() {
      return SORTING_FUNCTIONS[this.order].displayName
    },
  },
  emits: ['deleteProduct'],
}
</script>

<template>
  <div>
    <label>
      <span>{{ sortingOrder }}</span>
      <select v-model="order">
        <option
          v-for="option in sortingOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.displayName }}
        </option>
      </select>
    </label>
    <div class="products">
      <TransitionGroup name="products">
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
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
}
.products > div {
  flex-basis: 30%;
}

.products-move,
.products-enter-active,
.products-leave-active {
  transition: all 0.5s ease;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.products-leave-active {
  position: absolute;
}

label {
  display: block;
  width: 10rem;
  height: 2rem;
  border: 1px solid;
  position: relative;
}
select {
  opacity: 0;
  position: absolute;
  inset: 0;
}
</style>