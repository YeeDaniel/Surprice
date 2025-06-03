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
            green: {
              300: '#86efac', // Tailwind 預設的 green-300
              DEFAULT: '#6DBD6A', // 這樣 `text-green` 仍指向你自訂的綠色
            },
            // "gray": "#999999",
            // "border": "#979797",
            
        }
    },
  },
  plugins: [],
}

export default config
