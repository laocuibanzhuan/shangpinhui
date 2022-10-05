<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in data" :key="index">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="changeCheckedState([item.skuId, item.isChecked ? 0 : 1])"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('jian', item)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler($event.target.value, item, index)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler('jia', item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(item.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @click="checkedAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("cart", ["data"]),
    totalPrice() {
      let total = 0;
      this.data.forEach((value) => {
        if (value.isChecked) {
          total += value.cartPrice * value.skuNum;
        }
      });
      return total;
    },
    totalNum() {
      let total = 0;
      this.data.forEach((value) => {
        total += value.skuNum;
      });
      return total;
    },
    isAllChecked() {
      return this.data.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    handler: throttle(function (key, item, index) {
      switch (key) {
        case "jia":
          this.addToCart(1, item.skuId);
          break;
        case "jian":
          if (item.skuNum >= 1) {
            this.addToCart(-1, item.skuId);
          }
          break;
        default:
          let value = key * 1;
          console.log(value);
          if (isNaN(value) || value < 1) {
            alert("输入了错误的数据");
          } else {
            this.addToCart(value - this.data[index].skuNum, item.skuId);
          }
          break;
      }
    }, 500),
    async addToCart(num, id) {
      let info = [num, parseInt(id)];
      let res = await this.$store.dispatch("detail/addToCart", info);
      if (res) {
        this.$store.dispatch("cart/getCartlist");
      } else {
        alert("错误了，无法修改");
      }
    },
    async deleteGoods(id) {
      let res = await this.$store.dispatch("cart/deleteGoods", id);
      this.$store.dispatch("cart/getCartlist");
    },
    async changeCheckedState(argu) {
      let res = await this.$store.dispatch("cart/changeCheckedState", argu);
      this.$store.dispatch("cart/getCartlist");
    },
    deleteAll() {
      this.data.forEach((item) => {
        if (item.isChecked) {
          this.deleteGoods(item.skuId);
        }
      });
      this.$store.dispatch("cart/getCartlist");
    },
    checkedAll() {
      if (this.data.every((item) => item.isChecked == 1)) {
        this.data.forEach((item) => {
          this.changeCheckedState([item.skuId, 0]);
        });
      } else {
        this.data.forEach((item) => {
          this.changeCheckedState([item.skuId, 1]);
        });
      }
      this.$store.dispatch("cart/getCartlist");
    },
  },
  mounted() {
    this.$store.dispatch("cart/getCartlist");
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 22%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 28%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 45%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 12%;
        }

        .cart-list-con5 {
          width: 13%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
