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
            @keypress.enter="doSearch"
          />

          <v-btn
            class="mx-2"
            fab
            dark
            large
            color="cyan"
            @click="doSearch"
          >
            <v-icon dark>
              mdi-magnify
            </v-icon>
          </v-btn>
        </div>

        <div class="popular" v-if="arr.length === 0 && popular.length > 0">
          <PackageCard
            v-for="(card, index) in popular"
            :key="card.hits + index"
            :packageName="card.name"
            :packageType="card.type"
            :packageHits="card.hits"
            :isVisible="false"
          />
        </div>

        <div class="packageVersions" v-else-if="arr.length !== 0">
          <PackageCard
            v-for="(vers, index) in arr"
            :key="index"
            :packageName="vers"
            :packageType="name"
            :isVisible="true"
          />
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
      arr: [],
      name: ''
    }
  },
  computed: {
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
    async doSearch () {
      if (this.search.length === 0) {
        this.arr = []
        return
      }

      this.name = this.search.toLowerCase()
      const validString = encodeURIComponent(this.name)

      await this.$store.dispatch('fetchPackage', validString)
      this.arr = this.$store.state.package.versions

      this.search = ''
      document.querySelector('input').blur()
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
    margin: 25px auto;
    &__input {
      width: 100%;
    }
  }
  .popular, .packageVersions {
    max-width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 2rem;
  }
</style>
