<template>
  <div class="pagination">
    <button @click="before">上一页</button>
    <button
      :class="{ active: pageChange == 1 }"
      v-if="pageList[0] != 1"
      @click="pageChange = 1"
    >
      1
    </button>
    <button v-if="pageChange > 4 && pageSum > 6">···</button>
    <button
      :class="{ active: pageChange == item }"
      v-for="(item, index) in pageList"
      :key="index"
      @click="pageChange = item"
    >
      {{ item }}
    </button>
    <button v-if="pageChange < pageSum - 2 && pageSum > 5">···</button>
    <button @click="next">下一页</button>
    <button style="margin-left: 30px" @click="pageChange = pageSum">
      共 {{ pageSum }} 条
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageSum: {
      default: undefined,
    },
    pageNow: {
      type: Number,
    },
  },

  data() {
    return {
      pageChange: this.pageNow,
      pageList: [],
    };
  },
  methods: {
    before() {
      if (this.pageChange >= 2) {
        this.pageChange -= 1;
      }
    },
    next() {
      if (this.pageChange <= this.pageSum - 1) {
        this.pageChange += 1;
      }
    },
  },
  watch: {
    pageChange: {
      immediate: true,
      handler(newvalue) {
        this.$emit("getPage", this.pageChange);
        if (newvalue < 3) {
          this.pageList = [];
          newvalue = 1;
          let count = 1;
          do {
            if (newvalue <= this.pageSum) {
              this.pageList.push(newvalue);
              newvalue += 1;
            }
            count += 1;
          } while (count < 6);
        } else if (newvalue >= 3 && newvalue <= this.pageSum - 2) {
          this.pageList = [
            newvalue - 2,
            newvalue - 1,
            newvalue,
            newvalue + 1,
            newvalue + 2,
          ];
        } else {
          this.pageList = [];
          newvalue = this.pageSum;
          let count = 5;
          do {
            if (newvalue >= 1) {
              this.pageList.unshift(newvalue);
              newvalue -= 1;
            }
            count -= 1;
          } while (count > 0);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
