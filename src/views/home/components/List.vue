<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div class="header-logo">
        <img src="~images/logo.png" alt="极光图标编辑工具">
      </div>
      <div class="header-search">
        <a-input placeholder="请输入内容" v-model="searchValue">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
    </div>
    <div class="list-main">
      <div class="main-block" v-for="(block, i) of list" :key="i">
        <div class="block-title">{{block.title}}</div>
        <div class="block-content">
          <div
            class="content-item"
            v-for="(item, ii) of block.children"
            :key="i + '_' + ii"
            v-html="item"
            :class="{selected: selected === (i + '_' + ii)}"
            @click="selectedChange(item, i + '_' + ii)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeList',
  data () {
    return {
      searchValue: '',
      selected: '0_0',
      list: [
        {
          title: 'Arrows',
          children: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M5 12l7-7 7 7"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"></path></svg>'
          ]
        },
        {
          title: 'Interface',
          children: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
          ]
        }
      ]
    }
  },
  props: {
    svg: String
  },
  methods: {
    selectedChange (item, selected) {
      if (this.selected === selected) {
        return false
      }
      this.selected = selected
      this.$emit('change', item)
    }
  },
  mounted () {
    const index = this.selected.split('_')
    const defaultSvg = this.list[index[0]].children[index[1]]
    this.$emit('change', defaultSvg)
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
    .header-search {
      width: 100%;
    }
  }
  .list-main {
    overflow-y: auto;
    padding: 24px;
    .main-block {
      margin-bottom: 40px;
      .block-title {
        font-size: 14px;
        color: rgb(102, 102, 102);
        margin-bottom: 10px;
      }
      .block-content {
        display: flex;
        flex-wrap: wrap;
        .content-item {
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
  }
}
</style>
