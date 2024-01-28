<script setup>
  const emit = defineEmits(['openDrawer'])
  defineProps({
    totalPrice: Number
  })
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4"> 
        <img src="/logo.jpeg" alt="Logo" class="w-10"/>
        <div>
          <h2 class="text-xl font-bold uppercase"> online-form</h2>
          <p class="text-slate-500"> Test poligon</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-3">
      <li @click="() => emit('openDrawer')" class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
        <img src="/trasher.png" alt="Cart" /> 
        <b> {{ totalPrice }} points</b>
      </li>

      <router-link to="/favourites">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" /> 
          <span>For review?</span>
        </li>
      </router-link>

      <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
        <img src="/profile.svg" alt="Cart" /> 
        <span> Profile </span>
      </li>
    </ul>
  </header>
</template>