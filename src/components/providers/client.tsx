"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				disableTransitionOnChange
				defaultTheme="system"
			>
				<TooltipProvider delayDuration={0}>{children}</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
