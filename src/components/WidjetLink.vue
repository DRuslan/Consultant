<template>
  <div class="widjet__link">
    <a class="" href="#">
      <p>Krible</p>
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
      p {
        transform: rotate(-90deg);
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>