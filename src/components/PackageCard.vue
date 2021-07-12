<template>
  <div class="cardWrap">
    <v-card
      class="mx-auto packageCard"
      max-width="344"
    >
      <v-card-text>
        <div class="text-h4 text--primary packageName">{{ packageName }}</div>
        <p class="packageType">{{ packageType }}</p>
        <div class="text--primary packageHits">{{ packageHits }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
          @click="fetchInfo"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
    <PackageModal
      v-if="modalIsOpen"
      :info="packageInfo"
    />
  </div>
</template>

<script>
import PackageModal from '@/components/modals/PackageModal'

export default {
  name: 'PackageCard',
  props: {
    packageName: String,
    packageType: String,
    packageHits: Number
  },
  components: {
    PackageModal
  },
  data () {
    return {
      packageInfo: {},
      modalIsOpen: false
    }
  },
  methods: {
    async fetchInfo () {
      await this.$store.dispatch('fetchInfo', `${this.packageType}/${this.packageName}`)
      this.packageInfo = this.$store.state.info
      this.modalIsOpen = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .packageCard {
    width: 344px;
    height: 225px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 15px 15px 70px rgba(61, 76, 106, 0.1) !important;
    border-radius: 12px !important;
    & > .packageName {
      color: #3D4C6A !important;
      height: 80px;
    }
  }
</style>
