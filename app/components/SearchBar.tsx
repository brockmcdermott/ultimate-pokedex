"use client";

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	ariaLabel?: string;
};

export default function SearchBar({
	value,
	onChange,
	placeholder = "Search",
	className = "",
	ariaLabel,
}: SearchBarProps) {
	return (
		<input
			type="text"
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
			aria-label={ariaLabel ?? placeholder}
			className={`border px-4 py-2 w-full max-w-sm ${className}`.trim()}
		/>
	);
}
