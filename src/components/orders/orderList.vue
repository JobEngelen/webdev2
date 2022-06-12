<template>
  <section>
    <div class="container px-5">
      <h2 class="mt-3 mt-lg-5 px-5">Manage orders</h2>
      <div class="row mt-4 w-100 px-5">
        <order-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"
          @update="loadProducts"
        />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import OrderListItem from "./orderListItem.vue";

export default {
  name: "OrderList",
  components: {
    OrderListItem,
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
      axios.get("/products").then((result) => {
        this.products = result.data;
      })
      .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>