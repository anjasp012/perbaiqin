import React from 'react';

export default function StickyNav() {
    return (
        <nav className="sticky top-0 z-30 flex items-center justify-between gap-x-2 border-b border-foreground/10 bg-background px-4 py-3 shadow-sm transition duration-300 sm:px-6 lg:hidden">
            <div className="flex items-center gap-x-2">
                <button className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="h-6 w-6">
                        <path fill="currentColor" d="M6 8.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M6 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0m0 3.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M2 5.75C2 4.784 2.784 4 3.75 4h16.5c.966 0 1.75.784 1.75 1.75v12.5A1.75 1.75 0 0 1 20.25 20H3.75A1.75 1.75 0 0 1 2 18.25zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h6.75v-13z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <a href="/" target="_blank" rel="noopener noreferrer">
                    <svg width={128} height={128} className="block h-6 w-auto" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g clipPath="url(#clip0_301_54)">
                                <rect
                                    x={-7}
                                    y="30.875"
                                    width="110.75"
                                    height="110.75"
                                    rx="27.5"
                                    transform="rotate(-20 -7 30.875)"
                                    fill="currentColor"
                                    className="text-foreground"
                                />
                                <g>
                                    <g>
                                        <path
                                            d="M44.2985 63.0264L55.9259 47H65.3183L53.3817 63.5733L65.9603 81.0978H56.2588L44.2985 64.144V81.0978H36V47H44.2985V63.0264Z"
                                            fill="currentColor"
                                            className="text-background"
                                        />
                                        <path
                                            d="M76.4254 55.9643C78.2484 55.9643 79.8495 56.3527 81.2286 57.1295C82.6077 57.9062 83.5826 58.9287 84.1533 60.1968V56.5588H92V81.0978H84.2959V77.436C83.5667 78.6724 82.5126 79.6949 81.1335 80.5033C79.7702 81.2959 78.2008 81.6922 76.4254 81.6922C72.8904 81.6922 69.9578 80.4637 67.6276 78.0066C65.3132 75.5496 64.156 72.4901 64.156 68.8283C64.156 65.1665 65.3132 62.107 67.6276 59.6499C69.9578 57.1929 72.8904 55.9643 76.4254 55.9643ZM78.0185 75.0581C79.7623 75.0581 81.1969 74.4795 82.3224 73.3223C83.4479 72.1493 84.0106 70.6513 84.0106 68.8283C84.0106 67.0053 83.4479 65.5152 82.3224 64.358C81.1969 63.185 79.7623 62.5984 78.0185 62.5984C76.3065 62.5984 74.8957 63.1929 73.7861 64.3818C72.6764 65.5548 72.1216 67.037 72.1216 68.8283C72.1216 70.6196 72.6764 72.1097 73.7861 73.2986C74.8957 74.4716 76.3065 75.0581 78.0185 75.0581Z"
                                            fill="currentColor"
                                            className="text-background"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <defs>
                            <clipPath>
                                <rect width={128} height={128} rx="27.5" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="sr-only">
                        Go to <span className="font-bold">Kursus</span> home page
                    </span>
                </a>
                <span className="ml-2 font-mono text-sm text-foreground">31%</span>
            </div>
            <div className="flex items-center gap-x-1">
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m20.25 20.25-4.123-4.123m0 0A7.25 7.25 0 1 0 5.873 5.873a7.25 7.25 0 0 0 10.253 10.253Z"
                        />
                    </svg>
                    <span className="sr-only">Pencarian</span>
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <span className="sr-only">Switch Dark or Light Mode</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M18 20.25c-1.886-.649-3.903-1-6-1s-4.114.351-6 1m-2.25-4h16.5a1 1 0 0 0 1-1V4.75a1 1 0 0 0-1-1H3.75a1 1 0 0 0-1 1v10.5a1 1 0 0 0 1 1"
                        />
                    </svg>
                </button>
                <a
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    href="https://discord.gg/yAydVCRV8r"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                        <path
                            fill="currentColor"
                            d="M19.289 5.34A17.301 17.301 0 0 0 14.956 4c-.204.368-.39.746-.554 1.134a16.05 16.05 0 0 0-4.809 0c-.165-.387-.35-.766-.555-1.134a17.423 17.423 0 0 0-4.335 1.343C1.96 9.421 1.218 13.398 1.589 17.318A17.43 17.43 0 0 0 6.903 20c.43-.582.81-1.199 1.138-1.845a11.27 11.27 0 0 1-1.792-.86c.15-.11.297-.222.439-.332a12.428 12.428 0 0 0 10.624 0c.144.118.29.23.44.332-.573.34-1.174.628-1.796.862A12.79 12.79 0 0 0 17.094 20a17.346 17.346 0 0 0 5.317-2.68c.436-4.546-.745-8.486-3.122-11.98M8.512 14.907c-1.036 0-1.892-.944-1.892-2.107 0-1.162.826-2.115 1.888-2.115 1.062 0 1.911.953 1.893 2.115-.018 1.163-.834 2.107-1.89 2.107Zm6.976 0c-1.037 0-1.89-.944-1.89-2.107 0-1.162.827-2.115 1.89-2.115 1.064 0 1.907.953 1.888 2.115-.018 1.163-.832 2.107-1.888 2.107Z"
                        />
                    </svg>
                </a>
                <div data-orientation="vertical" role="none" className="mx-2 h-7 w-[1px] shrink-0 bg-border" />
                <button type="button" id="radix-:rc:" aria-haspopup="menu" aria-expanded="false" data-state="closed" className="group mt-0.5">
                    <div className="LazyLoad" />
                </button>
            </div>
        </nav>
    );
}
