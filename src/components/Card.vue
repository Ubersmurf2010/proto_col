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
        <div class="py-2 bg-zinc-300 relative bg-transparent border-rose-100 cursor-pointer border rounded-s transition py-1 hover:translate-y-2 hover:shadow-xl"> 
            <div class="flex justify-between"> 
                <img
                v-if="onClickFavourite"
                :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'" 
                alt="Like1"
                @click="onClickFavourite" 
                class="absolute top-2 left-2"
            />
            
            <img
                v-if="onClickAdd"
                @click="onClickAdd" 
                :src="!isAdded ? '/plus.svg' : '/checked.svg'" 
                alt="Plus"
                class="absolute top-20 left-20 h-14"/>

            <img :src="imageurl" alt="Cells"/>
            </div>
            <div class="text-center"> 
                <p class="mt-1">{{ title }}: {{ price }}</p>
            </div>
        </div>
    </div>
</template>