import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	base:'/game_store',
	plugins: [react()],
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	}
})
