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
      price: false,
    },
    isValid: false,
    recentlySubmitted: false,
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
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async animateSubmitButton() {
      await this.sleep(0)
      this.recentlySubmitted = true
      await this.sleep(2000)
      this.recentlySubmitted = false
    },
    async handleSubmit() {
      const { name, description, image, price } = this
      this.$emit('submit', {
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
        price: price.replaceAll(' ', ''),
      })
      await this.animateSubmitButton()
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
      :class="['submit', { submitted: recentlySubmitted }]"
      :label="recentlySubmitted ? 'Товар добавлен' : 'Добавить товар'"
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
  transition: 800ms;

  &.submitted {
    background: var(--success);
  }
}
</style>