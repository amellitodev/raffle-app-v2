"use client";

interface Props {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadImageComponent({ handleFileChange }: Props) {
	return (
		<>
		<label htmlFor="file-upload" className="cursor-pointer">
			<span className="text-md font-bold">📷 Subir Captura</span>
		</label>
			<input
				className=" file-input file-input-primary rounded-md w-full "
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</>
	);
}
