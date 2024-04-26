<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  import CardList from '../components/CardList.vue';

const favourites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get(`https://ef76c4debc7d2948.mokky.dev/favourites?_relations=items`)
        
    favourites.value = data.map((obj) => obj.item)
    console.log(favourites)
    } catch (err) {
        console.log(err)
    }
});


</script>

<template>
    <h2 > Controversial cells </h2>
    <div class="mt-10">
        <CardList :items="favourites" is-favourites/>
    </div>
</template>