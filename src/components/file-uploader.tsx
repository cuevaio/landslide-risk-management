"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";

import { uploadFiles } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";

export function FileUploader() {
	const [isUploading, setIsUploading] = React.useState(false);
	const [files, setFiles] = React.useState<File[]>([]);
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	const onUpload = React.useCallback(
		async (
			files: File[],
			{
				onProgress,
			}: {
				onProgress: (file: File, progress: number) => void;
			},
		) => {
			try {
				setIsUploading(true);
				await uploadFiles("documentUploader", {
					files,
					onUploadProgress: ({ file, progress }) => {
						onProgress(file, progress);
					},
				});

				toast.success("File uploaded successfully");
				router.push("/files");
			} catch (error) {
				setIsUploading(false);

				if (error instanceof UploadThingError) {
					let errorMessage = "Upload failed";

					if (error.message) {
						errorMessage = error.message;
					}

					if (error.data && "error" in error.data) {
						errorMessage = error.data.error;
					}

					toast.error(errorMessage);
					return;
				}

				toast.error(
					error instanceof Error ? error.message : "An unknown error occurred",
				);
			} finally {
				setIsUploading(false);
			}
		},
		[router],
	);

	const onFileReject = React.useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
		});
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					size="default"
					className="flex items-center gap-2 transition-all hover:shadow-sm"
					data-cv-uploader
				>
					<Upload className="h-4 w-4" />
					Upload File
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Import your CV</DialogTitle>
				</DialogHeader>
				<FileUpload
					accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					maxFiles={1}
					maxSize={8 * 1024 * 1024}
					className="w-full"
					onAccept={(files) => setFiles(files)}
					onUpload={onUpload}
					onFileReject={onFileReject}
					disabled={isUploading}
				>
					<FileUploadDropzone>
						<div className="flex flex-col items-center gap-1 text-center">
							<div className="flex items-center justify-center rounded-full border p-2.5">
								<Upload className="size-6 text-muted-foreground" />
							</div>
							<p className="font-medium text-sm">Drag & drop your file here</p>
							<p className="text-muted-foreground text-xs">
								Or click to browse (max 1 file, up to 8MB, PDF and Word files
								are supported)
							</p>
						</div>
						<FileUploadTrigger asChild>
							<Button variant="outline" size="sm" className="mt-2 w-fit">
								Browse files
							</Button>
						</FileUploadTrigger>
					</FileUploadDropzone>
					<FileUploadList>
						{files.map((file) => (
							<FileUploadItem key={file.name} value={file}>
								<div className="flex w-full items-center gap-2">
									<FileUploadItemPreview />
									<FileUploadItemMetadata />
									<FileUploadItemDelete asChild>
										<Button variant="ghost" size="icon" className="size-7">
											<X />
										</Button>
									</FileUploadItemDelete>
								</div>
								<FileUploadItemProgress />
							</FileUploadItem>
						))}
					</FileUploadList>
				</FileUpload>
			</DialogContent>
		</Dialog>
	);
}
