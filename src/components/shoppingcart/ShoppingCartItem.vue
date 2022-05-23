<template>
  <tr>
    <button class="btn btn-danger py-0 px-2 my-2" href="#">X</button>
    <td class="px-2 w-25">{{ product.name }}</td>
    <td class="px-2">€ <i class="amount py-0">{{ product.price }}</i></td>
  </tr>
</template>

<script>
//import axios from '../../axios-auth';

export default {
  name: "ShoppingCartItem",
  props: {
    product: Object,
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch("removeItem", item);
    },
  },
};
</script>

<style>
.amount {
  font-style: normal;
  float: right;
}
</style>