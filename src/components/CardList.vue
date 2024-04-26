<script setup>
import Card from './Card.vue'


defineProps({
    items: Array,
    isFavourites: Boolean
});

const emit = defineEmits(['addToFavourite, addToCart'])

</script>

<template> 
    <div class="grid grid-cols-6" v-auto-animate>
        <Card
            v-for="item in items"
            :key="item.id"
            :title="item.title" 
            :imageurl="item.imageurl" 
            :price="item.price"
            :isFavourite="item.isFavourite"
            :onClickFavourite="isFavourites ? null : () => emit('addToFavourite', item)"
            :onClickAdd="isFavourites ? null : () => emit('addToCart', item)"
            :id="item.id"
            :isAdded="item.isAdded"
        />
    </div>
</template>