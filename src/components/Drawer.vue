<script setup>
import axios from 'axios';
import { inject, ref, computed } from 'vue';

import DrawerList from './DrawerList.vue'
import CartitemList from './CartitemList.vue'
import infoBlock from './infoBlock.vue';


const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
})

const { 
    cart
}
 = inject('cart')

const isCreating = ref(false)
const orderid = ref(null)


const createOrder = async () => {
try {
    isCreating.value = true
    const { data } = await axios.post(`https://ef76c4debc7d2948.mokky.dev/orders`, {
        items: cart.value,
        totalPrice: props.totalPrice
    })
    cart.value = []
    orderid.value = data.id
    return data
    } catch (err) {
        console.log(err)
    } finally {
        isCreating.value = false
    }
}
const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value )

</script>

<template> 
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-3/12 h-full fixed right-0 top-0 z-20 p-10" >
        <DrawerList />
            
        <div v-if="!totalPrice || orderid" class="flex h-full items-center">
            <infoBlock
                v-if="!totalPrice && !orderid"
                title="Waiting for attempt" 
                description="" 
                imageurl="/package-icon.png"
            />
            <infoBlock
                v-if="orderid"
                title="protocol formed successfully" 
                :description="`protocol with ID ${orderid} ready for 5 seconds`"
                imageurl="/order-success-icon.png"
            />
        </div>
    
        <div v-else>
            <CartitemList />
            <div v-if="totalPrice" class="flex flex-col gap-4 my-8">
                <div class="flex gap-2">
                    <span> Total points: </span>
                    <div class="flex-1 border-b border-dashed"></div>
                        <b> {{ totalPrice }}</b>
                    </div>
                <!-- <div class="flex gap-2 items-end">
                      <span> F </span>
                    <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ vatPrice }} $</b>
                    </div>
                    -->
                <button
                    :disabled="cartButtonDisabled"
                    @click="createOrder"
                    class="disabled:bg-slate-400 cursor pointer transition bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700">
                    Get protocol
                </button>
            </div>
        </div>
    </div>
</template>