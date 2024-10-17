<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick, type VNode, type VNodeRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import foodPhoto from '../../public/foodPhoto.png'
//导入setting仓库
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
//导入请求方式
import { getMenuById,getAllShop } from '@/services/apis/home'
//导入店铺与菜单类
import { shopCardClass,menuClass,menuListClass } from '@/class/shopClass';
const router = useRouter()
const route = useRoute()
//店铺id
const id = ref()
//最低高度
const foodNavMinHeight = ref(0)

const activeIndex = ref(0) // 当前激活的导航索引
const partList = ref(null) // 获取每个部分的ref
const partPosition = ref<number[]>([])
const foodList = ref(null)
/**
 * 处理滚动事件,与导航栏联动
 * @param event 
 */
const handleScroll = (event: Event)=>{
  const scrollTop = (event.target as HTMLElement).scrollTop
  if(partPosition.value){
    for(let i = 0;i<partPosition.value.length-1;i++){
      if(scrollTop>=partPosition.value[i]-310&&scrollTop<partPosition.value[i+1]-310){
        activeIndex.value = i
        return
      }
      if(scrollTop>=partPosition.value[partPosition.value.length-1]-310){
        activeIndex.value = partPosition.value.length-1
        return
      }
    }
  }
}
/**
 * 处理点击事件,与菜单联动
 * @param index 
 */
const gotoPart = (index:number)=>{
  if(foodList.value){
    const part = (foodList.value as HTMLElement).children[index]
    if(part){
      (part as HTMLElement).scrollIntoView({behavior:'smooth'})
    }
  }
  
}
const menu = ref<menuListClass[]>([])
/**
 * 获取menu数据并对数据展示进行处理
 * @param id 店铺id
 * @return 返回一个menuClass数组,与他们的type
 */
const getMenu =async (id:number)=>{
  //发送请求获取菜单数据
  const res = await getMenuById(id)
  //将buffer图片转换为blob
  for (let i = 0; i < res.data.data.length; i++) {
    res.data.data[0].menu.map((item: any) => {
      if (item.image.length > 0) {
        const blob = new Blob([item.image], { type: 'image/jpg' });
        item.image = URL.createObjectURL(blob)
      } else {
        item.image = foodPhoto
      }
      return item
    })
  }
  // 创建每个部分的 ref,处理ref
  if (partList.value) {
    (partList.value as Array<any>).forEach(element => {
      partPosition.value.push(element.offsetTop)
    })
  }
  for (let i = 0; i < partPosition.value.length; i++) {
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'part'
    emptyBlock.style.height = '110px'
    foodList.value && (foodList.value as HTMLElement).appendChild(emptyBlock)
  }
  return res.data.data
}
const shop = ref<shopCardClass>()
const getShop = async(id:number)=>{
  const res = await getAllShop()
  const index =  res.data.data.findIndex((item:any)=>{return item.id ===+id})
  shop.value = res.data.data[index]
}
onBeforeMount(() => {
  const viewPortHeight = window.innerHeight
  foodNavMinHeight.value = viewPortHeight - 300
})
onMounted(async() => {
  //获取店铺id
  id.value = route.query?.id
  menu.value = await getMenu(id.value)
  getShop(id.value)
})

</script>

<template>
  <div class="shopBox">
    <div class="back" @click="()=>{router.back()}">
      <van-icon name="arrow-left" />
    </div>
    <div class="backgroundImage">
      <img :src="foodPhoto" alt="背景图片">
    </div>

    <div class="shopInfoCard">
      <div class="card_top">
        <div class="shopInfo">
          <img :src="foodPhoto" alt="">
          <div>
            <h4>{{ shop?.name }}</h4>
          </div>
        </div>
        <div class="label">
          {{ shop?.news }}
        </div>
      </div>

      <div class="card_bottom">
        <span class="other" v-for="item in shop?.other" :key="item">
          {{ item }}
        </span>
      </div>
    </div>


    <div class="search">
      <div class="searchLabel"><span>点餐</span></div>
      <div class="searchFrame"><van-search placeholder="搜索" shape="round" /></div>
    </div>

    <div class="foodShow">
      <div class="foodNav" :style="{ minHeight: foodNavMinHeight + 'px' }">
        <span :class="[{ active: activeIndex === index }]" @click="gotoPart(index)" v-for="(item,index) in menu" :key="item.type">{{ item.type }}</span>
      </div>
      <div class="foodList" @scroll="handleScroll" ref="foodList">
        <div class="part" v-for="(item, index) in menu" :key="item.type">
          <div class="partName" ref="partList">{{ item.type }}</div>
          <div class="menuItem" v-for="(subItem,index) in item.menu" :key="subItem.id">
            <div>
              <img :src="subItem.image" alt="">
            </div>
            <div class="foodInfo">
              <div>
                <h4>{{ subItem.name }}</h4>
                <span class="sales">月售{{ subItem.sales }}</span>
                <div>
                  <span class="label" v-for="element in subItem.menu_label" :key="element">{{ element }}</span>
                </div>
              </div>
              <div class="buy">
                <span class="price">￥{{ parseFloat(`${subItem.price}`) }}</span>
                <button class="addButton" :style="{ backgroundColor: primary_color }">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.shopBox {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .back{
    position: absolute;
    top:5%;
    left: 5%
  }
  .backgroundImage {
    width: 100%;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .shopInfoCard {
    width: 95%;
    height: 150px;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    top: -8px;
    background-color: white;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    .card_top {
      width: 100%;
      height: 50%;
      padding: 10px;

      .shopInfo {
        display: flex;
        margin-bottom: 2px;

        img {
          width: 10%;
          margin-right: 10px;
          border-radius: 3px;
        }

        h4 {
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

      }

      .label {
        width: 100%;
        font-size: 12px;
        color: rgb(166.2, 168.6, 173.4);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .card_bottom {
      width: 100%;
      height: 50%;
      background-color: rgba(0, 0, 0, 0.03);
      padding: 10px;

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

  .search {
    width: 100%;
    height: 50px;
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;

    .searchLabel {
      font-weight: 600
    }

    .searchFrame {
      width: 30%;
    }
  }

  .foodShow {
    width: 100%;
    display: flex;
    height: calc(100vh - 300px);

    /* 确保这部分能够滚动, 减去搜索栏等的高度 */
    .foodNav {
      width: 20%;
      background-color: rgba(166.2, 168.6, 173.4, 0.1);
      overflow-y: scroll;
      border-radius: 5px;

      span {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }

      .active {
        background-color: white;
      }
    }

    .foodList {
      width: 80%;
      padding: 10px;
      overflow-y: scroll;

      .part {
        .partName {
          height: 30px;
          font-size: 14px;
          background-color: white;
          position: sticky;
          top: -10px;
        }

        .menuItem {
          width: 100%;
          height: 110px;
          display: flex;
          padding: 10px;

          img {
            width: 90px;
            height: 90px;
          }

          .foodInfo {
            width: 60%;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .sales {
              font-size: 12px;
              color: rgb(166.2, 168.6, 173.4);
            }

            .label {
              background-color: #CFD3DC;
              font-size: 12px;
              border-radius: 5px;
              padding: 3px;
              margin-left: 4px;
            }

            .buy {
              display: flex;
              justify-content: space-between;

              .price {
                font-size: 16px;
                color: orangered;
                font-weight: 600;
              }

              .addButton {
                width: 25px;
                height: 25px;
                border-radius: 25px;
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>