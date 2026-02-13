import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {transformSync} from 'esbuild'

// Plugin to handle JSX in .js files for both dev and build
function jsxInJsPlugin() {
    return {
        name: 'jsx-in-js',
        enforce: 'pre',
        transform(code, id) {
            if (/\/src\/.*\.js$/.test(id) && code.includes('<')) {
                const result = transformSync(code, {
                    loader: 'jsx',
                    jsx: 'automatic',
                    sourcefile: id,
                })
                return {code: result.code, map: null}
            }
        },
    }
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        jsxInJsPlugin(),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimizeDeps: {
        esbuild: {
            loader: {'.js': 'jsx'},
        },
        esbuildOptions: {
            loader: {'.js': 'jsx'},
        },
        entries: ['index.html'],
    },
})
