import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes('"use client"')
        ) {
          return;
        }

        defaultHandler(warning);
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@mui/x-date-pickers')) return 'mui-date-picker';
          if (id.includes('@mui/') || id.includes('@emotion/')) return 'mui';
          if (id.includes('dayjs')) return 'date-library';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
