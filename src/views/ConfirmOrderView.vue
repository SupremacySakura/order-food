<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useShopStore } from '@/stores/shopStore'
const { _shoppingCart, _setShoppingCart, _shopList } = useShopStore()
import { useSettingStore } from '@/stores/settingStore'
const { primary_color } = useSettingStore()
import { useUserStore } from '@/stores/userStore'
const { _userInfo } = useUserStore()
import { userClass } from '@/class/userClass'
import { showToast } from 'vant'
import { buy } from '@/services/apis/user'
import foodPhoto from '../../public/foodPhoto.png'
//备注
const remark = ref<string>('')
//商品价格
const totalPrice = computed(() => {
  return _shoppingCart.reduce((accumulator, item) => {
    return accumulator + item.price * item.count
  }, 0)
})
//商品总数
const totalCount = computed(() => {
  return _shoppingCart.reduce((accumulator, item) => {
    return accumulator + item.count
  }, 0)
})
//data
let data = {}
const handleBuy = async() => {
  console.log('购买')
  if(!_userInfo){
    return
  }
  if(totalPrice.value > _userInfo?.money){
    showToast('余额不足')
    return
  } else {
    const res = await buy(data)
    if(res.data.code===200){
      showToast('购买成功')
      _setShoppingCart([])
      router.push('/order')
    }
    return
  }
}
onMounted(()=>{
  //判断是否登录
  if (_shoppingCart.length <= 0){
    router.push('/home')
  }else if (typeof _userInfo != 'object'){
    router.push('/user')
    showToast('请先登录账号')
  } else {
    //组成发送到后端的数据
    const shop = _shopList.find(item=>+item.id === +_shoppingCart[0].shop_id)
    const menu = _shoppingCart
    const user_id = _userInfo?.id
    const status = '进行中'
    data = {
      shop:shop,
      menu:menu,
      user_id:user_id,
      totalPrice:totalPrice.value,
      totalCount:totalCount.value,
      status:status,
      remark:remark.value,
    }
  }
  
})
</script>

<template>
  <!-- 购物车 -->
  <div class="confirmBox">
    <div class="head" :style="{backgroundColor:primary_color}">
      <div class="back" @click="() => { router.back() }">
        <van-icon name="arrow-left" />
      </div>
      <h2>订单</h2>
    </div>
    <div v-for="item in _shoppingCart" :key="item.id" class="itemBox">
      <div class="image">
        <img :src="item.image||foodPhoto" alt="">
      </div>
      <div class="itemInfo">
        <h4>{{ item.name }}</h4>
        <span class="contains">{{ item.contains }}</span>
        <div class="price_and_count">
          <span class="price">￥{{ item.price * item.count }}</span>
          <span class="count">{{ item.count }}</span>
        </div>
      </div>
    </div>
    <!-- 总价 -->
    <div class="totalPrice">￥{{ totalPrice }}</div>
    <!-- 备注 -->
    <div class="remark">
      <van-field v-model="remark" label="备注" />
    </div>
    <!-- 支付方式 -->
    <div class="moneyBox">
      <div class="moneyItem">
        <span>余额</span>
        <span>￥{{ _userInfo?.money }}</span>
      </div>
    </div>
    <!-- 提交订单 -->
     <div class="buyButton">
      <button :style="{backgroundColor:primary_color}" @click="handleBuy">购买</button>
     </div>
  </div>
</template>

<style lang="less" scoped>
.confirmBox{
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .head{
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
      font-weight: normal;
    }
  }
  .itemBox{
    width: 100%;
    height: 100px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    .image{
      width: 60px;
      margin-right: 10px;
      img{
        width: 100%;
      }
    }
    .itemInfo{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-right: 10px;
      .contains{
        font-size: 12px;
        color: rgb(166.2, 168.6, 173.4);
      }
      .price_and_count{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
            font-size: 20px;
            color: red;
          }
        .count{
          color: rgb(166.2, 168.6, 173.4);
        }
      }
     
    }
  }
  .totalPrice{
    width: 100%;
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 24px;
    color: red;
  }
  .remark{
    margin-top: 10px;
    padding: 10px;
  }
  .moneyBox{
    width: 100%;
    padding: 10px;
    .moneyItem{
      width: 100%;
      height: 50px;
      padding: 10px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .buyButton{
    position: fixed;
    bottom: 5%;
    right:5%;
    button{
      width: 80px;
      height: 40px;
      border-radius: 40px;
      border: none;
    }
  }
}
</style>