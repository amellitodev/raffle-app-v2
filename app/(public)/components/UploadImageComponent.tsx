"use client";

interface Props {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadImageComponent({ handleFileChange }: Props) {
	return (
		<>
			<input
				className=" file-input file-input-primary rounded-md w-full "
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</>
	);
}
