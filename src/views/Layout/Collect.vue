<template>
  <div class="collect-page">
    <van-nav-bar fixed title="我的收藏" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <article-item
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></article-item>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'collect-page',
  data () {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      this.page++
      const res = await this.$axios({
        url: '/interview/opt/list',
        params: {
          page: this.page,
          optType: 2
        }
      })
      this.list.push(...res.data.rows)
      this.loading = false
      if (this.page >= res.data.pageTotal) {
        this.finished = true
      }
    },
    async init () {
      console.log('init===>' + this.page)
      const res = await this.$axios({
        url: '/interview/opt/list',
        params: {
          page: this.page,
          optType: 2
        }
      })
      this.list = res.data.rows
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
