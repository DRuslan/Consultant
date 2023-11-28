<template>
  <div class="widjet__link">
    <a class="" href="https://kreeble.ru" target="_blank">
      <small>Kreeble</small>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.widjet {
  &__link {
    width: 26px;
    height: 100%;
    display: flex;
    justify-content: center;
    a {
      position: relative;
      width: 26px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      small {
        transform: rotate(-90deg);
        color: #fff;
        font-size: 10px !important;
        @media screen and (max-width: 576px) {
          font-size: 10px !important;
        }
      }
    }
  }
}
</style>