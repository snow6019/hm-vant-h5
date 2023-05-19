<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a href="javascript:;">推荐</a>
      <a href="javascript:;">最新</a>
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <article-item v-for="item in list" :key="item.id" :item="item"></article-item>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'article-page',
  data () {
    return {
      list: [],
      current: 1,
      sorter: 'weight_desc',
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      this.current++
      const res = await this.$axios({
        url: '/interview/query',
        params: {
          current: this.current,
          sorter: this.sorter
        }
      })
      this.list.push(...res.data.rows)
      this.loading = false
      if (this.current === res.data.pageTotal) {
        this.finished = true
      }
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await this.$axios({
      url: '/interview/query',
      params: {
        current: this.current,
        sorter: this.sorter
      }
    })
    this.list = res.data.rows
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
