<script setup>

defineProps({
        id: Number,
        title: String,
        imageurl: String,
        price: Number,
        isFavourite: Boolean,
        isAdded: Boolean,
        onClickAdd: Function,
        onClickFavourite: Function
    })


</script>


<template> 
    <div>
        <div class="relative bg-white cursor-pointer border border-slate-100 rounded-3xl transition py-1 hover:translate-y-2 hover:shadow-xl"> 
            <img
                v-if="onClickFavourite"
                :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'" 
                alt="Like1"
                @click="onClickFavourite" 
                class="absolute top-0 left-1"
            />
            <img :src="imageurl" alt="Sneaker"/>
            <p class="mt-1">{{ title }}: {{ price }}</p>

            <div class="flex justify-between">
            <img
                v-if="onClickAdd"
                @click="onClickAdd" 
                :src="!isAdded ? '/plus.svg' : '/checked.svg'" 
                alt="Plus"/>
            </div>
        </div>
    </div>
</template>