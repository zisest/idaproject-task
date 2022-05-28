<script>
import Button from './Button.vue'
export default {
  components: { Button },
  data() {
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
      isValid: false,
    }
  },
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
    },
  },
  emits: ['submit'],
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <TextInput
      :required="true"
      name="name"
      v-model:value="name"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      @validityChange="handleValidity"
    />
    <!-- TODO: add maxLength to the description field -->
    <TextInput
      :textarea="true"
      name="description"
      v-model:value="description"
      label="Описание товара"
      placeholder="Введите описание товара"
      @validityChange="handleValidity"
    />
    <TextInput
      :required="true"
      v-model:value="image"
      name="image"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      @validityChange="handleValidity"
    />
    <TextInput
      :required="true"
      v-model:value="price"
      name="price"
      label="Цена товара"
      placeholder="Введите цену"
      maskType="SPACE_SEPARATED_NUMBER"
      @validityChange="handleValidity"
    />
    <Button class="submit" label="Добавить товар" :submit="true" :disabled="!isValid" />
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

  flex-basis: 25%;
  height: fit-content;
}

.submit {
  margin-top: var(--8pt);
}
</style>