<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick, type VNode, type VNodeRef, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import foodPhoto from '../../public/foodPhoto.png'
//导入setting仓库
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
//导入shop仓库
import { useShopStore } from '@/stores/shopStore'
const { _shopList, _setShopList, _menu, _setMenu, _setShoppingCart, _shoppingCart } = useShopStore()
//导入请求方式
import { getMenuById, getAllShop } from '@/services/apis/home'
//导入店铺与菜单类
import { shopCardClass, menuClass, menuListClass, shoppingCartClass } from '@/class/shopClass';
const router = useRouter()
const route = useRoute()
//导入配送员图片
import translator from '../../public/translator.png'
import translator_shop from '../../public/translator_shop.png'
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
const handleScroll = (event: Event) => {
  const scrollTop = (event.target as HTMLElement).scrollTop
  if (partPosition.value) {
    for (let i = 0; i < partPosition.value.length - 1; i++) {
      if (scrollTop >= partPosition.value[i] - 310 && scrollTop < partPosition.value[i + 1] - 310) {
        activeIndex.value = i
        return
      }
      if (scrollTop >= partPosition.value[partPosition.value.length - 1] - 310) {
        activeIndex.value = partPosition.value.length - 1
        return
      }
    }
  }
}
/**
 * 处理点击事件,与菜单联动
 * @param index 
 */
