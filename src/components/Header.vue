<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-black border-b border-slate-300 px-8 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.jpeg" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Major League's</h2>
          <p class="text-slate-500">V2.1</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-3">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img class="w-8 h-8" src="/trasher.png" alt="Cart" />
        <b> {{ totalPrice }} очков</b>
        <span>Составить протокол</span>
      </li>

      <router-link to="/favourites">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>Лучшие ячейки</span>
        </li>
      </router-link>

      <router-link to="/countdown">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/emoji-2.png" width="50" height="50" alt="Cart" />
          <span>Таймер</span>
        </li>
      </router-link>

      <router-link to="/login">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/profile.svg" alt="Cart" />
          <span>Логин</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
