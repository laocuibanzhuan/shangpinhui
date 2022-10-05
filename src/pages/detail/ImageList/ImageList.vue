<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img
          :src="item.imgUrl"
          @click="selectPic(index)"
          :class="{ active: current == index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      current: 0,
    };
  },
  props: ["skuImageList"],
  methods: {
    selectPic(index) {
      this.current = index;
      this.$bus.$emit("getPic", index);
    },
  },
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          let mySwiper = new Swiper(document.querySelector(".swiper-container"), {
            slidesPerView: 3,
            autoplay: {
              delay: 3000,
              stopOnLastSlide: true,
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
          };
          mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
          };
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
