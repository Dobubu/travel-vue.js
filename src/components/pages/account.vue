<template lang="html">
  <div>
    <p>pages account</p>
    <div class="memberShipList">
      <div class="memberShipHeader">會員帳號申請！</div>
      <div class="memberInput">
        <form id="formMemberID" @submit.prevent="validateForm">
            <div class="itemName">
              <input v-validate="{required:true,regex: /[\u4e00-\u9fa5 a-z A-Z]+$/}" name="name" type="text" placeholder="姓名" v-model="nameVale">
              <!-- <input v-validate="{required:true,regex: /[\u4e00-\u9fa5 a-z A-Z]+$/}" name="name" type="text" placeholder="姓名" v-model="loginData.email"> -->
              <span v-show="errors.firstByRule('name','required')">請輸入您的姓名</span>
              <span v-show="errors.firstByRule('name','regex')">限輸入中文和英文</span>
            </div>
            <div class="itemPassword">
              <input v-validate="'required|max:6'" type="password" name="password" placeholder="密碼 (密碼長度為6，需包含英數字)" v-model="passwordVale">
              <!-- <input v-validate="'required|max:6'" type="password" name="password" placeholder="密碼 (密碼長度為6，需包含英數字)" v-model="loginData.password"> -->
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

            <button class="memberBtn memberAccountBtn" type="submit" name="button">註冊帳號</button>
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
    <div class="wrapmask" :class="{wrapmaskShow:isWrapmaskShow}" v-on:click='accountRemove'></div>
  </div>
</template>

<script>
import VeeValidate from "vee-validate";

export default {
  data() {
    return {
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
      isMemberToggle: false,
      isWrapmaskShow: false,
      isMemberShipListSuccessShow: false
    }
  },
  methods: {
    account: function() {
      let self = this;
      self.isMemberToggle = self.isMemberToggle == false ? true : false; // 控制帳號申請 true false
      self.isWrapmaskShow = self.isWrapmaskShow == false ? true : false; // 控制背景黑 true false
      self.cleanAccount();
    },
    cleanAccount: function() {
      let self = this;
      self.nameVale = null;
      self.passwordVale = "";
      self.phoneVale = "";
      self.emailVale = "";
      self.$validator.reset();
      console.log('in cleanAccount');
      // self.errors.clear();

      // this.$nextTick(() => {
      //this.fields.reset && this.fields.reset();
      // self.$validator.clean && self.$validator.clean();
      // });
    },
    accountRemove: function() {
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
  }
}
</script>

<style media="screen">
  .memberShipList {
    visibility: visible;
    opacity: 1;
  }
</style>
