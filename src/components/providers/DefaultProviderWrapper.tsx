"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 1, //1 minutes
            cacheTime: 1000 * 60 * 60 * 24, //24 hours
        },
    },
});

function DefaultProviderWrapper({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default DefaultProviderWrapper;
