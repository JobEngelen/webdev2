<template>
  <section>
    <div class="container">
      <div class="row px-5">
        <div class="col w-50 px-5">
          <h2 class="mt-3 mt-lg-5">
            HelpMijnWasIsNat.nl 2
            <h6>Nu met wasmachines!</h6>
          </h2>
        </div>
        <div class="col w-50 text-end px-5">
          <h2 class="mt-3 mt-lg-5">
            Job Engelen
            <h6>669915 INF2B</h6>
          </h2>
        </div>
      </div>
    </div>
  </section>
  <section>
    <shopping-cart>

    </shopping-cart>
  </section>
  <section>
    <div class="container px-5">
      <div class="row mt-3 px-5">
        <home-product-list-item v-for="product in products" :key="product.id" :product="product"
          @update="loadProducts" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../axios-auth";
import HomeProductListItem from "./products/HomeProductListItem.vue";
import ShoppingCart from "./shoppingcart/ShoppingCart.vue";

export default {
  name: "Home",
  components: {
    HomeProductListItem,
    ShoppingCart
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      axios
        .get("/homeproducts")
        .then((result) => {
          result.data.forEach(res => {
            res.quantity = 1;
            this.products.push(res);
          })
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>