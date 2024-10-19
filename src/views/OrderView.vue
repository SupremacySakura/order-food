<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
import { useUserStore } from '@/stores/userStore'
const { _userInfo } = useUserStore()
import { getOrderById } from '@/services/apis/user'
const value = ref('')
const onClickButton = () => { }
const data = ref()
onMounted(async () => {
  if (_userInfo) {
    const res = await getOrderById(_userInfo.id)
    data.value = res.data.data
    console.log(data.value)
  }

})
</script>

<template>
  <div class="orderBox">
    <!-- 搜索 -->
    <div class="search">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" :background="primary_color">
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 订单展示 -->
    <div class="order" v-if="data">
      <div class="orderItem" v-for="item in data" :key="item">
        <div class="item_top">
          <div class="shop_image">
            <img :src="item.shop.coverImage" alt="">
          </div>
          <div class="shop_info">
            <div class="shop_info_top">
              <span class="name">{{ item.shop.name }}</span>
              <span class="status">{{ item.status }}</span>
            </div>
          </div>
        </div>
        <div class="item_middle">
          <div class="menu">
            <div v-for="subItem in item.menu" class="menu_item">
              <img :src="subItem.image" alt="">
              <span>{{ subItem.name }}</span>
            </div>
          </div>
          <div class="menu_info">
            <span class="price">￥{{ item.totalPrice }}</span>
            <span class="count">共{{ item.totalCount }}件</span>
          </div>
        </div>
        <div class="item_bottom">
          <button :style="{backgroundColor:primary_color}">评价</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.orderBox {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;

  .search {
    position: sticky;
    top: 0;
  }

  .order {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .orderItem {
      width: 90%;
      height: 240px;
      padding: 10px;
      margin-top: 10px;
      border-radius: 10px;
      background-color: white;

      .item_top {
        width: 100%;
        height: 50px;
        display: flex;

        .shop_image {
          width: 50px;
          height: 50px;
          margin-right: 10px;

          img {
            width: 100%;
          }
        }

        .shop_info {
          flex-grow: 1;

          .shop_info_top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .name {
              font-weight: 600;
            }

            .status {
              font-size: 14px;
            }
          }
        }
      }

      .item_middle {
        width: 100%;
        height: 120px;
        display: flex;

        .menu {
          width: 80%;
          display: flex;
          overflow-x: auto;

          &::-webkit-scrollbar {
            display: none;
            /* 隐藏滚动条 */
          }

          .menu_item {
            width: 80px;
            padding: 10px;
            margin-right: 10px;

            span {
              font-size: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            img {
              width: 80px;
              height: 80px;
            }
          }

        }

        .menu_info {
          width: 20%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .price{
            font-size: 14px;
          }
          .count{
            font-size: 12px;
            color: rgb(166.2, 168.6, 173.4);
          }
        }
      }
      .item_bottom{
        width: 100%;
        flex-grow: 1;
        padding: 10px;
        display: flex;
        justify-content: end;
        button{
          width: 60px;
          height: 30px;
          border-radius: 5px;
          border: none;
        }
      }
    }
  }
}
</style>