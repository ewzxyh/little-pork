import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'components/ui/**', // Ignorar componentes shadcn/ui
      'next-env.d.ts', // Ignorar arquivo gerado automaticamente pelo Next.js
    ],
  },
];

export default eslintConfig;
