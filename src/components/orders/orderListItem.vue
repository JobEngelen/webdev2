<template>
  <div class="card product-card h-100 mb-3 px-0 container">
    <div class="card-body row">
      <div class="col">
        <h4>Order nr: {{ order.id }}</h4>
        <div class="float-start">
          <p><strong>Door:</strong> {{ order.user.username }}</p>
          <p><strong>Op:</strong> {{ order.orderTime }}</p>
        </div>
      </div>
      <div class="col order-table">
        <table>
          <tr>
            <th class="product-name">Product</th>
            <th class="pe-3">Aantal</th>
            <th>Prijs</th>
          </tr>
          <order-list-item-product-item v-for="product in products" :key="product.id" :product="product" />
        </table>
      </div>
      <div class="col">
        <span class="price float-end">1</span>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn btn-danger mx-2" @click="deleteOrder(order.id)">
        Verwijder
      </button>
      <div class="float-end">
        <strong class="p-2">Status:</strong>
        <button v-if="order.delivered" class="btn btn-success" @click="editStatus(order.id, 0)">
          Bezorgd</button>
        <button v-else class="btn btn-warning" @click="editStatus(order.id, 1)">
          Niet bezorgd</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import OrderListItemProductItem from "./orderListItemProductItem.vue";

export default {
  name: "OrderListItem",
  components: {
    OrderListItemProductItem,
  },
  props: {
    order: Object,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.products = this.order.products;
  },
  methods: {
    deleteOrder(id) {
      axios.delete("/order/" + id)
        .then(result => {
          console.log(result);
          this.$emit("update");
        }).catch(error => console.log(error));
    },
    editStatus(id, status) {
      axios.put("/order/" + id + "/" + status)
        .then(result => {
          console.log(result);
          this.$emit("update");
        }).catch(error => console.log(error));
    },
  },
};
</script>

<style>
.order-table {
  max-height: 90px;
  overflow-y: auto;
}

.order-table .product-name {
  min-width: 150px;
}
</style>