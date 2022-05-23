<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container">
      <div class="row container-fluid">
        <ul class="col w-75 navbar-nav me-auto mr-auto mb-2 mb-md-0">
          <li class="nav-item">
            <!-- Add a router link to the homepage (don't use the a tag!) -->
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <!-- Add a router link to the homepage (don't use the a tag!) -->
            <router-link to="/cart-test" class="nav-link" active-class="active"
              >Cart test</router-link
            >
          </li>
          <li class="nav-item" v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin">
            <!-- add a router link to the products page (don't use the a tag!) -->
            <router-link to="/products" class="nav-link" active-class="active"
              >Manage products</router-link
            >
          </li>
          <li v-if="!this.$store.getters.isAuthenticated" class="nav-item">
            <!-- add a router link to the products page (don't use the a tag!) -->
            <router-link to="/login" class="nav-link" active-class="active"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="this.$store.getters.isAuthenticated">
            <router-link to="/" @click="this.$store.dispatch('logout')" class="nav-link"
              >Logout</router-link
            >
          </li>
        </ul>
        <h5
          v-if="this.$store.getters.isAuthenticated"
          class="col text-end text-white mt-2"
        >
          Welcome, {{ this.$store.state.username }}!
        </h5>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
</style>