const gotoPart = (index: number) => {
  if (foodList.value) {
    const part = (foodList.value as HTMLElement).children[index]
    if (part) {
      (part as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

}
const menu = ref<menuListClass[]>([])
/**
 * 获取menu数据并对数据展示进行处理
 * @param id 店铺id
 * @return 返回一个menuClass数组,与他们的type
 */
const getMenu = async (id: number) => {
  //发送请求获取菜单数据
  const res = await getMenuById(id)
  //将buffer图片转换为blob
  for (let i = 0; i < res.data.data.length; i++) {
    res.data.data[i].menu.map((item: any) => {
      if (item.image.length > 0) {
        const blob = new Blob([item.image], { type: 'image/jpg' });
        item.image = URL.createObjectURL(blob)
      } else {
        item.image = foodPhoto
      }
      return item
    })
  }
  //对menu的数据初始化
  res.data.data.map((item: any) => {
    item.menu.map((subItem: any) => {
      subItem.count = 0
      return subItem
    })
    return item
  })
  _setMenu(res.data.data)
  return res.data.data
}
//店铺信息
const shop = ref<shopCardClass>()
//配送费
const start_price = ref(0)
const getShop = async (id: number) => {
  const res = await getAllShop()
  const index = res.data.data.findIndex((item: any) => { return item.id === +id })
  shop.value = res.data.data[index]
  start_price.value = shop.value?.start_price || 0
}
/**
 * 为菜单添加空白,需要在菜单加载完成后使用
 */
const addEmptyBlock = () => {
  let menuLength = 0
  menu.value.forEach((item) => {
    menuLength += item.menu.length
  })
  for (let i = 0; i < menuLength; i++) {
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'part'
    emptyBlock.style.height = '110px'
    foodList.value && (foodList.value as HTMLElement).appendChild(emptyBlock)
  }
  for (let i = 0; i < partPosition.value.length - 1; i++) {
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'part'
    emptyBlock.style.height = '40px'
    foodList.value && (foodList.value as HTMLElement).appendChild(emptyBlock)
  }
}
//购物车
const shoppingCart = ref<shoppingCartClass[]>([])
//商品价格
const totalPrice = computed(() => {
  return shoppingCart.value.reduce((accumulator, item) => {
    return accumulator + item.price * item.count
  }, 0)
})

/**
 * 将一个菜品加入购物车或数量加一
 * @param item 菜品
 */
const addToCart = (item: menuClass) => {
  const S_index = shoppingCart.value.findIndex(e => e.id === item.id)
  const M_type = menu.value.find(e=>e.type===item.type)
  const M_item = M_type?.menu.find(e=>e.id===item.id)
  if(M_item){
    M_item.count+=1
  }
  //判断购物车里面是否有添加的类型
  if (S_index !== -1) {
    //有
    shoppingCart.value[S_index].count += 1
    _setShoppingCart(shoppingCart.value)
    _setMenu(menu.value)
    return
  }
  //没有
  shoppingCart.value.push({ ...item, count: 1 })
  _setShoppingCart(shoppingCart.value)
  _setMenu(menu.value)
}
/**
 * 将一个菜品移除购物车或数量减一
 * @param item 菜品
 */
const delFromCart = (item: menuClass) => {
  const index = shoppingCart.value.findIndex(e => e.id === item.id)
  const M_type = menu.value.find(e => e.type === item.type)
  const M_item = M_type?.menu.find(e => e.id === item.id)
  if(M_item){
    if (M_item.count > 0) {
      M_item.count -= 1
      shoppingCart.value[index].count -= 1
    }
  }
  if (shoppingCart.value[index].count <= 0) {
    //从购物车移除
    shoppingCart.value.splice(index, 1)
    if(shoppingCart.value.length===0){
      isShow.value = false
    }
  }
  _setShoppingCart(shoppingCart.value)
  _setMenu(menu.value)
}
//控制购物车的显示与隐藏
const isShow = ref(false)
/**
 * 控制购物车的显示与隐藏
 */
const changeIsShow = () => {
  if (shoppingCart.value.length > 0) {
    isShow.value = !isShow.value
  }
}
const cart = ref(null)
const whiteHeight = computed(() => {
  if (cart.value) {
    return window.innerHeight - (cart.value as HTMLElement)?.offsetHeight
  } else {
    return 0
  }
})
onBeforeMount(() => {
  const viewPortHeight = window.innerHeight
  foodNavMinHeight.value = viewPortHeight - 300

})
onMounted(async () => {
  //获取店铺id
  id.value = route.query?.id
  //初始化菜单
  if (!_menu || _menu[0].menu[0].shop_id != id.value || _shoppingCart.length === 0) {
    menu.value = await getMenu(id.value)
  } else {
    menu.value = _menu
  }
  //初始化购物车
  if (_shoppingCart[0] && _shoppingCart[0].shop_id == id.value) {
    shoppingCart.value = _shoppingCart
  }
  getShop(id.value)
  await nextTick()
  // 创建每个部分的 ref,处理ref
  if (partList.value) {
    (partList.value as Array<any>).forEach(element => {
      partPosition.value.push(element.offsetTop)
    })
  }
  addEmptyBlock()
})

</script>

<template>
  <div class="shopBox">
    <div class="back" @click="() => { router.back() }">
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
        <span :class="[{ active: activeIndex === index }]" @click="gotoPart(index)" v-for="(item, index) in menu"
          :key="item.type">{{ item.type }}</span>
      </div>
      <div class="foodList" @scroll="handleScroll" ref="foodList">
        <div class="part" v-for="(item, index) in menu" :key="item.type">
          <div class="partName" ref="partList">{{ item.type }}</div>
          <div class="menuItem" v-for="(subItem, index) in item.menu" :key="subItem.id">
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
                <div>
                  <button class="delButton" :style="{ borderColor: primary_color }" @click="delFromCart(subItem)"
                    v-if="subItem.count > 0">-</button>
                  <span class="count" v-if="subItem.count > 0">{{ subItem.count }}</span>
                  <button class="addButton" :style="{ backgroundColor: primary_color }"
                    @click="addToCart(subItem)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout" @click="changeIsShow">
      <div v-if="shoppingCart.length === 0" class="nonShop">
        <div class="nonShop_left">
          <img :src="translator" alt="">
          <span class="price">￥0</span>
          <span class="line">|</span>
          <span class="price_translate">免配送费</span>
        </div>
      </div>
      <div v-else class="shop">
        <div class="shop_left">
          <img :src="translator_shop" alt="">
          <div class="priceInfo">
            <span class="price">￥{{ totalPrice }}</span>
            <span class="price_translate">免配送费</span>
          </div>

        </div>
      </div>
      <div class="translateInfo">
        <span v-if="shoppingCart.length === 0">￥{{ start_price }}起送</span>
        <span v-else-if="start_price - totalPrice > 0">还差￥{{ start_price - totalPrice }}起送</span>
        <button v-else class="gotoBuy" :style="{ backgroundColor: primary_color }">去结算</button>
      </div>
    </div>

    <div class="shoppingCart" v-show="isShow && shoppingCart.length > 0">
      <div class="white" :style="{ height: whiteHeight + 'px' }" @click="isShow = false"></div>
      <div class="cart" ref="cart">
        <div v-for="item in shoppingCart" class="cartItem">
          <div class="image">
            <img :src="item.image" alt="">
          </div>
          <div class="menuInfo">
            <div class="top">
              <h4>{{ item.name }}</h4>
              <span class="contains">{{ item.contains }}</span>
            </div>
            <div>
              <div class="bottom">
                <span class="price">￥{{ item.price * item.count }}</span>
                <div class="buy">
                  <button class="delButton" :style="{ borderColor: primary_color }" @click="delFromCart(item)"
                    v-if="item.count > 0">-</button>
                  <span class="count" v-if="item.count > 0">{{ item.count }}</span>
                  <button class="addButton" :style="{ backgroundColor: primary_color }"
                    @click="addToCart(item)">+</button>
                </div>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
        <div class="cartWhite"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.shopBox {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .back {
    position: absolute;
    top: 5%;
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

              .delButton {
                width: 25px;
                height: 25px;
                border-radius: 25px;
                border: none;
                border: 2px solid;
                background-color: white;
              }

              .count {
                margin-left: 10px;
                margin-right: 10px;
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

  .checkout {
    width: 90%;
    height: 60px;
    background-color: black;
    position: sticky;
    z-index: 2;
    bottom: 1%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    .nonShop {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .nonShop_left {
        display: flex;
        align-items: center;

        img {
          width: 50px;
        }

        .price {
          font-size: 24px;
          font-weight: 600;
          margin-left: 10px;
          margin-right: 5px;
        }

        .line {
          color: rgb(166.2, 168.6, 173.4);
          margin-right: 5px;
        }

        .price_translate {
          color: rgb(166.2, 168.6, 173.4);
          font-size: 14px;
        }
      }
    }

    .shop {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .shop_left {
        display: flex;
        align-items: center;

        img {
          width: 50px;
        }

        .priceInfo {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .price {
            font-size: 24px;
          }

          .price_translate {
            font-size: 12px;
          }
        }
      }

    }

    .translateInfo {
      display: flex;
      align-items: center;
      margin-right: 10px;

      span {
        white-space: nowrap;
        color: rgb(166.2, 168.6, 173.4);
        font-size: 18px;
      }

      .gotoBuy {
        width: 80px;
        height: 40px;
        border-radius: 40px;
        border: none;
      }
    }
  }

  .shoppingCart {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .white {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .cart {
      width: 100%;
      display: flex;
      flex-direction: column;

      .cartItem {
        width: 100%;
        height: 100px;
        background-color: white;
        display: flex;
        padding: 10px;

        .image {
          width: 60px;
          display: flex;
          justify-content: center;
          align-items: start;
          img {
            width: 100%;
          }

          margin-right: 10px;
        }
        .menuInfo{
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          .top{
            .contains{
              font-size: 12px;
              color: rgb(166.2, 168.6, 173.4);
            }
          }
          .bottom{
            display: flex;
            justify-content: space-between;
            .price {
                color: red;
                font-size: 20px;
              }
              .buy{
                .delButton {
                    width: 25px;
                    height: 25px;
                    border-radius: 25px;
                    border: none;
                    border: 2px solid;
                    background-color: white;
                  }
                
                  .count {
                    margin-left: 10px;
                    margin-right: 10px;
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

      .cartWhite {
        width: 100%;
        height: 80px;
        background-color: white;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>