<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import foodPhoto from '../../public/foodPhoto.png'
const router = useRouter()
const route = useRoute()
const id = ref()
onMounted(() => {
  //获取店铺id
  id.value = route.query?.id
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


    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="less" scoped>
.shopBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
        }

      }

      .label {
        font-size: 12px;
        color: rgb(166.2, 168.6, 173.4);
      }
    }

    .card_bottom {
      width: 100%;
      height: 50%;
      background-color: rgba(0,0,0,0.03);
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
}
</style>