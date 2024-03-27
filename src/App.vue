<script setup>
import { ref } from 'vue'

import Nav from './components/Nav.vue'
import VSelect from './components/Select.vue'
import VRadio from './components/Radio.vue'
import Ren from './components/Ren'

function test(event) {
  console.log(event)
}

function handleChange(e) {
  console.log('here', e)
}

const options = ref([
  {
    label: '抵押',
    value: '1'
  },
  {
    label: '未抵押',
    value: '2'
  }
])
const options3 = ref([
  {
    label: '公积金贷款',
    value: '1'
  },
  {
    label: '商业贷款',
    value: '2'
  }
])
const options2 = ref([
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  }
])

function handleAdd() {
  options.value.push({
    label: 12,
    value: 'asdf'
  })
}
</script>

<template>
  <!-- <header>
    <div class="title">Contract Playground</div>
    <Nav />
  </header>

  <router-view /> -->

  <div style="display: flex">
    <div>
      <Ren />
    </div>
    <div>
      <div>GF-2014</div>
      <div>合同编号 ___</div>
      <div>出卖人:_____</div>
      <div>买受人:_______</div>
      <div>中华人民共和国住房和城乡建设部</div>
      <div>中华人民共和国国家工商行政管理总局</div>
      <div>二〇一四年四月</div>

      <div class="text">
        <span> 第一条 租赁房屋坐落在间数 </span>____________、<span>建筑面积</span>
        ____________、<span>房屋质量</span>____________。
        <div>
          第二条 租赁期限从_____年_____月_____日至_____年_____月_____日。
          （提示：租赁期限不得超过二十年。超过二十年的，超过部分无效）
        </div>
        <div>
          3.套内建筑面积：是指成套房屋的套内建筑面积，由套内使用面积、套内墙体面积、套内阳台建筑面积三部分组成。
        </div>
        <div>
          <span>第四条 抵押情况</span>
          <div>
            与该商品房有关的抵押情况为
            <VRadio :options="options" @change="handleChange" defaultValue="2"></VRadio>
          </div>
          <div>
            抵押人——————————，抵押权人：————————————————
            抵押登记机构：——————————————，抵押登记日期：——————————————
            债务履行权限：——————————————————
          </div>
        </div>
        <div>
          第八条 买受人将采取第<VSelect
            :options="options2"
            @change="handleChange"
            defaultValue="2"
          ></VSelect
          >种方式付款
          <div>1. 一次性付款。买受人应当在——————年——————月——————日前支付该商品房全部价款。</div>
          <div>2. 分期付款。买受人应当在——————年————月————日前分————期支付该商品</div>
          <div>
            3. 贷款方式付款
            <VSelect :options="options3" @change="handleChange" defaultValue="2"></VSelect
            >买受人应当于——————月——————日之前支付首期房款价——————（币种）——————元（大写——————————元整）
          </div>
        </div>
      </div>
      <button @click="handleAdd">提交</button>
    </div>
  </div>
</template>

<style>
.text {
  width: 700px;
}

header {
  --dark: #333;
  --light: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  z-index: 2;
}

header .title {
  font-size: 20px;
  padding: 0 20px;
  font-weight: 600;
}
</style>
