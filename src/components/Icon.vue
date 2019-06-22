<template>
  <component :is="`icon-${name}`" :size="size"></component>
</template>

<script>
import { icons } from 'feather-icons'

const components = Object.values(icons).reduce(
  (prev, curr) => ({
    ...prev,
    [`icon-${curr.name}`]: {
      props: ['size'],
      render (createElement) {
        return createElement('div', {
          style: { display: 'inline-block' },
          domProps: { innerHTML: curr.toSvg({ width: this.size, height: this.size }) }
        })
      }
    }
  }),
  {}
)

export default {
  props: {
    name: {
      type: String,
      validator: value => {
        return icons.hasOwnProperty(value)
      }
    },
    size: {
      type: Number,
      default: 14
    }
  },
  components
}

export const IconsNameList = Object.keys(icons)
</script>
