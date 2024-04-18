'use client';

import { useEffect, useRef } from 'react';
import type { AppStore } from '@/lib/store';
import type { ReactNode } from 'react';
import { makeStore } from '@/lib/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  readonly children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (storeRef.current !== null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
