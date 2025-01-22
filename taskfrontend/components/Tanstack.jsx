"use client";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query"
export default function Tanstack({ children }){
    const client=new QueryClient()
    return(
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}