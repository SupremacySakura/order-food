<script setup lang="ts">
import location from '../../public/location.png'
import foodPhoto from '../../public/foodPhoto.png'
import { ref } from 'vue';
const value = ref('');
const clickSearch = () => {

}
</script>

<template>
  <div class="homeBox">
    <div class="searchBox">
      <div class="locationInfo">
        <img :src="location" alt="" class="location">
        <span>电子科技大学</span>
      </div>
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" background="#ffe43f" shape="round">
        <template #action>
          <div @click="clickSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="shopList">
      <div class="card">
        <div class="card_left">
          <img :src="foodPhoto" alt="">
        </div>
        <div class="card_right">
          <h4>芳的家(电子科技大学店)xxxxxxx</h4>
          <div class="shopInfo">
            <span class="shopPoint">5.0分</span>
            <span class="shopSales">月售9999+</span>
          </div>
          <div class="delivery">
            <span>起送￥18</span>
            <span>配送 约￥0.2</span>
          </div>
          <span class="label">千人收藏的好店</span>
          <div>
            <span class="other">神券</span>
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
  background-color: #ffe43f;

  .searchBox {
    width: 100%;
    position: sticky;
    top: 0;
    background-color: #ffe43f;

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