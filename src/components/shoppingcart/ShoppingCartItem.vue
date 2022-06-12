<template>
  <tr>
    <td>
      <h6>
        {{ product.name }}
      </h6>
    </td>
    <td class="container p-0">
      <div class="row w-100 m-0 p-0">
        <div class="col-3 p-0">
          <a class="btn btn-secondary p-1 py-0 cart-btn" @click="this.$store.dispatch('retractItemFromCart', product)"><i class="fas fa-minus"></i></a>
        </div>
        <div class="col-3 pl-2 pe-3">
          <h6>{{ product.quantity }}</h6>
        </div>
        <div class="col-3 p-0">
          <a class="btn btn-secondary p-1 py-0 cart-btn" @click="this.$store.dispatch('addItemToCart', product)"><i class="fas fa-plus"></i></a>
        </div>
      </div>
    </td>
    <td>
      <h6>€ <i class="amount py-0">{{ (product.price * product.quantity).toFixed(2) }}</i></h6>
    </td>
    <td>
      <div>
        <a class="btn btn-danger p-1 py-0 cart-btn mx-2" @click="this.$store.dispatch('clearItemFromCart', product)"><i class="fas fa-times"></i></a>
      </div>
    </td>
  </tr>
</template>

<script>

export default {
  name: "ShoppingCartItem",
  props: {
    product: Object,
  },
  methods: {
  },
};
</script>

<style>
.amount {
  font-style: normal;
  float: right;
}

.cart-btn {
  margin-top: -10px;
}
</style>