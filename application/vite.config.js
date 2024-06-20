import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {

    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        define: {
            ENV: JSON.stringify(env.APP_ENV),
        },
        server: {
            host: true,
            port: parseInt(env.VITE_PORT_DEV),
        },
        preview: {
            port: parseInt(env.VITE_PORT)
        }
    }
})