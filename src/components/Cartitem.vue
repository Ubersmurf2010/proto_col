 <script setup>
    defineProps( {
        id: Number,
        title: String,
        imageurl: String,
        price: Number
    })

const emit = defineEmits(['onClickRemove'])
</script>
 
 <template>
    <div class="flex border p-4 rounded-xl gap-4 items-center">
        <img class="w-16 h-16" :src="imageurl" :alt="title"/>
        <div class="flex flex-col flex-1"> 
                <p> {{ title }}</p>
                <div class="flex justify-between mt-2"> 
                    <b class="flex-1"> {{  price }}</b>
                    <img
                        class="opacity-30 hover:opacity-100 cursor-pointer transition " 
                        src="/close.svg"
                        @click="emit('onClickRemove')"
                    />
                </div>
        </div>
    </div>
 </template>