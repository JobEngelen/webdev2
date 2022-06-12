<template>
  <section>
    <div class="container position-absolute w-25 px-2">
      <form ref="form">
        <h2>WINKELWAGEN</h2>
        <table class="table">
          <tr>
            <th class="col-md-4">
              <h5>Naam</h5>
            </th>
            <th class="col-md-3">
              <h5>Aantal</h5>
            </th>
            <th class="col-md-2">
              <h5>Prijs</h5>
            </th>
            <th class="col-md-1">
              <h5>Actie</h5>
            </th>
          </tr>
          <shopping-cart-item v-for="product in this.$store.state.cart" :key="product.id" :product="product" />
          <tr>
            <th></th>
            <th class="px-2 w-25">Totaal:</th>
            <th class="px-2">
              <div class="total-price p-0 pt-2">
                <h6 class="px-0">€ <i class="amount py-0">{{ getTotal() }}</i></h6>
              </div>
            </th>
          </tr>
        </table>
        <a class="btn btn-secondary me-5" @click="this.$store.dispatch('clearShoppingCart')">Leeg winkelwagen</a>
        <a class="btn btn-success mx-5" @click="order()">Bestellen</a>
      </form>
    </div>
  </section>
</template>

<script>
import ShoppingCartItem from './ShoppingCartItem.vue';

export default {
  components: { ShoppingCartItem },
  name: "ShoppingCart",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
  },
  methods: {
    order() {
      this.$store
        .dispatch("order")
        .then(() => {
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log(error);
        });
    },
    getTotal() {
      var total = 0;
      try {
        this.$store.state.cart.forEach(product => {
          total += parseFloat(product.price) * product.quantity;
        })
        return total.toFixed(2);
      } catch (err) {
        console.log(err);
      }
    }
  },
}
</script>

<style>
.table {
  max-width: 270px;
}

.total-price {
  width: 80px;
}
</style>