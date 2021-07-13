<template>
  <v-app>
    <v-main>
      <div class="hello">
        <div class="search">
          <v-text-field
            v-model="search"
            label="Package name"
            placeholder="Search..."
            outlined
            dense
            class="search__input"
          />

          <button @click="doSearch">SEARCH</button>
        </div>

        <div class="popular" v-if="arr.length === 0 && popular.length > 0">
          <PackageCard
            v-for="(card, index) in popular"
            :key="card.hits + index"
            :packageName="card.name"
            :packageType="card.type"
            :packageHits="card.hits"
          />
        </div>

        <div class="posts" v-else-if="arr.length !== 0">
          {{ arr }}
        </div>

        <div class="wait" v-else>Please wait...</div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PackageCard from '@/components/PackageCard'

export default {
  name: 'App',
  components: {
    PackageCard
  },
  data () {
    return {
      search: '',
      arr: []
    }
  },
  computed: {
    posts () {
      return this.$store.getters.getPosts
    },
    popular () {
      return this.$store.getters.getPopular
    }
  },
  mounted () {
    this.fetchPopular()
  },
  methods: {
    fetchPopular () {
      this.$store.dispatch('fetchPopular')
    },
    // fetchPosts () {
    //   this.$store.dispatch('fetchPosts')
    // },
    async doSearch () {
      await this.$store.dispatch('fetchPosts', this.search)
      this.arr = this.$store.state.posts
    }
  }
}
</script>

<style lang="scss" scoped>
  .wait {
    color: #0b83ff;
    font-size: 24px;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search {
    max-width: 344px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25px auto 0;
    &__input {
      width: 100%;
    }
  }
  .popular {
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 2rem;
  }
</style>
