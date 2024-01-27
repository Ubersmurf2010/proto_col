<script setup> 
    import Cartitem from './Cartitem.vue'
    import { inject } from 'vue';

    const { cart, removeFromCart } = inject('cart')

</script>

<template>
    <div class="flex flex-col flex-1 gap-5 justify-between" v-auto-animate>
        <Cartitem 
            v-for="item in cart"
            :key="item.id"
            :title="item.title"
            :price="item.price"
            :imageurl="item.imageurl"
            @onClickRemove="() => removeFromCart(item)"
        />
    </div>

</template>