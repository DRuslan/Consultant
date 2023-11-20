<template>
  <button type="submit" class="v-submit" :class="active ? 'v-submit_active' : 'v-submit_disabled'">
    <span class="v-submit__text">
      <span class="v-submit__slot mr-2"><slot name="left" /></span>
      <span class="v-submit__slot v-submit__only_icon">
        <slot name="only"></slot>
      </span>
      <span v-if="$slots.default" class="truncate"><slot /></span>
      <span class="v-submit__slot ml-2"><slot name="right" /></span>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    color: String,
    background: String,
    active: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: (value) => ["s", "m", "l", "full"].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
.v-submit {
    color: #fff;
    border: none;
    border-radius: 2px;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
  &_active {
    background: #3b6ec7 !important;
  }
  &_disabled {
    opacity: 0.4;
    // cursor: not-allowed;
    background: #5b5b5b;
  }

  &__text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 0 14px;
  }

  &__slot {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // Размеры
  &__size_s {
    width: 40px;
    padding: 0;
    &__only_icon {
      padding: 8px;
    }
    .button__icon {
      width: 16px;
      height: 16px;
    }
  }

  &__size_m {
    height: 40px;
    &__only_icon {
      padding: 12px;
    }
    .button__icon {
      width: 24px;
      height: 24px;
    }
  }

  &__size_l {
    height: 40px;
    width: 100%;
    text-transform: none;
    @media screen and (max-width: 768px) {
      height: 60px;
      width: initial;
      text-transform: uppercase;
      .truncate {
        font-size: 16px;
      }
      &__only_icon {
        padding: 18px;
      }
      .button__icon {
        width: 28px;
        height: 28px;
      }
    }
  }

  &__size_full {
    width: 100%;
    height: 100%;
  }
}

.mr-2 {
  margin-right: 8px;
}

.ml-2 {
  margin-left: 4px;
}
</style>