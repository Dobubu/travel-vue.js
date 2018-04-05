<template lang="html">
  <div class="header">
    <div class="header-bg">
      <h1>高雄旅遊資訊</h1>
      <select id="IdArea" v-model='selectedZone' v-on:change='showDataZone(selectedZone)'>
          <option v-if='ifSelectZone' v-for="zone in noRepeatZone" :value="zone">{{ zone }}</option>
      </select>
    </div>
    <div class="header-select">
      <h3>熱門行政區</h3>
      <div id="hotLoading" class="header-select-area-wrap" v-if='ifHotLoading'>
        <font-awesome-icon :icon="['fas','circle-notch']" spin size="2x"/>
      </div>
      <div id="hotError" class="header-select-area-wrap" v-if='ifHotError'>
        <div>查無資料!!!!</div>
      </div>
      <div id="hotSuccess" class="header-select-area-wrap">
        <div :data-area='zone' v-if='ifHotSuccess' v-for="zone in sortedZone" v-on:click='showDataZone(zone)' class="header-select-area area-purple">{{ zone }}</div>
      </div>
    </div>
    <div class="memberShip" v-on:click='account'>
      <font-awesome-icon :icon="['fas','user-circle']" size="2x" title="會員登入"/>
    </div>
  </div>

  
</template>

<script>
import axios from 'axios'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(solid);


export default {
  data() {
    return {
      getAjaxData: '',
      allZone: [], // 紀錄-'所有'行政區
      noRepeatZone: [], // 紀錄-未重複的行政區
      repeatZone: [], // 紀錄-各行政區的'重複'數量
      sortedZone: [], // 紀錄-repeatZone'由大至小'排序
      ifHotLoading: true, //  資料loading中
      ifHotError: false,  //  資料錯誤
      ifSelectZone: false,  //  行政區select
      ifHotSuccess: false,  //  熱門行政區
      selectedZone: null,
      clickSelectedZone: null,
      zoneInfo: [],
      pagesNum: 6, // 每頁顯示筆數
      pagesShow: 0, // 紀錄-總頁數
      pagesAry: [],
      zoneInfoPage: 0,
      showGM: false, // 判斷是否顯示地圖
      showGMClick: 0, // 測試按地圖而已
      isMemberToggle: false,
      isWrapmaskShow: false,
    };
  },
  mounted: function () {
    this.getData();
    this.ifHotLoading = true;
  },
  methods: {
    getData: function(){
      let self = this;
      axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(function (response) {
          console.log('success');
          self.ifHotLoading = false;
          self.getAjaxData = response.data.result.records;
          self.addData(self.getAjaxData);
        })
        .catch(function (error) {
          console.log(error);
          self.ifHotLoading = false;
          self.ifHotError = true;
        });
    },
    addData: function (ajaxData) {
      for (var i = 0; i < ajaxData.length; i++) {
        ajaxData[i].showGMap = false;
      }
      this.filterZone(ajaxData);
      this.filterHotZone(ajaxData);
    },
    filterZone: function (ajaxData) {
      console.log(ajaxData);
      let self = this;
      for (var i = 0; i < ajaxData.length; i++) {
        this.allZone.push(ajaxData[i].Zone);
      }
      if (ajaxData) {
        this.ifSelectZone = true;
        this.ifHotSuccess = true;
      };
      this.noRepeatZone.push('--請選擇行政區--');
      this.allZone.forEach(function (value) {
        if (self.noRepeatZone.indexOf(value) == -1) {
          self.noRepeatZone.push(value);
        }
      });
    },
      filterHotZone: function (ajaxData) {
      let self = this;
      this.allZone.forEach(function (item, index, array) {
        self.repeatZone[item] = self.repeatZone[item] ? self.repeatZone[item] + 1 : 1;
      });
      console.log(this.repeatZone)
      this.sortedZone = Object.keys(this.repeatZone).sort(
        function (a, b) {
          return self.repeatZone[b] - self.repeatZone[a];
        }
      );
      self.sortedZone.length = 4;
      var elHotZoneAry = document.querySelectorAll('.header-select-area'); // 抓元素-4個熱門行政區(div)
      console.log(elHotZoneAry.length);
    },
    account: function () {
      let self = this;
      self.isMemberToggle = self.isMemberToggle == false ? true : false; // 控制帳號申請 true false
      self.isWrapmaskShow = self.isWrapmaskShow == false ? true : false; // 控制背景黑 true false
    },
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
};
</script>

<style lang="css" scoped>
  svg {
    color:#559AC8;
  }
</style>
