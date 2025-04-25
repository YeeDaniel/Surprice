import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
        colors: {
            "primary": "#6DBD6A",
            "light-txt": "#ffffff",
            "dark-txt": "#4D4D4D",
        }
    },
  },
  plugins: [],
}

export default config
