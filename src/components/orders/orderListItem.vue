<template>
  <div class="card product-card h-100 mb-3 px-0 container">
    <div class="card-body row">
      <div class="col">
        <h4>Order nr: 3</h4>
        <div class="float-start">
          <p><strong>Door:</strong> guest</p>
          <p><strong>Op:</strong> 12-06-2022 10:45</p>
        </div>
      </div>
      <div class="col order-table">
        <table>
          <tr>
            <th class="product-name">Product</th>
            <th>Aantal</th>
            <th>Prijs</th>
          </tr>
          <tr>
            <td>{{ product.name }}</td>
            <td>3</td>
            <td>€ 800,99</td>
          </tr>
          <tr>
            <td>{{ product.name }}</td>
            <td>3</td>
            <td>€ 800,99</td>
          </tr>
          <tr>
            <td>{{ product.name }}</td>
            <td>3</td>
            <td>€ 800,99</td>
          </tr>
          <tr>
            <td>{{ product.name }}</td>
            <td>3</td>
            <td>€ 800,99</td>
          </tr>
          <tr>
            <td>{{ product.name }}</td>
            <td>3</td>
            <td>€ 800,99</td>
          </tr>
        </table>
      </div>
      <div class="col">
        <span class="price float-end">{{ product.price }}</span>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn btn-danger mx-2" @click="deleteProduct(product.id)">
        Verwijder
      </button>
      <div class="float-end">
        <strong class="p-2">Status:</strong>
        <button class="btn btn-warning" @click="editProduct(product.id)">
          Niet besteld</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';

export default {
  name: "OrderListItem",
  props: {
    product: Object,
  },
  methods: {
    deleteProduct(id) {
      axios.delete("/products/" + id)
        .then(result => {
          console.log(result);
          this.$emit("update");
        }).catch(error => console.log(error));
      // use axios to delete the product
    },
    editProduct(id) {
      // use the router to navigate to the editproduct route and pass the id
      this.$router.push("/editproduct/" + id);
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