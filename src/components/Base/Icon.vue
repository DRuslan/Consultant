<template>
  <div v-if="iconName"
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
    iconName: {
      type: String,
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
      const svgContents = require(`@/icons/${this.iconName}.svg?raw`);
      const modifiedSvgContents = svgContents.replace(
        /<svg/g,
        `<svg class="icon_custom" fill="currentColor"`
      );
      return modifiedSvgContents
      // const convertedObgIcon = JSON.parse(this.name);
      // return require(`@/icons/${JSON.stringify(JSON.stringify(convertedObgIcon))}.svg?raw`)
    }
  }
};
</script>

<style lang="scss">
.icon {
    &_custom {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    svg, path {
      width: inherit;
      height: 100%;
    }
  }
</style>

<style lang="scss" scoped>
.icon {
  flex: none;
  display: inline-block;
  fill: currentColor;
  text-align: center;
  // stroke: currentColor;
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