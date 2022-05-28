<script>
import Button from './Button.vue'

function initialState() {
  return {
    name: '',
    description: '',
    image: '',
    price: '',
    validity: {
      name: false,
      description: true,
      image: false,
      price: false,
    },
    dirty: {
      name: false,
      description: false,
      image: false,
      price: false
    },
    isValid: false,
  }
}

export default {
  components: { Button },
  data: initialState,
  watch: {
    validity: {
      handler(val) {
        this.isValid = Object.values(val).every(Boolean)
      },
      deep: true,
    },
  },
  methods: {
    handleValidity(fieldName, isValid) {
      this.validity[fieldName] = isValid
    },
    handleSubmit() {
      const { name, description, image, price } = this
      this.$emit('submit', {
        name,
        description,
        image,
        price: price.replaceAll(' ', ''),
      })

      Object.assign(this.$data, initialState())
    },
  },
  emits: ['submit'],
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" autocomplete="off">
    <TextInput
      :required="true"
      name="name"
      v-model:value="name"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      @validityChange="handleValidity"
      v-model:isDirty="dirty.name"
    />
    <TextInput
      :textarea="true"
      name="description"
      v-model:value="description"
      label="Описание товара"
      placeholder="Введите описание товара"
      @validityChange="handleValidity"
      v-model:isDirty="dirty.description"
    />
    <TextInput
      :required="true"
      v-model:value="image"
      name="image"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      maskType="URL"
      @validityChange="handleValidity"
      v-model:isDirty="dirty.image"
    />
    <TextInput
      :required="true"
      v-model:value="price"
      name="price"
      label="Цена товара"
      placeholder="Введите цену"
      maskType="SPACE_SEPARATED_NUMBER"
      @validityChange="handleValidity"
      v-model:isDirty="dirty.price"
    />
    <Button
      class="submit"
      label="Добавить товар"
      :submit="true"
      :disabled="!isValid"
    />
  </form>
</template>


<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--2pt);
  padding: var(--24pt);
  background: var(--bg-primary);
  border-radius: var(--4pt);
  box-shadow: var(--shadow-card);

  height: fit-content;
}

.submit {
  margin-top: var(--8pt);
}
</style>