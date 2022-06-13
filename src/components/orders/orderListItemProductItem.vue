<template>
    <tr>
        <td>{{ product.name }}</td>
        <td class="text-center">{{ product.quantity }}</td>
        <td>€ {{ (product.quantity * product.price).toFixed(2) }}</td>
    </tr>
</template>


<script>

export default {
    name: "OrderListItemProductItem",
    props: {
        product: Object,
    }
};
</script>