<template>
  <div class="card product-card h-100 py-2">
    <div class="card-body">
      <img :src="product.image" :alt="product.title" :title="product.title" />
      <div class="float-start">
        <h4>{{ product.name }}</h4>
        <p style="height: 85px;">{{ product.description }}</p>
        <p style="margin-bottom: -20px">
          <small>{{ product.category.name }}</small>
        </p>
      </div>
      <span class="price float-end">{{ product.price }}</span>
    </div>
    <div class="card-footer">
      <!--<button class="btn btn-primary w-100" @click="addToCart()">Voeg toe aan winkelwagen</button>-->
      <button :disabled="isInCart" @click="$emit('add-to-cart', product)" class="btn btn-primary form-control">
        {{ isInCart ? 'Added to cart' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomeProductListItem",
  props: {
    product: Object,
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    addToCart() {
      this.addProductToCart({
        product: this.product,
        quantity: 1
      });
    }
  }
};
</script>

<style>
</style>