<template>
    <Header />
    <Sidebar />
    <main class="content-wrapper">
        <!-- <RouterView></RouterView> -->
    </main>
    <Footer />
</template>

<style>
@import '/theme/adminlte/fonts/google-fonts.css';
@import '/theme/adminlte/plugins/fontawesome-free/css/all.min.css';
@import '/theme/adminlte/dist/css/adminlte.min.css';
</style>

<script>
import Header from '../admin/common/Header.vue'
import Sidebar from '../admin/common/Sidebar.vue'
import Footer from '../admin/common/Footer.vue'

export default {
    components: {
        Header,
        Sidebar,
        Footer
    },

    data: () => {
        return {
            currentPath: window.location.hash
        }
    },
    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || '/'] || NotFound
        }
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        })

        // theme scripts
        let themejs_jquery = document.createElement('script')
        let themejs_jqueryui = document.createElement('script')
        let themejs_bootstrap = document.createElement('script')
        let themejs_pace = document.createElement('script')

        themejs_jquery.async = false
        themejs_jquery.setAttribute('src', '/theme/adminlte/plugins/jquery/jquery.min.js')
        themejs_jqueryui.async = false
        themejs_jqueryui.setAttribute('src', '/theme/adminlte/plugins/jquery-ui/jquery-ui.min.js')
        themejs_bootstrap.async = false
        themejs_bootstrap.setAttribute('src', '/theme/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js')
        themejs_pace.async = false
        themejs_pace.setAttribute('src', '/theme/adminlte/plugins/pace-progress/pace.min.js')

        document.body.appendChild(themejs_jquery)
        document.body.appendChild(themejs_jqueryui)
        document.body.appendChild(themejs_bootstrap)
        document.body.appendChild(themejs_pace)
    },
    methods: {
        //
    }
}
</script>
