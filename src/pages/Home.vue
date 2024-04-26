<script setup>
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject, reactive, watch, ref, onMounted } from 'vue'
import CardList from '../components/CardList.vue'
import Counter from '../components/Counter.vue'


const { cart, addToCart, removeFromCart } = inject('cart')
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const items = ref([])

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const onClickAddPLus = async (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        item_id: item.id
      }
      item.isFavourite = true
      const { data } = await axios.post(`https://ef76c4debc7d2948.mokky.dev/favourites`, obj)
      item.favouriteId = data.id
    } else {
      item.isFavourite = false
      await axios.delete(`https://ef76c4debc7d2948.mokky.dev/favourites/${item.favouriteId}`)
      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://ef76c4debc7d2948.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavourite: false,
      favouriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get(`https://ef76c4debc7d2948.mokky.dev/favourites`)
    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.item_id === item.id)
      if (!favourite) {
        return item
      }
      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavourites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((items) => ({
    ...items,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between items-center">
    <div>
      <Counter />
    </div>
      <h2 class="text-3xl font-bold mb-10"> Cells </h2>
      <div class="flex gap-4">
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none bg-white">
          <option value="name">Name</option>
          <option value="price">Smart</option>
          <option value="-price">Expensive</option>
        </select>
        <div class="relative">
          <img src="/search.svg" class="absolute left-3 top-3" />
          <input
            @change="onChangeSearchInput"
            class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <CardList :items="items" @add-to-favourite="addToFavourite" @add-to-cart="onClickAddPLus" />
    </div>
  </div>
</template>
