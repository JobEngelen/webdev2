<template>
    <section>
        <div class="container">
            <div class="row mb-3">
                <div class="col w-50">
                    <h2 class="mt-3 mt-lg-5">
                        HelpMijnWasIsNat.nl 2
                        <h6>Nu met wasmachines!</h6>
                    </h2>
                </div>
                <div class="col w-50 text-end">
                    <h2 class="mt-3 mt-lg-5">
                        Job Engelen
                        <h6>669915 INF2B</h6>
                    </h2>
                </div>
            </div>
        </div>
    </section>
    <section>
        <cart v-on:pay="pay()" v-on:remove-from-cart="removeFromCart($event)" :items="cart"></cart>
    </section>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-3" :key="product.id" v-for="product in products">
                    <HomeProductListItem :isInCart="isInCart(product)" v-on:add-to-cart="addToCart(product)"
                        :product="product" @update="loadProducts">
                    </HomeProductListItem>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "../axios-auth";
import HomeProductListItem from "./products/HomeProductListItem.vue";
import Cart from "@/components/test/Cart.vue";

export default {
    name: "app",
    components: {
        HomeProductListItem,
        Cart
    },
    data() {
        return {
            products: [],
            cart: []
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
                    this.products = result.data;
                })
                .catch((error) => console.log(error));
        },
        addToCart(product) {
            this.cart.push(product);
        },
        isInCart(product) {
            const item = this.cart.find(item => item.id === product.id);
            if (item) {
                return true;
            }
            return false;
        },
        removeFromCart(product) {
            this.cart = this.cart.filter(item => item.id !== product.id);
        },
        pay() {
            this.cart = [];
            alert("Bestelling is verwerkt");
        }
    }
};
</script>

<style>
.table {
    max-width: 270px;
}
</style>


