/**
 * This middleware is used to dynamically update Layouts
 * As soon as the route changes, it tries to pull the layout that we want to display from the laptop.
 * Then it loads the layout component, and assigns the loaded component to the meta in the layout Component variable And layoutComponent
 * is used in the basic layout AppLayout.vue, there is a dynamic update of the layout component. *
 * If the layout we want to display is not found, loads the default layout App Layout Default.vue
 *
 * */

export async function layoutMiddleware(route) {
    console.log(route.meta.layout)
    try {
        let layout = route.meta.layout
        let layoutComponent = await import(`@/views/layout/${layout}.vue`)

        route.meta.layoutComponent = layoutComponent.default

    } catch (e) {
        let layout = 'AccessLayout'
        let layoutComponent = await import(`@/views/layout/${layout}.vue`)

        route.meta.layoutComponent = layoutComponent.default
    }
}