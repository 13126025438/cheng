<template>
  <div id="login">
    <div class="container_login" :class="isLoRe ? '' : 'sign-up-mode'">
      <div class="form-warp">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm sign-in-form"
        >
          <h2 class="form-title">登录</h2>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button class="submit-btn" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-form
          :model="register"
          status-icon
          :rules="reg_rules"
          ref="register"
          label-width="100px"
          class="demo-ruleForm sign-up-form"
        >
          <h2 class="form-title">注册</h2>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submitReg('register')"
              >注册</el-button
            >
            <el-button class="submit-btn" @click="resetReg('register')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="desc-warp">
        <div class="desc-warp-item sign-up-desc">
          <div class="content">
            <button id="sign-up-btn" @click="tab">注册</button>
          </div>
          <img src="../../assets/img/login/log.svg" alt="" />
        </div>
        <div class="desc-warp-item sign-in-desc">
          <div class="content">
            <button id="sign-in-btn" @click="tab">登录</button>
          </div>
          <img src="../../assets/img/login/register.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import '../../unjs/login'
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      isLoRe: true, //注册，登录
      ruleForm: {
        username: "czc1",
        password: "123123",
      },
      register: {
        username: "",
        password: "",
      },
      reg_rules: {
        username: [
          { required: true, message: "请输入用户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ],
      },
      rules: {
        username: [
          { required: true, message: "请输入用户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    ...mapMutations('user',['login_set_info']),
    tab() {
      this.isLoRe = !this.isLoRe;
      // console.log(this.isLoRe)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         console.log(this.ruleForm);
         let {username,password} = this.ruleForm;

         this.$api.user.login({
            username,password
         }).then(res =>{
            console.log(res.data.data)
            localStorage.setItem('user',JSON.stringify(res.data.data));
            this.login_set_info(res.data.data);
            this.$router.push('/')
         })


        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitReg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetReg(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #333;
}

.container_login {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.container_login::before {
  content: " ";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background-image: linear-gradient(-45deg, #6266f5 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  z-index: 6;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
}
.container_login.sign-up-mode::before {
  transform: translate(100%, -50%);
}

.form-warp {
  width: 50%;
  position: absolute;
  z-index: 5;
  left: 75%;
  top: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
  transition: 1s 0.7s ease-in-out;
}
.form-warp form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  /* 将两个 form 布局在 grid 同一位置 */
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  transition: all 0.2s 0.7s;
  opacity: 1;
  z-index: 4;
}
.form-title {
    display: block;
    margin-left: 80px;
  color: #6266f5;
}
.form-warp .sign-up-form {
  opacity: 0;
  z-index: 3;
}
.container_login.sign-up-mode .form-warp {
  left: 25%;
}
.container_login.sign-up-mode .sign-in-form {
  opacity: 0;
  z-index: 3;
}
.container_login.sign-up-mode .sign-up-form {
  opacity: 1;
  z-index: 4;
}
input,
.submit-btn {
  min-width: 300px;
  outline: none;
  padding: 12px 30px;
  line-height: 1;
  font-size: 16px;
  border-radius: 60px;
  color: #333;
  background-color: #6267f513;
  border: none;
}
input::placeholder {
  color: #cccc;
}
.submit-btn {
  background-color: #6266f5;
  color: #fff;
  text-align: center;
  min-width: 100px;
  font-size: initial;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
}

.desc-warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.desc-warp-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  text-align: center;
  padding: 3rem 17% 2rem 12%;
  z-index: 6;
}
/* 事件穿透 BEGIN */
.sign-in-desc {
  pointer-events: none;
}
.sign-up-mode .sign-in-desc {
  pointer-events: all;
}
.sign-up-mode .sign-up-desc {
  pointer-events: none;
}
/* 事件穿透 END */
.content {
  width: 100%;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}
.sign-in-desc img,
.sign-in-desc .content {
  transform: translateX(800px);
}
.sign-up-mode .sign-in-desc img,
.sign-up-mode .sign-in-desc .content {
  transform: translateX(0);
}

.sign-up-mode .sign-up-desc img,
.sign-up-mode .sign-up-desc .content {
  transform: translateX(-800px);
}

button {
  outline: none;
  padding: 6px 8px;
  min-width: 100px;
  text-align: center;
  border-radius: 30px;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
button:active {
  background: rgba(255, 255, 255, 0.1);
}
img {
  width: 100%;
  display: block;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.5s;
}

/* 响应式 */
@media screen and (max-width: 870px) {
  .container_login::before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .container_login.sign-up-mode::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }
  .form-warp {
    width: 100%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .container_login.sign-up-mode .form-warp {
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  img {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.7s;
  }
  .desc-warp {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .desc-warp-item {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }
  .sign-in-desc {
    grid-row: 3 / 4;
  }

  .sign-in-desc img,
  .sign-in-desc .content {
    transform: translateY(800px);
  }

  .sign-up-mode .sign-in-desc img,
  .sign-up-mode .sign-in-desc .content {
    transform: translateY(0);
  }

  .sign-up-mode .sign-up-desc img,
  .sign-up-mode .sign-up-desc .content {
    transform: translateY(-800px);
  }
}

@media screen and (max-width: 570px) {
  .container_login::before {
    bottom: 72%;
    left: 50%;
  }
  img {
    display: none;
  }
}
</style>