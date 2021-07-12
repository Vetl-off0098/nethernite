<template>
  <div class="modal">
    <div class="info">
      {{ info }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'PackageModal',
  props: {
    info: Object
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    background: grey;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .info {
    width: 500px;
    height: 800px;
    background: #fff;
  }
</style>
