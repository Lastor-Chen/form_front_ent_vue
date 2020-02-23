<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 回到上一頁 previousPage -->
      <li class="page-item" v-show="previousPage">
        <router-link
          class="page-link"
          :to="{ path: 'restaurants', query: { categoryId, page: previousPage } }"
        >
          <span>&laquo;</span>
        </router-link>
      </li>
      <!-- 頁碼 -->
      <li
        v-for="page in totalPage"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          class="page-link"
          :to="{ name: 'restaurants', query: { categoryId, page } }"
        >
          {{page}}
        </router-link>
      </li>
      <!-- 前往下一頁 nextPage -->
      <li class="page-item" v-show="nextPage">
        <router-link
          class="page-link"
          :to="{ path: 'restaurants', query: { categoryId, page: nextPage } }"
        >
          <span>&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    categoryId: {
      type: Number,
      default: -1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  computed: {
    previousPage () {
      return this.currentPage === 1 ? null : (this.currentPage - 1)
    },
    nextPage () {
      return this.currentPage === this.totalPage ? null : (this.currentPage + 1)
    }
  }
}
</script>