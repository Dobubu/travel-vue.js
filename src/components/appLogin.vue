<template lang="html">
    <div>
        <div class="loginList">
            <div class="memberShipHeader">會員登入</div>
            <div class="memberInput">
              <form id="formMemberID" @submit.prevent="validateBeforeSubmit">
                  <div class="itemName"><i class="fal fa-user"></i>
                    <input v-validate="{required:true,regex: /[\u4e00-\u9fa5 a-z A-Z]+$/}" name="name" v-model="name" type="text" placeholder="姓名">
                    <span v-show="errors.firstByRule('name','required')">請輸入您的姓名</span>
                    <span v-show="errors.firstByRule('name','regex')">限輸入中文和英文</span>
                  </div>
                  <div class="itemPassword">
                    <input v-validate="'required|max:6'" type="password" name="password" placeholder="密碼 (密碼長度為6，需包含英數字)">
                    <span v-show="errors.firstByRule('password','required')">請輸入您的密碼</span>
                    <span v-show="errors.firstByRule('password','max')">密碼長度為6碼</span>
                  </div>
                  <!-- <button type="submit" value="登入">登入</button> -->
                  <router-link :to="{path: '/appContent'}" tag="input" value="登入" type="submit">登入</router-link>
              </form>


              <!-- <form id="formMemberID" name="form1" method="post" action="" onclick="return false">
                  <div class="itemName"><i class="fal fa-user"></i>
                      <input type="text" name="name" id="nameID" placeholder="帳號"><span></span>
                  </div>
                  <div class="itemPassword">
                      <input type="password" name="password" id="passwordID" max="6" placeholder="密碼 (密碼長度為6，需包含英數字)"><span></span>
                  </div>
                  <router-link :to="{path: '/appContent'}" tag="input" value="登入" type="submit">登入</router-link>
              </form> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'form-example',
  data: () => ({
    name: '',
    password: ''
  }),
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('資料匯入成功!');
          this.$router.push({name: 'appContent'});
          return;
        }

        alert('尚有表格未填!');
      });
    },
  }
};
</script>

<style lang="css" scoped>
</style>
