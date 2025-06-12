import { FileUploader } from "@/components/file-uploader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container mx-auto flex h-screen flex-col items-center justify-center">
			<FileUploader />

			<Link
				href="/files"
				className={cn(buttonVariants({ variant: "outline" }), "mt-8 w-min")}
			>
				View Uploaded Files
			</Link>
		</div>
	);
}
