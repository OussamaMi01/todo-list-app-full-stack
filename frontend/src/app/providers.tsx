// app/providers.tsx
"use client";

import { ApolloProvider } from '@apollo/client/react';
import client from '@/lib/apollo';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}