<template>
  <div class="container py-5">
    <NavTabs v-if="useNavTabs" />
    <router-view/>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'

export default {
  components: {
    NavTabs
  },
  data() {
    return {
      useNavTabs: true
    }
  },
  created() {
    // detail 頁，不使用 NavTabs
    const { id } = this.$route.params
    if (id) { this.useNavTabs = false }
  },
  beforeRouteUpdate(to, form, next) {
    // detail 頁，不使用 NavTabs
    const { id } = to.params
    if (id) { this.useNavTabs = false }
    else { this.useNavTabs = true }

    next()
  }
}

</script>

