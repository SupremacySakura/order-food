<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick, type VNode, type VNodeRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import foodPhoto from '../../public/foodPhoto.png'
//导入setting仓库
import { useSettingStore } from '@/stores/settingStore';
const { primary_color } = useSettingStore()

const router = useRouter()
const route = useRoute()
//店铺id
const id = ref()
//最低高度
const foodNavMinHeight = ref(0)
const list = ref([1, 2, 3, 4, 5, 6])
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
      if(scrollTop>=partPosition.value[partPosition.value.length-1]){
        activeIndex.value = partPosition.value.length-1
        return
      }
    }
  }
}
const gotoPart = (index:number)=>{
  if(partList.value){
    const part = partList.value[index]
    if(part){
      (part as HTMLElement).scrollIntoView({behavior:'smooth'})
    }
  }
  
}
onBeforeMount(() => {
  const viewPortHeight = window.innerHeight
  foodNavMinHeight.value = viewPortHeight - 300
})
onMounted(() => {
  //获取店铺id
  id.value = route.query?.id

  // 创建每个部分的 ref
  if (partList.value) {
    (partList.value as Array<any>).forEach(element => {
      partPosition.value.push(element.offsetTop)
    })
  }
  for(let i =0;i<partPosition.value.length;i++){
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'part'
    emptyBlock.style.height = '110px'
    foodList.value && (foodList.value as HTMLElement).appendChild(emptyBlock)
  }
})

</script>

<template>
  <div class="shopBox">

    <div class="backgroundImage">
      <img :src="foodPhoto" alt="背景图片">
    </div>

    <div class="shopInfoCard">
      <div class="card_top">
        <div class="shopInfo">
          <img :src="foodPhoto" alt="">
          <div>
            <h4>芳的家(电子科技大学店)</h4>
          </div>
        </div>
        <div class="label">
          公告:我们专注于地道风味的特色美食,我们均采用新鲜食材
        </div>
      </div>

      <div class="card_bottom">
        <span class="other">神券</span>
      </div>
    </div>


    <div class="search">
      <div class="searchLabel"><span>点餐</span></div>
      <div class="searchFrame"><van-search placeholder="搜索" shape="round" /></div>
    </div>

    <div class="foodShow">
      <div class="foodNav" :style="{ minHeight: foodNavMinHeight + 'px' }">
        <span :class="[{ active: activeIndex === 0 }]" @click="gotoPart(0)">收藏福利</span>
        <span :class="[{ active: activeIndex === 1 }]" @click="gotoPart(1)">必点搭档</span>
        <span :class="[{ active: activeIndex === 2 }]" @click="gotoPart(2)">尝鲜新品</span>
        <span :class="[{ active: activeIndex === 3 }]" @click="gotoPart(3)">灵魂拌面</span>
        <span :class="[{ active: activeIndex === 4 }]" @click="gotoPart(4)">豪华双拼</span>
        <span :class="[{ active: activeIndex === 5 }]" @click="gotoPart(5)">加点浇头</span>
      </div>
      <div class="foodList" @scroll="handleScroll" ref="foodList">
        <div class="part" v-for="(item, index) in list" :key="item">
          <div class="partName" ref="partList">收藏福利</div>
          <div class="menuItem">
            <div>
              <img :src="foodPhoto" alt="">
            </div>
            <div class="foodInfo">
              <div>
                <h4>辣椒蘸水</h4>
                <span class="sales">月售2000+</span>
                <div>
                  <span class="label">一人份</span>
                </div>
              </div>
              <div class="buy">
                <span class="price">￥0</span>
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