<template>
  <section>
    <div class="container px-5">
      <h2 class="mt-3 mt-lg-5 px-5">Manage orders</h2>
      <div class="row mt-4 w-100 px-5">
        <order-list-item
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @update="loadOrders"
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
      orders: [],
    };
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      axios.get("/order").then((result) => {
        this.orders = result.data;
        console.log(this.orders);
        console.log("/////////////////////////");
      })
      .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>