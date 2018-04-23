<template lang="html">
  <!-- <div class="wrap" :class="{'memberToggle': isMemberToggle}"> -->
  <div class="wrap" >
    <div class="header" >
      <div class="header-bg">
        <!-- <h1>高雄旅遊資訊，您好</h1> -->
        <h1>高雄旅遊資訊</h1>
        <h2>{{loginName}}</h2>
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
          <!-- <div :data-area='zone' v-if='ifHotSuccess' v-for="zone in sortedZone" v-on:click='showDataZone(zone)' class="header-select-area area-purple">{{ zone }}</div> -->
          <div  v-if='ifHotSuccess' v-for="zone in sortedZone" v-on:click='showDataZone(zone)' class="header-select-area" >{{ zone }}</div>
        </div>
        <!-- <router-link tag="div" :to="{name: 'zoneInfo'}"  v-if='ifHotSuccess'></router-link> -->

        <!-- <input class="button is-primary" type="text" value="更改登入名稱" v-model="loginName2" @keydown="changdName"/> -->
      </div>

      <!-- <router-link :to="{name: 'appLogin'}">回Login</router-link> -->
      <!-- <router-link :to="{name: 'contentA'}">contentA</router-link> -->
      <!-- <router-link :to="{name: 'contentB'}">contentB</router-link> -->
      <!-- <router-link :to="{name: 'zoneInfo'}">zoneInfo</router-link> -->

      <!--<div class="memberShip" @click="account">-->
        <!--<font-awesome-icon :icon="['fas','user-circle']" size="2x" title="會員登入"/>-->
      <!--</div>-->
    </div>

    <!-- <zoneInfo :msg='father' v-if="flag"/> -->
    <!-- <zoneInfoView :getDataProp='getAjaxData' :getZoneProp='clickSelectedZone'/> -->

    <!-- <div class="content">
      <h2 id="content-areaFont" v-model='clickSelectedZone'>{{ clickSelectedZone }}</h2>
      <div class="content-infoCard-wrap">
        <div class="content-infoCard" v-for='(info, i) in zoneInfo[zoneInfoPage]'>
          <div class="content-infoCard-img" :class="{'changeImgMap': info.showGMap}">
            <img :src='info.Picture1'>
            <iframe width="100%" height="200" frameborder="0" allowfullscreen :src="'http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=' + info.Add + '&z=16&output=embed&t='"></iframe>
            <div class="infoGradient ">
              <h2 id="infoImgName">{{ info.Name }}</h2>
              <h2 id="infoImgZone">{{ info.Zone }}</h2>
            </div>
          </div>
          <ul class="content-infoCard-info ">
            <li id="infoDate">{{ info.Opentime }}</li>
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
    </div> -->
    <!-- <div class="memberShipList">
      <div class="memberShipHeader">會員帳號申請！</div>
      <div class="memberInput">
        <form id="formMemberID" @submit.prevent="validateForm">
            <div class="itemName">
              <input v-validate="{required:true,regex: /[\u4e00-\u9fa5 a-z A-Z]+$/}" name="name" type="text" placeholder="姓名" v-model="loginData.email">
              <span v-show="errors.firstByRule('name','required')">請輸入您的姓名</span>
              <span v-show="errors.firstByRule('name','regex')">限輸入中文和英文</span>
            </div>
            <div class="itemPassword">
              <input v-validate="'required|max:6'" type="password" name="password" placeholder="密碼 (密碼長度為6，需包含英數字)" v-model="loginData.password">
              <span v-show="errors.firstByRule('password','required')">請輸入密碼</span>
              <span v-show="errors.firstByRule('password','max')">長度為6碼</span>
            </div>
            <div class="itemPhone">
              <input v-validate="'required|min:10|max:10|numeric'" name="phone" type="text" placeholder="手機" v-model="phoneVale">
              <span v-show="errors.firstByRule('phone','required')">請輸入手機號碼</span>
              <span v-show="errors.firstByRule('phone','max')">長度為10碼</span>
              <span v-show="errors.firstByRule('phone','min')">長度為10碼</span>
              <span v-show="errors.firstByRule('phone','numeric')">限輸入數字</span>
            </div>
            <div class="itemEmail">
              <input v-validate="'required|email'" name="email" type="text" placeholder="Email" v-model="emailVale">
              <span v-show="errors.firstByRule('email','required')">請輸入信箱</span>
              <span v-show="errors.firstByRule('email','email')">此信箱無效</span>
            </div>

            <button class="button is-primary" type="submit" name="button">Sign up</button>
        </form>
      </div>
    </div>
    <div class="memberShipListSuccess" :class="{memberShipListSuccessShow: isMemberShipListSuccessShow}">
      <div class="memberShipHeader memberShipHeaderSuccess ">申請成功！</div>
      <div class="memberInput memberInputSuccess ">
        <h2>以下是您的註冊資料</h2>
        <br>
        <br>
        <p>
          姓名: <span id="nameShowID">{{nameVale}}</span>
          <br>密碼: <span id="passwordShowID">{{passwordVale}}</span>
          <br>手機: <span id="phoneShowID">{{phoneVale}}</span>
          <br>信箱: <span id="emailShowID">{{emailVale}}</span></p>
      </div>
    </div>
    <div class="wrapmask" :class="{wrapmaskShow:isWrapmaskShow}" v-on:click='accountRemove'></div> -->

    <!-- <button type="button" @click="goPage('contentA')">aaaaaaa</button>
    <button type="button" @click="goPage('contentB')">bbbbbbb</button> -->

    <router-view :getDataPageProp='zoneInfo' :getDataProp='thisZone' :getZoneProp='clickSelectedZone'></router-view>
    <!-- <router-link tag="div" :to="{name: 'zoneInfo'}"  v-if='ifHotSuccess'></router-link> -->


    <appFooter/>
  </div>
