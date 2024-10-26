<script setup lang="ts">
import location from '../../public/location.png'
import foodPhoto from '../../public/foodPhoto.png'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllShop } from '@/services/apis/home'
import { shopCardClass } from '@/class/shopClass'
const router = useRouter()
//导入setting仓库
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
//导入shop仓库
import { useShopStore } from '@/stores/shopStore'
const { _shopList,_setShopList} = useShopStore()
//导入工具
const value = ref('')
const clickSearch = async() => {

    //请求店铺信息
    const res = await getShop()
    if(value.value === ''){
        shopList.value = res.data.data
    }else{
      shopList.value = res.map((e) => {
        if (e.label.join('').includes(value.value) || e.name.includes(value.value) || e.other.join('').includes(value.value)) {
          return e
        }
      })
      value.value = ''
    }
    shopList.value.forEach((item)=>{
      if(item){
        return item
      }
    })
    if(shopList.value.every(item=>!item)){
      shopList.value = []
    }
  _setShopList(shopList.value)
}
/**
 * 获取店铺列表,返回列表数组
 */
const getShop = async() => {
  //请求店铺信息
  const res = await getAllShop()
  //将buffer图片转换为blob

  return res.data.data.map((item: shopCardClass) => {
    if (item.coverImage.length > 0) {
      const blob = new Blob([item.coverImage], { type: 'image/jpg' })
      item.coverImage = URL.createObjectURL(blob)
    } else {
      item.coverImage = ''
    }
    return item
  })
}
const color = ref('')
const shopList = ref<shopCardClass[]>([])
/**
 * 跳转到店铺
 * @param id 店铺id
 */
const gotoShop = (id: string | number) => {
  router.push({ path: '/shop', query: { id: id } })
}

//初始化 数据请求
onMounted(async()=>{
 const res = await getShop() 
  //TODO
    shopList.value = res
    _setShopList(shopList.value)
})

</script>

<template>
  <div class="homeBox" :style="{ backgroundColor: primary_color }">
    <div class="searchBox" :style="{ backgroundColor: primary_color }">
      <div class="locationInfo">
        <img :src="location" alt="" class="location">
        <span>电子科技大学</span>
      </div>
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" :background="primary_color" shape="round">
        <template #action>
          <div @click="clickSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="shopList">
      <div class="card" @click="gotoShop(item.id)" v-for="(item,index) in shopList" :key="index" v-if="shopList.length>0">
        <div class="card_left">
          <img :src="item?.coverImage||foodPhoto" :alt="item?.name">
        </div>
        <div class="card_right">
          <h4>{{ item?.name }}</h4>
          <div class="shopInfo">
            <span class="shopPoint">{{item?.point}}分</span>
            <span class="shopSales">月售{{ item?.sales>9999?'9999+':item?.sales }}</span>
          </div>
          <div class="delivery">
            <span>起送￥{{ item?.start_price }}</span>
            <span>配送 约￥{{ item?.delivery_price }}</span>
          </div>
          <span class="label" v-for="subItem in item?.label">{{ subItem }}</span>
          <div>
            <span class="other" v-for="subItem in item?.other">{{ subItem }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.homeBox {
  width: 100%;
  height: 1000px;

  .searchBox {
    width: 100%;
    position: sticky;
    top: 0;

    .locationInfo {
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 8%;
      padding-left: 3%;
      font-size: 12px;
      font-weight: 500;

      .location {
        width: 24px;
        height: 24px;
      }
    }
  }

  .shopList {
    width: 100%;
    height: 1000px;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .card {
      width: 95%;
      height: 130px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .card_left {
        width: 115px;
        height: 115px;

        img {
          width: 100%;
          border-radius: 5px;
        }
      }

      .card_right {
        width: 60%;
        height: 115px;

        h4 {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .shopInfo {
          margin-top: 2px;

          .shopPoint {
            color: orange;
            font-size: 16px;
            margin-right: 5px;
            font-weight: 600;
          }

          .shopSales {
            color: #959595;
            font-size: 12px;
          }
        }

        .delivery {
          color: #959595;
          font-size: 12px;
          margin-top: 5px;

          span {
            margin-right: 5px;
          }
        }

        .label {
          display: inline-block;
          background-color: #fef4e2;
          font-size: 12px;
          color: #a58f71;
          margin-top: 5px;
          padding: 3px;
          border-radius: 5px;
        }

        .other {
          display: inline-block;
          font-size: 12px;
          color: red;
          border: 1px solid red;
          padding-left: 3px;
          padding-right: 3px;
          border-radius: 5px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>