<template lang="html">
    <div>
        <div class="loginList">
            <div class="memberShipHeader">會員登入</div>
            <div class="memberInput">
                <form id="formMemberID" name="form1" method="post" action="" onclick="return false">
                    <div class="itemName"><i class="fal fa-user"></i>
                        <input type="text" name="name" id="nameID" placeholder="帳號"><span></span>
                        <!-- <span>限輸入中文、英文</span> -->
                    </div>
                    <div class="itemPassword">
                        <input type="password" name="password" id="passwordID" max="6" placeholder="密碼 (密碼長度為6，需包含英數字)"><span></span>
                        <!-- <span>限輸入6碼 (英+數)</span> -->
                    </div>
                    <router-link :to="{path: '/appContent'}" tag="input" value="登入">登入</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style lang="css" scoped>
</style>
