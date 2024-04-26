<script>
export default {
  // props: ["year", "month", "date", "hour", "minute", "second", "milisecond"],
  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    loaded: false,
    expired: false
  }),
  computed: {
    _seconds: () => 1000,
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
    },
    endTimer() {
      return new Date(2024, 4, 22, 10, 10, 10)
    },
    SetAttempTimer() {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth()
      const currentDate = now.getDate()
      const currentHour = now.getHours()
      const newMinutes = now.getMinutes() + 5
      const currentSeconds = now.getSeconds()

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
      const currentSeconds = now.getSeconds()

      return new Date(
        currentYear,
        currentMonth,
        currentDate,
        currentHour,
        newMinutes,
        currentSeconds
      )
    }
  },

  mounted() {
    this.showRemaining()
  },

  methods: {
    formatNum: (num) => (num < 10 ? '0' + num : num),

    setime() {
      if (true) {
        return this.SetAttempTimer.getTime()
      } else {
        return this.SetPrepareTimer.getTime()
      }
    },

    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date()
        // const end = this.setDate()
        const ditance = this.setime() - now.getTime()

        if (ditance < 0) {
          clearInterval(timer)
          this.expired = true
          return
        }
        const days = Math.floor(ditance / this._days)
        const hours = Math.floor((ditance % this._days) / this._hours)
        const minutes = Math.floor((ditance % this._hours) / this._minutes)
        const seconds = Math.floor((ditance % this._minutes) / this._seconds)

        this.displayMinutes = this.formatNum(minutes)
        this.displaySeconds = this.formatNum(seconds)
        this.displayHours = this.formatNum(hours)
        this.displayDays = this.formatNum(days)
        this.loaded = true
      }, 1000)
    }
  }
}
</script>

<template>
  <div v-if="loaded">
    <section
      class="text-3xl flex justify-center content-center flex-col mx-auto text-center"
    ></section>
    <h5 v-if="expired">Hello</h5>
    <section class="flex text-6xl justify-center content-center">
      <div class="days mr-2 relative">
        {{ displayDays }}
        <div class="label text-sm absolute bottom-0">days</div>
      </div>
      <span class="leading-snug">:</span>
      <div class="days mx-2 relative">
        {{ displayHours }}
        <div class="label text-sm absolute bottom-0">hour</div>
      </div>
      <span class="leading-snug">:</span>

      <div class="days mx-2 relative">
        {{ displayMinutes }}
        <div class="label text-sm absolute bottom-0">minutes</div>
      </div>
      <span class="leading-snug">:</span>

      <div class="days ml-2 relative">
        {{ displaySeconds }}
        <div class="label text-sm absolute bottom-0">seconds</div>
      </div>
    </section>
  </div>
  <div>
    <button>Add minutes</button>
  </div>
</template>

<style scoped></style>
