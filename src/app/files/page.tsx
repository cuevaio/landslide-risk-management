import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { db } from "@/db";
import * as schema from "@/db/schema";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export default async function FilesPage() {
	const user = await currentUser();
	const files = await db
		.select()
		.from(schema.file)
		.where(eq(schema.file.userId, user?.id ?? ""))
		.orderBy(desc(schema.file.createdAt));

	return (
		<div className="container mx-auto flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl">Files</h1>
			</div>
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{files.map((file) => (
					<li key={file.id} className="flex flex-col gap-1">
						<a
							href={file.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							{file.name} <ExternalLinkIcon className="h-4 w-4" />
						</a>
						<p className="text-muted-foreground text-xs">
							{file.createdAt.toLocaleString()}
						</p>
					</li>
				))}
			</ul>

			<Link
				href="/"
				className={cn(buttonVariants({ variant: "outline" }), "mt-8 w-min")}
			>
				Upload More Files
			</Link>
		</div>
	);
}
