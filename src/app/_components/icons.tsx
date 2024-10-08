export const DeviceSpeakerIcon = ({ className }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
		<path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
		<path d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
		<path d="M12 7l0 .01"></path>
	</svg>
);

export const CodeIcon = ({ className }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
		<path d="M7 8l-4 4l4 4"></path>
		<path d="M17 8l4 4l-4 4"></path>
		<path d="M14 4l-4 16"></path>
	</svg>
);

export function LightbulbIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
			<line x1="12" y1="12" x2="20" y2="7.5"></line>
			<line x1="12" y1="12" x2="12" y2="21"></line>
			<line x1="12" y1="12" x2="4" y2="7.5"></line>
		</svg>
	);
}

export function EmailIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<rect x="3" y="5" width="18" height="14" rx="2"></rect>
			<polyline points="3 7 12 13 21 7"></polyline>
		</svg>
	);
}

export function MapPinIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<circle cx="12" cy="11" r="3"></circle>
			<path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
		</svg>
	);
}

export function GitHubIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
		</svg>
	);
}

export function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<rect x="4" y="4" width="16" height="16" rx="2"></rect>
			<line x1="8" y1="11" x2="8" y2="16"></line>
			<line x1="8" y1="8" x2="8" y2="8.01"></line>
			<line x1="12" y1="16" x2="12" y2="11"></line>
			<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
		</svg>
	);
}

export function SpotifyIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<circle cx="12" cy="12" r="9"></circle>
			<path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527"></path>
			<path d="M9 15c1.5 -1 4 -1 5 .5"></path>
			<path d="M7 9c2 -1 6 -2 10 .5"></path>
		</svg>
	);
}

export function YouTubeIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<rect x="3" y="5" width="18" height="14" rx="4"></rect>
			<path d="M10 9l5 3l-5 3z"></path>
		</svg>
	);
}

export function RightChevronIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 6l6 6l-6 6"></path>
		</svg>
	);
}
