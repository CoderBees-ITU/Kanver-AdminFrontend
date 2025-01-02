import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'auth-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Extract the `auth` cookie from the request headers
          const cookies = req.headers.cookie || '';
          const isAdminAuthenticated = cookies.includes('auth=adminToken');

          // Redirect unauthenticated users trying to access `/admin`
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (req.url.startsWith('/admin') && !isAdminAuthenticated) {
            res.writeHead(302, { Location: '/sign-in' });
            res.end();
            return;
          }

          // Redirect authenticated users trying to access `/login`
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (req.url.startsWith('/sign-in') && isAdminAuthenticated) {
            res.writeHead(302, { Location: '/admin' });
            res.end();
            return;
          }

          // Proceed to the next middleware or route handler
          next();
        });
      },
    },, TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
})
