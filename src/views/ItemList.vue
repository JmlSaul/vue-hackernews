<template>
  <div class="item-list-view">
    <div class="item-list">
      <item v-for="item in displayItems" :key="item.id" :item="item" />
    </div>
    <router-link v-if="page > 1" :to="`/${type}/${page-1}`">&lt; prev</router-link>
    <a v-else>&lt; prev</a>
    <span>{{ page }}/{{ maxPage }}</span>
    <router-link v-if="page < maxPage" :to="`/${type}/${page+1}`">more &gt; </router-link>
    <a v-else>more &gt;</a>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
import { mapActions } from 'vuex'

export default {
  props: ['type'],
  components: {
    Item
  },
  beforeMount () {
    this.loadItems()
  },
  computed: {
    displayItems () {
      return this.$store.getters.displayItems
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return Math.ceil(this.$store.state.items.length / 20)
    }
  },
  methods: {
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({ type: this.type })
        .then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/${this.type}/1`)
            return
          }
          this.$bar.finish()
        })
        .catch(() => {
          this.$bar.fail()
        })
    }
  }
}
</script>

<style>
.item-list-view {
  padding-top: 45px;
}
.item-list {
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
@media (max-width: 600px) {
  .item-list {
    margin: 10px 0;
  }
}
</style>
