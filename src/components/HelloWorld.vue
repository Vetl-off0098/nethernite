<template>
  <div class="hello">
    <!-- <input type="text" v-model="search"> -->
    <div class="search">
      <v-text-field
        v-model="search"
        label="Package name"
        placeholder="Search..."
        outlined
        dense
        class="search__input"
      ></v-text-field>
      <button @click="doSearch">SEARCH</button>
    </div>
    <div class="popular">
      {{ popular }}
    </div>
    <div class="posts" v-if="arr.length !== 0">
      {{ arr }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
    fetchPosts () {
      this.$store.dispatch('fetchPosts')
    },
    async doSearch () {
      await this.$store.dispatch('fetchPosts', this.search)
      this.arr = this.$store.state.posts
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
  &__input {
    max-width: 400px;
  }
}
</style>
