<script>
import { ref } from "vue";
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date

const timerElapsed = ref(0);
const timer = ref(undefined);
const ditance = ref(0);
const lastCall = ref(0);
const currentCall = ref(0);

export default {
  // props: ["year", "month", "date", "hour", "minute", "second", "milisecond"],
  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    displayMiliSeconds: 0,
    loaded: false,
    expired: false,
    startEnabled: true
  }),

  
  computed: {
    _miliseconds: () => 1,
    _seconds() {
      return this._miliseconds * 1000
    },
    _minutes() {
      return this._seconds * 60
    },
    _hours() {
      return this._minutes * 60
    },
    _days() {
      return this._hours * 24
    },
    endDate() {
      return new Date(this.year, this.month, this.date, this.hour, this.minute, this.second)
    }
  },
  
  mounted() {
    console.log("Welcome onboard, captain!")
    this.startTimer()
    ditance.value = this.SetTimer(1, 0, 0, 0, 0, 0)
  },
  
  methods: {
    formatNum: (num) => (num < 10 ? '0' + num : num),
    SetTimer(year_, month_, date_, hour_, minute_, second_) {
      const now = new Date()
      const currentYear = now.getFullYear() + year_
      const currentMonth = now.getMonth() + month_
      const currentDate = now.getDate() + date_
      const currentHour = now.getHours() + hour_
      const newMinutes = now.getMinutes() + minute_
      const currentSeconds = now.getSeconds() + second_

      return new Date(
        currentYear,
        currentMonth,
        currentDate,
        currentHour,
        newMinutes,
        currentSeconds
      )
    },
    SetPrepareTimer() {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth()
      const currentDate = now.getDate()
      const currentHour = now.getHours()
      const newMinutes = now.getMinutes() + 1
      const currentSeconds = now.getSeconds() + 1

      return new Date(
        currentYear,
        currentMonth,
        currentDate,
        currentHour,
        newMinutes,
        currentSeconds
      )
    },
    startTimer() {
      this.startEnabled = false
      try {
        this.showRemaining()  
        // get current date
        currentCall.value = Date.now()
        // calculate difference
        var elapsed = currentCall.value - lastCall.value
        var elaps = new Array()
        // days
        elaps[4] = Math.floor(elapsed / 8640000)
        // hours
        elaps[3] = Math.floor(elapsed / 360000)
        // minutes
        elaps[2] = Math.floor(elapsed / 60000)
        // seconds
        elaps[1] = Math.floor(elapsed / 1000)
        // miliseconds
        elaps[0] = elapsed % 1000

        ditance.value.setDate(ditance.value.getDate() + elaps[4])
        ditance.value.setHours(ditance.value.getHours() + elaps[3])
        ditance.value.setMinutes(ditance.value.getMinutes() + elaps[2])
        ditance.value.setSeconds(ditance.value.getSeconds() + elaps[1] + 1)
      } catch (err) {
        console.log(err)
      }
    },

    setTimer() {
      this.start = true
      // set prepare time (1 minute)
      ditance.value = this.SetTimer(0, 0, 0, 0, 1, 0)
    },

    pauseTimer() {
      this.startEnabled = true
      // get lastCall <> date
      lastCall.value = Date.now()
      clearInterval(timer.value)
    },

    restartTimer() {
      ditance.value = this.SetPrepareTimer()
    },
    FiveMinuteTimer() {
      ditance.value = this.SetTimer(0, 0, 0, 0, 5, 1)
    },
    TwoMinuteTimer() {
      ditance.value = this.SetTimer(0, 0, 0, 0, 2, 1)
    },

    showRemaining() {
      timer.value = setInterval(() => {
        
        this.expired = false
        const now = new Date()
        timerElapsed.value = ditance.value - now.getTime()
        const days = Math.floor(timerElapsed.value / this._days)
        const hours = Math.floor((timerElapsed.value % this._days) / this._hours)
        const minutes = Math.floor((timerElapsed.value % this._hours) / this._minutes)
        const seconds = Math.floor((timerElapsed.value % this._minutes) / this._seconds)
        const miliseconds = Math.floor((timerElapsed.value % this._seconds) / this._miliseconds)

        this.displayMinutes = this.formatNum(minutes)
        this.displaySeconds = this.formatNum(seconds)
        this.displayHours = this.formatNum(hours)
        this.displayDays = this.formatNum(days)
        this.displayMiliSeconds = this.formatNum(miliseconds)
        this.loaded = true
        

        if (timerElapsed.value < 0) {
          clearInterval(timer.value)
          this.expired = true
          return
        }
      }, 1000)
    }
  }
}
</script>

<template>
  <h5 v-if="!startEnabled">Time has passed</h5>
  <div v-if="loaded">
    <section
      class="text-3xl flex justify-center content-center flex-col mx-auto text-center"
    ></section>
    <h5 v-if="expired">Time is over</h5>
    <section class="flex text-6xl justify-center content-center">
      <div class="days mr-2 text-9xl relative">
        {{ displayDays }}
        <div class="label text-sm absolute bottom-0">days</div>
      </div>
      <span class="leading-snug text-8xl">:</span>
      <div class="days mx-2 text-9xl relative">
        {{ displayHours }}
        <div class="label text-sm absolute bottom-0">hour</div>
      </div>
      <span class="leading-snug text-8xl ">:</span>

      <div class="days mx-2 text-9xl relative">
        {{ displayMinutes }}
        <div class="label text-sm absolute bottom-0">minutes</div>
      </div>
      <span class="leading-snug text-8xl">:</span>

      <div class="days ml-2 text-9xl relative">
        {{ displaySeconds }}
        <div class="label text-sm absolute bottom-0">seconds</div>
      </div>
      <span class="leading-snug text-8xl">:</span>

      <div class="days ml-2 text-9xl relative">
        {{ displayMiliSeconds }}
        <div class="label text-sm absolute bottom-0">miliseconds</div>
      </div>

    </section>
  </div>
  <div>
    <button
      v-if="startEnabled"
      class="disabled:bg-slate-400 cursor pointer transition bg-lime-500 w-full rounded-xl my-3 py-3 text-white hover:bg-lime-600 active:bg-lime-700" 
      @click="() => startTimer()">Start</button>
    <button
      class="disabled:bg-slate-400 cursor pointer transition bg-red-500 w-full rounded-xl my-3 py-3 text-white hover:bg-red-600 active:bg-red-700" 
      @click="() => FiveMinuteTimer()">Set 5 min.</button>
    <button
      class="disabled:bg-slate-400 cursor pointer transition bg-red-500 w-full rounded-xl my-3 py-3 text-white hover:bg-red-600 active:bg-red-700" 
      @click="() => TwoMinuteTimer()">Set 2 min.</button>
    <button 
      class="disabled:bg-slate-400 cursor pointer transition bg-blue-500 w-full rounded-xl my-3 py-3 text-white hover:bg-blue-600 active:bg-blue-700" 
      @click="() => restartTimer()">Restart</button> 
    <button
      class="disabled:bg-slate-400 cursor pointer transition bg-yellow-500 w-full rounded-xl my-3 py-3 text-white hover:bg-yellow-600 active:bg-yellow-700" 
      @click="() => pauseTimer()">Pause</button> 
    <button
      class="disabled:bg-slate-400 cursor pointer transition bg-pink-500 w-full rounded-xl my-3 py-3 text-white hover:bg-pink-600 active:bg-pink-700" 
      @click="() => setTimer()">Set</button>
    <input type="text">

  </div>
</template>

<style scoped></style>
