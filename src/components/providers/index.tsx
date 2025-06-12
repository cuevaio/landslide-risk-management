import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

import { Providers as ClientProviders } from "./client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<NuqsAdapter>
				<ClientProviders>{children}</ClientProviders>
			</NuqsAdapter>
			<Toaster />
		</ClerkProvider>
	);
};
