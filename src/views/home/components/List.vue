<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div class="header-logo">
        <img src="~images/logo.png" alt="极光图标编辑工具">
      </div>
      <div class="header-title">beta</div>
      <div class="header-search">
        <a-input placeholder="请输入内容" v-model="searchValue" @input="searchChange">
          <a-icon slot="prefix" type="search" />
          <a-icon v-if="searchValue" slot="suffix" type="close-circle" @click="searchValueClear" />
        </a-input>
      </div>
    </div>
    <div class="list-main">
      <div
        class="main-item"
        v-for="item of list"
        :key="item.name"
        :title="item.name"
        v-html="item.toSvg()"
        :class="{selected: selected === item.name}"
        @click="selectedChange(item)"
      ></div>
    </div>
  </div>
</template>

<script>
import { icons } from 'feather-icons'

export default {
  name: 'HomeList',
  data () {
    return {
      searchValue: '',
      selected: '',
      list: [],
      timer: null
    }
  },
  props: {
    svg: String
  },
  methods: {
    selectedChange (item) {
      if (this.selected === item.name) {
        return false
      }
      this.selected = item.name
      this.$emit('change', {
        name: this.selected,
        svg: item.toSvg()
      })
    },
    searchChange (e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const key = e.target.value.toLowerCase().trim()
        if (!key) {
          this.list = Object.values(icons)
        } else {
          this.list = Object.values(icons).filter((d) => d.name.includes(key))
        }
      }, 16)
    },
    searchValueClear () {
      this.searchValue = ''
      this.list = Object.values(icons)
    }
  },
  mounted () {
    this.selected = Object.keys(icons)[0]
    this.list = Object.values(icons)
    this.$emit('change', {
      name: this.selected,
      svg: icons[this.selected].toSvg()
    })
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 24px;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px;
    .header-logo {
      margin-right: 16px;
      height: 24px;
      width: 24px;
      > img {
        display: block;
        width: 100%;
      }
    }
    .header-title {
      margin-right: 16px;
      font-size: 16px;
      font-weight: bold;
    }
    .header-search {
      width: 100%;
      ::v-deep .ant-input-suffix>i {
        cursor: pointer;
        color: #ccc;
      }
    }
  }
  .list-main {
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 24px 24px 18px 24px;
    max-height: calc(100vh - 60px);
    .main-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      margin: 6px 12px 6px 0px;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;
      &:hover, &.selected {
        transform: scale(1.04);
        transition: all 0.15s ease-out 0s;
      }
      &:hover {
        border-color: rgba(0, 0, 0, 0.1);
      }
      &.selected {
        background-color: rgb(243, 249, 253);
        border-color: rgb(112, 189, 251);
      }
    }
  }
}
</style>
