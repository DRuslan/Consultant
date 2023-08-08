<template>
  <div
    class="icon"
    :class="[
      { icon__size_s: size === 's' },
      { icon__size_m: size === 'm' },
      { icon__size_l: size === 'l' },
      { icon__size_xl: size === 'xl' },
    ]"
    v-html="getPath"
  >
    </div>
</template>
  
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => ["phone", "mail", "geo"].includes(value),
    },
    size: {
      type: String,
      required: true,
      validator: (value) => ["s", "m", "l", "xl"].includes(value),
    },
  },
  computed: {
    getPath () {
        return require(`@/icons/${this.name}.svg?raw`)
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  flex: none;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  &__size {
    &_s {
      width: 16px;
      height: 16px;
    }
    &_m {
      width: 20px;
      height: 20px;
    }
    &_l {
      width: 24px;
      height: 24px;
    }
    &_xl {
      width: 32px;
      height: 32px;
    }
  }
}
</style>