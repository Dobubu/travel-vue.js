<template lang="html">
    <div class="content">
      <!-- <p style="text-align:center;">{{getDataProp}} {{getZoneProp}}zoneInfo</p> -->
      <h2 id="content-areaFont">{{ getZoneProp }}</h2>
      <div class="content-infoCard-wrap">
        <div class="content-infoCard" v-for='(info, i) in getDataPageProp[zoneInfoPage]'>
          <div class="content-infoCard-img" :class="{'changeImgMap': info.showGMap}">
            <img :src='info.Picture1'>
            <iframe width="100%" height="200" frameborder="0" allowfullscreen :src="'http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=' + info.Add + '&z=16&output=embed&t='"></iframe>
            <div class="infoGradient ">
              <h2 id="infoImgName">{{ info.Name }}</h2>
              <h2 id="infoImgZone">{{ info.Zone }}</h2>
            </div>
          </div>
          <ul class="content-infoCard-info ">
            <li id="infoDate">{{showGM}}{{info.showGMap}}{{i}}{{ info.Opentime }}</li>
            <!-- <li id="infoDate">{{ info.Opentime }}</li> -->
            <li class="funcGoogleMap" title="顯示googleMap" v-on:click='showGoogleMap(i)'></li>
            <li id="infoAdd" class="funcAdd">{{ info.Add }}</li>
            <li id="infoTel">{{ info.Tel }}</li>
            <li id="infoFree">{{ info.Ticketinfo }}</li>
          </ul>
        </div>
      </div>
      <div id="content-page-id " class="content-page ">
        <ul>
          <li id='content-page-num' v-for='page in pagesAry' v-on:click='paging(page)'>{{ page }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      getAjaxData: "",
      clickSelectedZone: null, // 綁定點選的區域名
      zoneInfo: [],
      pagesNum: 6, // 每頁顯示筆數
      pagesShow: 0, // 紀錄-總頁數
      pagesAry: [],
      page: 0,
      zoneInfoPage: 0,
      showGM: false, // 判斷是否顯示地圖
      showGMClick: 0, // 測試按地圖而已
    };
  },
  mounted: function() {
    let self = this;
    if(self.getDataPageProp.length > 0){
      self.pageAry(self.getDataProp);
      console.log(self.getDataPageProp);
    }else {
      console.log('無資料');
    }
  },
  methods: {
    pageAry: function(getZoneInfo) {
      var pagesStr = "";
      // 用ary存取分頁資料
      this.pagesShow = Math.ceil(getZoneInfo.length / this.pagesNum);
      console.log(getZoneInfo.length);
      console.log(this.pagesShow+'頁');
      var pageInfoAry = []; // 紀錄分頁Data
      for (var i = 0; i < this.pagesShow; i++) {
        var lastPage = (i + 1) * this.pagesNum - 1;
        var startPage = lastPage - (this.pagesNum - 1);
        pageInfoAry[i] = []; // 產生總頁數的空陣列，給每頁筆數塞資料
        for (startPage; startPage <= lastPage; startPage++) {
          if (getZoneInfo[startPage] !== undefined) {
            pageInfoAry[i].push(getZoneInfo[startPage]);
          }
        }
      }
      this.zoneInfo = pageInfoAry; // 該區資料格式，做成分頁，並丟回原ary

      // 塞分頁
      var pages = [];
      for (var i = 1; i <= this.pagesShow; i++) {
        pages.push(i);
      }
      this.pagesAry = pages;
    },
    paging: function(getPage) {
      this.zoneInfoPage = getPage - 1;
    },
    showGoogleMap: function(getData) {
      let self = this;
      console.log(self.zoneInfo[self.zoneInfoPage][getData]);
      console.log((self.showGMClick = self.showGMClick + 1));

      self.showGM = self.showGM == false ? true : false;
      self.zoneInfo[self.zoneInfoPage][getData].showGMap = self.zoneInfo[self.zoneInfoPage][getData].showGMap == false ? true : false;
      // self.showGM = false;
    },
  },
  props: {
    getDataPageProp: {
      type: Array,
      default: []
    },
    getDataProp: {
      type: Array,
      default: []
    },
    getZoneProp: {
      type: String,
      default: ''
    }
  },
  watch:{
    getZoneProp(newValue, oldValue) {
      let self = this;
      if(newValue != oldValue){
        self.zoneInfoPage = 0;
        self.pageAry(self.getDataProp);
      }
    }
  },
  computed:{
    zoneId (){
      return this.$route.params.zoneId
    },
    pageId (){
      return this.$route.params.pageId
    },
  }
}
</script>

<style lang="css" scoped>
</style>
