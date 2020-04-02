<template>
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item"
      v-for="tab in tabs"
      :key="tab.id"
    >
      <router-link class="nav-link"
          :to="tab.path"
          :active-class="($route.name === 'restaurants') ? 'active' : ''"
        >
        {{tab.title}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import uuid from 'uuid/v4'

export default {
  data () {
    return {
      tabs: [
        { 
          id: uuid(),
          title: '首頁',
          path: '/restaurants'
        },
        {
          id: uuid(),
          title: '最新動態',
          path: '/restaurants/feeds'
        },
        {
          id: uuid(),
          title: 'TOP 10 人氣餐廳',
          path: '/restaurants/top'
        },
        {
          id: uuid(),
          title: '美食達人',
          path: '/users/top'
        }
      ]
    }
  }
}
</script>