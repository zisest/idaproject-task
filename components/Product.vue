<script>
export default {
  props: ['id', 'name', 'description', 'image', 'price'],
  emits: ['deleteProduct'],
}
</script>

<template>
  <div>
    <div>{{ image }}</div>
    <div>
      <div>{{ name }}</div>
      <div>{{ description }}</div>
      <div>{{ price }}</div>
    </div>
    <button @click="$emit('deleteProduct', id)">Delete</button>
  </div>
</template>