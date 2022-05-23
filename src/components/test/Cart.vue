<template>
  <section>
    <div class="container position-absolute w-25">
      <h2>WINKELWAGEN</h2>
      <div>
        <ul class="list-group">
          <li class="list-group-item" v-for="item in items" :key="item.id">
            <button class="btn btn-danger py-0 px-2 my-2" @click="$emit('remove-from-cart', item)">X</button>
            {{ item.name }} - € {{ item.price }}
          </li>
        </ul>
        <div class="p-3">
          <strong class="text-center">Totaal: € {{ total }}</strong>
        </div>
        <button :disabled="items.length === 0" @click="$emit('pay')" class="btn btn-success w-50">Bestellen</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["items"],
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>