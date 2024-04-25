import React from 'react';

export default function RightAside() {
    return (
        <aside className="fixed inset-y-0 right-0 hidden w-[22rem] overflow-y-auto border-l border-zinc-200 bg-white px-4 py-5 dark:border-zinc-900 dark:bg-black/10 sm:px-6 lg:px-8 xl:block">
            <nav className="mb-12 flex items-center justify-between">
                <div className="-ml-1 flex items-center justify-end gap-x-1">
                    <a
                        href="https://discord.gg/yAydVCRV8r"
                        target="_blank"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                            <path
                                fill="currentColor"
                                d="M19.289 5.34A17.301 17.301 0 0 0 14.956 4c-.204.368-.39.746-.554 1.134a16.05 16.05 0 0 0-4.809 0c-.165-.387-.35-.766-.555-1.134a17.423 17.423 0 0 0-4.335 1.343C1.96 9.421 1.218 13.398 1.589 17.318A17.43 17.43 0 0 0 6.903 20c.43-.582.81-1.199 1.138-1.845a11.27 11.27 0 0 1-1.792-.86c.15-.11.297-.222.439-.332a12.428 12.428 0 0 0 10.624 0c.144.118.29.23.44.332-.573.34-1.174.628-1.796.862A12.79 12.79 0 0 0 17.094 20a17.346 17.346 0 0 0 5.317-2.68c.436-4.546-.745-8.486-3.122-11.98M8.512 14.907c-1.036 0-1.892-.944-1.892-2.107 0-1.162.826-2.115 1.888-2.115 1.062 0 1.911.953 1.893 2.115-.018 1.163-.834 2.107-1.89 2.107Zm6.976 0c-1.037 0-1.89-.944-1.89-2.107 0-1.162.827-2.115 1.89-2.115 1.064 0 1.907.953 1.888 2.115-.018 1.163-.832 2.107-1.888 2.107Z"
                            />
                        </svg>
                    </a>
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
                        className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        href="https://karteil.com/notifications"
                    >
                        <span className="sr-only">View notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21.002 9.25a14.934 14.934 0 0 1-9.002 3 14.934 14.934 0 0 1-9.001-3m.751-4.5h16.5a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1Z"
                            />
                        </svg>
                    </a>
                </div>
                <div className="flex items-center gap-x-2">
                    <a
                        className="inline-flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        href="https://karteil.com/diamonds"
                    >
                        <span className="sr-only">Diamonds</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                            className="size-5 text-blue-500"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M6.564 3.523A1.75 1.75 0 0 1 7.812 3h8.376c.47 0 .919.189 1.248.523l5.154 5.244a1.75 1.75 0 0 1-.01 2.464l-9.342 9.342a1.75 1.75 0 0 1-2.475 0L1.42 11.231a1.75 1.75 0 0 1-.011-2.464l5.154-5.244ZM9.03 7.22a.75.75 0 0 1 0 1.06L7.31 10l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 mr-2 font-mono text-sm">0</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-5">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m10.75-4.242a.75.75 0 0 0-1.5 0v3.493H7.757a.75.75 0 1 0 0 1.5h3.493v3.492a.75.75 0 0 0 1.5 0v-3.492h3.493a.75.75 0 1 0 0-1.5H12.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                    <button type="button" id="radix-:rt:" aria-haspopup="menu" aria-expanded="false" data-state="closed" className="group mt-0.5">
                        <div className="LazyLoad is-visible">
                            <img
                                className="h-6 w-6 rounded-full ring-1 ring-foreground/10 group-focus:ring-foreground sm:h-10 sm:w-10"
                                src="https://www.gravatar.com/avatar/56de596a228f0366e3316a2073274a64?s=200&d=mp"
                                style={{ opacity: 1, transform: 'none' }}
                            />
                        </div>
                    </button>
                </div>
            </nav>
            <div>
                <span className="block text-left text-sm font-semibold">31% selesai</span>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div className="h-full bg-primary" style={{ width: '31%' }} />
                </div>
            </div>
            <div className="-ml-10 mb-6 mt-4 space-y-3 rounded-lg border border-border/50 bg-secondary/30 p-4 pl-10">
                <h4 className="font-semibold text-zinc-900 dark:text-white">
                    <a href="https://karteil.com/lessons/blog-like-a-pro">Membuat Blog Profesional dengan Stack Modern</a>
                </h4>
                <div className="flex gap-x-6">
                    <div className="flex items-center gap-x-2">
                        <svg className="size-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 1C9.72112 1 9.47769 1.06932 9.24753 1.16311C9.03745 1.24872 8.80061 1.37139 8.53947 1.50665L2.80429 4.47667C2.35474 4.70941 1.94839 4.91978 1.66061 5.12672C1.36301 5.34072 1.0015 5.68467 1 6.22729C0.998511 6.76992 1.35813 7.11579 1.65454 7.33137C1.94118 7.53984 2.34637 7.75238 2.79463 7.98751L8.52916 10.9963C8.79101 11.1338 9.02849 11.2582 9.23938 11.3453C9.47178 11.4412 9.71783 11.5121 10 11.5121C10.2822 11.5121 10.5282 11.4412 10.7606 11.3453C10.9728 11.2577 11.2119 11.1322 11.4756 10.9938L17.2054 7.98751C17.6536 7.75238 18.0588 7.53984 18.3455 7.33137C18.6419 7.11579 19.0015 6.76992 19 6.22729C18.9985 5.68466 18.637 5.34072 18.3394 5.12672C18.0516 4.91979 17.6453 4.70941 17.1957 4.47668L11.4605 1.50666C11.1994 1.3714 10.9625 1.24872 10.7525 1.16311C10.5223 1.06932 10.2789 1 10 1Z"
                                fill="currentColor"
                                fillOpacity="0.2"
                            />
                            <path
                                d="M2.14772 9.65418C1.77012 9.45424 1.29866 9.5929 1.09475 9.96573C0.890475 10.3392 1.03308 10.8043 1.41131 11.0046L8.49508 14.7554C8.75679 14.894 8.99789 15.0217 9.2128 15.1112C9.44994 15.2099 9.70533 15.2847 9.99992 15.2847C10.2945 15.2847 10.5499 15.2099 10.787 15.1112C11.002 15.0217 11.2431 14.894 11.5048 14.7554L18.5886 11.0046C18.9668 10.8043 19.1094 10.3392 18.9051 9.96573C18.7012 9.5929 18.2298 9.45424 17.8522 9.65418L10.7955 13.3907C10.4981 13.5481 10.3213 13.6408 10.1815 13.6991C10.0564 13.7511 10.0147 13.7517 9.99992 13.7517C9.98511 13.7517 9.9434 13.7511 9.81838 13.6991C9.67851 13.6408 9.50178 13.5481 9.20435 13.3907L2.14772 9.65418Z"
                                fill="currentColor"
                            />
                            <path
                                d="M2.14772 13.3694C1.77012 13.1694 1.29866 13.3081 1.09475 13.6809C0.890475 14.0544 1.03308 14.5195 1.41131 14.7197L8.49505 18.4706C8.75677 18.6092 8.99788 18.7369 9.2128 18.8264C9.44994 18.9251 9.70533 18.9999 9.99992 18.9999C10.2945 18.9999 10.5499 18.9251 10.787 18.8264C11.0019 18.7369 11.243 18.6092 11.5047 18.4706L18.5886 14.7197C18.9668 14.5195 19.1094 14.0544 18.9051 13.6809C18.7012 13.3081 18.2298 13.1694 17.8522 13.3694L10.7955 17.1058C10.4981 17.2633 10.3213 17.356 10.1815 17.4143C10.0564 17.4663 10.0147 17.4669 9.99992 17.4669C9.98511 17.4669 9.9434 17.4663 9.81838 17.4143C9.67851 17.356 9.50178 17.2633 9.20435 17.1058L2.14772 13.3694Z"
                                fill="currentColor"
                            />
                        </svg>
                        <small>61 St</small>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" className="size-4">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M6.564 3.523A1.75 1.75 0 0 1 7.812 3h8.376c.47 0 .919.189 1.248.523l5.154 5.244a1.75 1.75 0 0 1-.01 2.464l-9.342 9.342a1.75 1.75 0 0 1-2.475 0L1.42 11.231a1.75 1.75 0 0 1-.011-2.464l5.154-5.244ZM9.03 7.22a.75.75 0 0 1 0 1.06L7.31 10l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <small>1318 DMs</small>
                    </div>
                </div>
            </div>
            <aside>
                <nav className="table-of-contents hidden tracking-tighter lg:block">
                    <ul className="flex flex-col gap-y-2.5 font-medium">
                        <li className="text-[0.905rem] text-sm text-muted-foreground transition first:mb-3 first:!cursor-none first:font-semibold first:text-foreground hover:text-foreground first:hover:text-foreground lg:leading-[1.6] [&>a.active]:font-semibold [&>a.active]:text-foreground">
                            <a href="#content-dalam-halaman-ini">Dalam halaman ini</a>
                        </li>
                        <li className="text-[0.905rem] text-sm text-muted-foreground transition first:mb-3 first:!cursor-none first:font-semibold first:text-foreground hover:text-foreground first:hover:text-foreground lg:leading-[1.6] [&>a.active]:font-semibold [&>a.active]:text-foreground">
                            <a href="#content-jalankan-project" className="active">
                                Jalankan Project
                            </a>
                        </li>
                        <li className="text-[0.905rem] text-sm text-muted-foreground transition first:mb-3 first:!cursor-none first:font-semibold first:text-foreground hover:text-foreground first:hover:text-foreground lg:leading-[1.6] [&>a.active]:font-semibold [&>a.active]:text-foreground">
                            <a href="#content-login-dengan-mudah">Login dengan Mudah</a>
                        </li>
                        <li className="text-[0.905rem] text-sm text-muted-foreground transition first:mb-3 first:!cursor-none first:font-semibold first:text-foreground hover:text-foreground first:hover:text-foreground lg:leading-[1.6] [&>a.active]:font-semibold [&>a.active]:text-foreground">
                            <a href="#content-sitemap">Sitemap</a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </aside>
    );
}
