<script>
import { ref } from 'vue'

const isLogin = ref(false)

export default {
  data: () => ({
    registerActive: false,
    emailLogin: '',
    passwordLogin: '',
    emailReg: '',
    passwordReg: '',
    confirmReg: '',
    emptyFields: false
  }),

  methods: {
    doLogin() {
      if (this.emailLogin === 'iamlox@inbox.ru' && this.passwordLogin === '123') {
        alert('Permission acces')
        isLogin.value = true
        console.log(isLogin.value)
        // this.emptyFields = true;
      } else {
        alert('Permission denied')
      }
    },
    doRegister() {
      if (this.emailReg === '' || this.passwordReg === '' || this.confirmReg === '') {
        this.emptyFields = true
      } else {
        alert('You are now registered')
      }
    }
  }
}
</script>

<template>
  <div class="login-page">
    <transition name="fade">
      <div v-if="!registerActive"></div>
    </transition>

    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div v-if="!registerActive" v-bind:class="{ error: emptyFields }">
            <h1>Login required</h1>

            <form class="form-group">
              <input
                v-model="emailLogin"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
              <input
                v-model="passwordLogin"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <input type="submit" class="btn btn-primary" @click="doLogin" />

              <p>
                Don't have an account?
                <a href="#" @click="(registerActive = !registerActive), (emptyFields = false)"
                  >Sign up here</a
                >
              </p>
              <p><a href="#">Forgot your password?</a></p>
            </form>
          </div>

          <div v-else class="card register" v-bind:class="{ error: emptyFields }">
            <h1>Sign Up</h1>
            <form class="form-group">
              <input
                v-model="emailReg"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
              <input
                v-model="passwordReg"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <input
                v-model="confirmReg"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                required
              />
              <input type="submit" class="btn btn-primary" @click="doRegister" />
              <p>
                Already have an account?
                <a href="#" @click="(registerActive = !registerActive), (emptyFields = false)"
                  >Sign in here</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