</template>

<script>
import axios from "axios";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
fontawesome.library.add(solid);
import VeeValidate from "vee-validate";
import zoneInfoView from './pages/content-zoneInfo.vue';
import appFooter from './appFooter';

export default {
  data() {
    return {
      loginFormat: {
        email: '',
        password: ''
      },
      loginData: {},
      loginName2:'',
      getAjaxData: [],
      // getAjaxData: '',
      flag: false,
      allZone: [], // 紀錄-'所有'行政區
      noRepeatZone: [], // 紀錄-未重複的行政區
      repeatZone: [], // 紀錄-各行政區的'重複'數量
      sortedZone: [], // 紀錄-repeatZone'由大至小'排序
      thisZone: [], // 紀錄-該區要顯示的資料
      ifHotLoading: true, //  資料loading中
      ifHotError: false, //  資料錯誤
      ifSelectZone: false, //  行政區select
      ifHotSuccess: false, //  熱門行政區
      selectedZone: null,
      clickSelectedZone: null,  // 綁定點選的區域名
      zoneInfo: [],
      pagesNum: 6, // 每頁顯示筆數
      pagesShow: 0, // 紀錄-總頁數
      pagesAry: [],
      page: 0,
      zoneInfoPage: 0,
      // showGM: false, // 判斷是否顯示地圖
      // showGMClick: 0, // 測試按地圖而已
      isMemberToggle: false,
      isWrapmaskShow: false,
      dataFather: '父組件content', // 測試父組件傳到子組件的data
      nameVale: "",
      accountVale: "",
      passwordVale: "",
      phoneVale: "",
      emailVale: "",
      namePromptBasic: false, // 姓名基本
      namePrompt: false, //姓名限輸入中文、英文
      accountPromptIf: false,
      accountPrompt: "",
      accountPromptLength: false,
      accountPromptFormat: false,
      passwordBasicPrompt: false, //密碼基本
      passwordPromptLength: false, //密碼限輸入6碼 (英+數)
      passwordPromptFormat: false, //密碼限輸入6碼 (英+數)
      phonePromptBasic: false, // 電話基本
      phonePrompt: false,
      phonePromptNum: false, // 電話限輸入數字
      phonePromptLength: false, // 電話長度
      basicEmailPrompt: false, // 信箱基本
      emailPrompt: false,
      memberCheck: false,
      isMemberShipListSuccessShow: false
    };
  },
  mounted: function () {
    this.getData();
    this.ifHotLoading = true;
  },
  updated: function(){
    var elHotZoneAry = document.querySelectorAll('.header-select-area');
    console.log(elHotZoneAry.length);
    for (var i = 0; i < elHotZoneAry.length; i++) {
        if (i == 0) {
            elHotZoneAry[i].className += " area-purple";
        } else if (i == 1) {
            elHotZoneAry[i].className += " area-orange";
        } else if (i == 2) {
            elHotZoneAry[i].className += " area-yellow";
        } else if (i == 3) {
            elHotZoneAry[i].className += " area-blue";
        }
    }
  },
  methods: {
    setLoginData (){
      this.loginData = window.$.extend(true, {}, this.loginFormat)
    },
    changdName (){
      this.$store.dispatch('updateMessage', this.loginName2);
    },
    goPage(cname) {
      this.$router.replace({ name: cname})
    },
    getData: function () {
      let self = this;
      axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(function (response) {
          console.log('success appCountent');
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
      let self = this;
      for (var i = 0; i < ajaxData.length; i++) {
        ajaxData[i].showGMap = false;
      }
      this.filterZone(ajaxData);
      this.filterHotZone(ajaxData);
    },
    filterZone: function (ajaxData) {
      let self = this;
      for (var i = 0; i < ajaxData.length; i++) {
        this.allZone.push(ajaxData[i].Zone);
      }
      if (ajaxData) {
        this.ifSelectZone = true;
        this.ifHotSuccess = true;
      }
      this.noRepeatZone.push("--請選擇行政區--");
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
      // console.log(this.repeatZone);
      this.sortedZone = Object.keys(this.repeatZone).sort(function (a, b) {
        return self.repeatZone[b] - self.repeatZone[a];
      });
      self.sortedZone.length = 4;
    },
    showDataZone: function (country) {
      let self = this;
      this.clickSelectedZone = country;
      console.log(country);
      // console.log(event.target.textContent); // 列出點選到的text

      var info = []; //該區所有資料
      for (var i = 0; i < self.getAjaxData.length; i++) {
        if (country == self.getAjaxData[i].Zone) {
          info.push(self.getAjaxData[i]);
        }
      }
      self.thisZone = info;
      self.pageAry(info); // 該區資料丟到func做分頁

      this.$router.push({ name: 'zoneInfo' ,params: {zoneId:country ,pageId:'1'}});
    },
    pageAry: function (getZoneInfo) {
      var pagesStr = "";
      console.log(getZoneInfo);
      // 用ary存取分頁資料
      this.pagesShow = Math.ceil(getZoneInfo.length / this.pagesNum);
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
    paging: function (getPage) {
      this.zoneInfoPage = getPage - 1;
    },
    // showGoogleMap: function (getData) {
    //   let self = this;
    //   console.log(self.zoneInfo[self.zoneInfoPage][getData]);
    //   console.log((self.showGMClick = self.showGMClick + 1));

    //   self.showGM = self.showGM == false ? true : false;
    //   self.zoneInfo[self.zoneInfoPage][getData].showGMap = self.zoneInfo[self.zoneInfoPage][getData].showGMap == false ? true : false;
    //   // self.showGM = false;
    // },
    account: function () {
      let self = this;
      self.isMemberToggle = self.isMemberToggle == false ? true : false; // 控制帳號申請 true false
      self.isWrapmaskShow = self.isWrapmaskShow == false ? true : false; // 控制背景黑 true false
      self.cleanAccount();
    },
    cleanAccount: function () {
      let self = this;
      self.nameVale = null;
      self.passwordVale = "";
      self.phoneVale = "";
      self.emailVale = "";
      self.$validator.reset();
      console.log('in cleanAccount');
    },
    accountRemove: function () {
      let self = this;
      self.isMemberToggle = false;
      self.isWrapmaskShow = false;
      self.isMemberShipListSuccessShow = false;
    },
    validateForm() {
      let self = this;
      self.$validator.validateAll().then((result) => {
        if (result) {
          alert('資料匯入成功!');
          self.isMemberToggle = self.isMemberToggle == false ? true : false; // 控制帳號申請 true false
          self.isMemberShipListSuccessShow = self.isMemberShipListSuccessShow == false ? true : false;
        } else {
          alert('資料有誤!');
        }
      });
    },
  },
  components: {
    "appFooter": appFooter,
    "zoneInfoView": zoneInfoView,
    "font-awesome-icon": FontAwesomeIcon,
  },
  computed: {
    loginName() {
      return this.$store.getters.getLoginName
    },
  },
};
</script>

<style lang="css" scoped>
svg {
  color: #559ac8;
}
</style>
