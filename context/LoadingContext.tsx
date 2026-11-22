'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';

interface LoadingInfo {
  message: string;
  subtext?: string;
}

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  subtext?: string;
  showLoading: (message?: string, subtext?: string) => void;
  hideLoading: () => void;
  withLoading: <T>(action: () => Promise<T>, message?: string, subtext?: string) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [loadingInfo, setLoadingInfo] = useState<LoadingInfo>({
    message: 'Loading...',
    subtext: undefined,
  });

  const showLoading = useCallback((message = 'Loading...', subtext?: string) => {
    setLoadingInfo({ message, subtext });
    setActiveCount((c) => c + 1);
  }, []);

  const hideLoading = useCallback(() => {
    setActiveCount((c) => Math.max(0, c - 1));
  }, []);

  const withLoading = useCallback(
    async <T,>(action: () => Promise<T>, message = 'Loading...', subtext?: string): Promise<T> => {
      showLoading(message, subtext);
      try {
        return await action();
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  const isLoading = activeCount > 0;

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        message: loadingInfo.message,
        subtext: loadingInfo.subtext,
        showLoading,
        hideLoading,
        withLoading,
      }}
    >
      {children}
      {isLoading && (
        <LoadingIndicator
          fullScreen
          message={loadingInfo.message}
          subtext={loadingInfo.subtext}
        />
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    return {
      isLoading: false,
      message: '',
      subtext: undefined,
      showLoading: () => {},
      hideLoading: () => {},
      withLoading: async <T,>(action: () => Promise<T>) => action(),
    };
  }
  return context;
}
