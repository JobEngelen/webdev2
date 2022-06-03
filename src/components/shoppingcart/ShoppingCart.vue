<template>
  <section>
    <div class="container position-absolute w-25">
      <form ref="form">
        <h2>WINKELWAGEN</h2>
        <table class="table m-0">
          <shopping-cart-item v-for="product in products" :key="product.id" :product="product" @update="loadProducts" />
          <tr>
            <div class="w-25 pt-5"></div>
            <th class="px-2 w-25">Totaal:</th>
            <th class="px-2">€ <i class="amount py-0">900,00</i></th>
          </tr>
        </table>
        <a class="btn btn-success">Bestellen</a>
      </form>
    </div>
  </section>
</template>

<script>
import ShoppingCartItem from './ShoppingCartItem.vue';
import axios from "../../axios-auth";

export default {
  components: { ShoppingCartItem },
  name: "ShoppingCart",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.loadProducts();
    //this.getCartItems();
  },
  methods: {
    loadProducts() {
      axios.get("/homeproducts").then((result) => {
        this.products = result.data;
      })
        .catch((error) => console.log(error));
    },
    order() {
      axios
        .post("/order", this.userId)
        .then((result) => {
          console.log(result);
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
    }
  },
  computed: {
    /*cartItems() {
      return this.$store.state.cartItems;
    },
    totalPrice() {
      let price = 0;
      this.$store.state.cartItems.map(el => {
        price += el["quantity"] * el["price"];
      });
      return price;
    }*/
  }
};
</script>

<style>
.table {
  max-width: 270px;
}
</style>