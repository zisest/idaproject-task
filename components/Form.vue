<script>
export default {
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
      const { name, description, link, price } = this
    },
  },
}
</script>

<template>
  <div>is form valid: {{ isValid }}</div>
  <div>{{ { name, description, link, price } }}</div>
  <form @submit.prevent="handleSubmit">
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
    <input type="submit" value="Добавить товар" :disabled="!isValid" />
  </form>
</template>


<style lang="scss" scoped>
</style>