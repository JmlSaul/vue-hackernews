<template>
  <div class="item-list-view">
    <div class="item-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="page < maxPage" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <div class="item-list">
      <item
        v-for="item in displayItems"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
import { mapActions } from 'vuex'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  components: {
    Item
  },

  beforeMount () {
    this.loadItems()
  },

  title () {
    return `${capitalizeFirstLetter(this.type)}`
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

  props: ['type'],

  methods: {
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({
        type: this.type
      }).then(() => {
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

.item-list-nav {
	padding: 15px 30px;
	position: fixed;
	text-align: center;
	top: 55px;
	left: 0;
	right: 0;
	z-index: 998;
	box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  background-color: #fff;
}
.item-list-nav a {
	margin: 0 1em;
}
.item-list-nav .disabled {
	color: #ccc;
}

@media (max-width: 600px) {
	.item-list {
		margin: 10px 0;
	}
}
</style>
