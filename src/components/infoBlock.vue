<script setup>
    defineProps({
        title: String,
        description: String,
        imageurl: String
    })
</script>


<template>
    <div class="flex flex-col items-center text-center mt-1 w-72">
        <img
        alt="info image"
        :src="imageurl" 
        height="70"
        width="70"
    />
    <h2
        class="mt-4 text-2xl font-medium"
    > 
    {{ title }} </h2>
    <p
        class="text-gray-400"
    > {{ description }} </p>

    </div>

</template>