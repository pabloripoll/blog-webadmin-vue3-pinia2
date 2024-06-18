<template>
    <RouterView></RouterView>
</template>

<script>
export default {

    mounted() {
        document.body.classList = `hold-transition login-page`
    }

}
</script>