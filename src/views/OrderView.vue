<script setup lang="ts">
//导入vue相关api
import { ref, onMounted } from 'vue'
//导入仓库
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
import { useUserStore } from '@/stores/userStore'
const { _userInfo } = useUserStore()
//导入请求相关api
import { getOrderById } from '@/services/apis/user'
//导入图片
import foodPhoto from '../../public/foodPhoto.png'
//导入类型
import { userClass } from '@/class/userClass'
//搜索值
const value = ref('')
/**
 * 搜索
 */
const onClickButton = async () => {
  const res = await getOrderById((_userInfo as userClass).id)
  data.value = res.data.data.reverse()
  console.log(data.value)
  if (value.value !== '' && data.value) {
    data.value = data.value.map((item: any) => {
      const str = item.shop.label.join('') + item.shop.name + item.shop.news + item.shop.other.join('')
      if (str.includes(value.value)) {
        return item
      }
      let menuStr = ''
      item.menu.forEach((subItem: any) => {
        const strItem = subItem.contains + subItem.menu_label.join('') + subItem.name + subItem.type
        menuStr += strItem
      })
      if (menuStr.includes(value.value)) {
        return item
      }
    })
    value.value = ''
  }
  data.value.forEach((item: any) => {
    if (item) {
      return item
    }
  })
  if (data.value.every((item: any) => !item)) {
    data.value = []
  }
}
//订单内容
const data = ref()
onMounted(async () => {
  if (_userInfo) {
    const res = await getOrderById(_userInfo.id)
    data.value = res.data.data.reverse()
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
            <img :src="item?.shop?.coverImage || foodPhoto" alt="">
          </div>
          <div class="shop_info">
            <div class="shop_info_top">
              <span class="name">{{ item?.shop?.name }}</span>
              <span class="status">{{ item?.status }}</span>
            </div>
          </div>
        </div>
        <div class="item_middle">
          <div class="menu">
            <div v-for="subItem in item?.menu" class="menu_item">
              <img :src="subItem?.image || foodPhoto" alt="">
              <span>{{ subItem?.name }}</span>
            </div>
          </div>
          <div class="menu_info">
            <span class="price">￥{{ item?.totalPrice }}</span>
            <span class="count">共{{ item?.totalCount }}件</span>
          </div>
        </div>
        <div class="item_bottom">
          <button :style="{ backgroundColor: primary_color }">评价</button>
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

          .price {
            font-size: 14px;
          }

          .count {
            font-size: 12px;
            color: rgb(166.2, 168.6, 173.4);
          }
        }
      }

      .item_bottom {
        width: 100%;
        flex-grow: 1;
        padding: 10px;
        display: flex;
        justify-content: end;

        button {
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