<script>
export default {
  props: ['id', 'name', 'description', 'image', 'price'],
  emits: ['deleteProduct'],
  computed: {
    priceString() {
      // if (!this.price) return ''
      return (
        this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
      )
    },
  },
}
</script>

<template>
  <div class="product" tabindex="0">
    <div class="image">
      <img :src="image" :alt="name" />
    </div>
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="description">{{ description }}</div>
      <div class="price">{{ priceString }}</div>
    </div>
    <DeleteButton @click="$emit('deleteProduct', id)" />
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';

.product {
  height: var(--420pt);
  flex-basis: 100%;

  border-radius: var(--4pt);

  position: relative;

  background: var(--bg-primary);
  box-shadow: var(--shadow-card);

  transition: 200ms;

  &:hover,
  &:focus-visible {
    box-shadow: var(--shadow-card-hover);
    outline: none;

    & > .delete {
      opacity: 1;
    }
  }

  @media (min-width: $break-sm) {
    max-width: calc(50% - var(--8pt));
  }
  @media (min-width: $break-lg) {
    max-width: var(--332pt);
  }
}

.image {
  height: 48%;
  border-radius: var(--4pt) var(--4pt) 0 0;
  overflow: hidden;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.info {
  height: 52%;
  padding: var(--16pt);
  padding-bottom: var(--24pt);
}

.name {
  font-size: var(--20pt);
  line-height: var(--24pt);
  font-weight: 600;
  padding-bottom: var(--16pt);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  font-size: var(--16pt);
  height: var(--100pt);
  line-height: var(--20pt);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  margin-bottom: var(--12pt);
}

.price {
  font-weight: 600;
  font-size: var(--24pt);
  line-height: var(--32pt);
}
</style>