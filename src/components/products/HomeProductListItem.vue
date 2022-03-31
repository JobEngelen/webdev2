<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
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
        <button class="btn btn-primary" disabled>
          Out of stock <!-- There is no shoppingcart -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeProductListItem",
  props: {
    product: Object,
  },
};
</script>

<style>
</style>