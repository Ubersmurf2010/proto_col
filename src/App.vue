<script setup>
import { watch, provide, computed, ref } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Cart (START)*/
const cart = ref([])
const drawerOpen = ref(false)
const totalCartPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalCartPrice.value * 5) / 100 ))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const removeFromCart = async (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded=false
}

const addToCart = async (item) => {
  if (!item.isAdded) {
    item.isAdded=true
    cart.value.push(item)
}
}

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, {deep: true}
)

provide('cart', {
  cart,
  closeDrawer, 
  openDrawer,
  addToCart,
  removeFromCart
})
/* Cart (END)*/
</script>


<template>
  <div class="bg-neutral-100 w-4/5 m-auto h-full rounded-xl shadow-2xl mt-14">
    <Header
      :total-price="totalCartPrice"
      @open-drawer="openDrawer"
    />
    <Drawer
      :total-price="totalCartPrice" 
      :vat-price="vatPrice"
      v-if="drawerOpen"
      :cart-button-disabled="cartButtonDisabled"
    />
    <div class="p-10">
      <router-view>
      </router-view>
    </div>
  </div>
</template>
