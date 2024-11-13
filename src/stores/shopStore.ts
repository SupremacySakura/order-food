import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { shopCardClass, menuListClass, shoppingCartClass } from "@/class/shopClass"
export const useShopStore = defineStore('shop', () => {
  //  店铺数组
  const _shopList = ref<shopCardClass[]>([])
  // 菜单数组
  const _menu = ref<menuListClass[]>([])
  // 购物车
  const _shoppingCart = ref<shoppingCartClass[]>([])
  // 声明操作数据的方法 action (普通函数)
  const _setShopList = (item: shopCardClass[]) => {
    _shopList.value = item
  }
  const _setMenu = (item: menuListClass[]) => {
    _menu.value = item
  }
  const _setShoppingCart = (item: shoppingCartClass[]) => {
    _shoppingCart.value = item
  }

  return {
    _shopList,
    _setShopList,
    _menu,
    _setMenu,
    _shoppingCart,
    _setShoppingCart
  }
}, { persist: true })