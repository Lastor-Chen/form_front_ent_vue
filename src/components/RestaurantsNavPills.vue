<template>
  <ul class="nav nav-pills mb-4">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ path: '/restaurants' }"
      >
        全部
      </router-link>
    </li>

    <li
      v-for="category in categories"
      :key="category.id"
      class="nav-item"
    >
      <router-link
        class="nav-link"
        :to="{ path: '/restaurants', query: { categoryId: category.id } }"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>