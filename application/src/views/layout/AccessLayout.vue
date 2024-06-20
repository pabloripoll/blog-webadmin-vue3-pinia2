<template>
    <RouterView></RouterView>
</template>

<script>
export default {

    mounted() {
        document.body.classList = `hold-transition login-page`

        //console.log(import.meta.env.VITE_API_V1)
    }

}
</script>