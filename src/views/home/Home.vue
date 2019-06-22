<template>
  <div class="home-wrapper">
    <home-list
      class="home-list"
      @change="listChange"
    ></home-list>
    <home-operate
      class="home-operate"
      :svg="svg"
    ></home-operate>
  </div>
</template>

<script>
import HomeList from './components/List'
import HomeOperate from './components/Operate'

export default {
  name: 'Home',
  components: {
    HomeList,
    HomeOperate
  },
  data () {
    return {
      svg: {}
    }
  },
  methods: {
    listChange (svg) {
      this.svg = svg
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  .home-list {
    flex: 1;
    width: 100%;
    min-height: 100vh;
    border-right: 1px solid rgb(238, 238, 238);
  }
  .home-operate {
    flex-shrink: 0;
    width: 420px;
    min-height: 100vh;
  }
}
</style>
<style>
svg {
  display: block;
}
</style>
