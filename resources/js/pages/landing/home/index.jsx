import { Head, Link } from '@inertiajs/react';
import MetaTags from '@/components/meta-tags';
import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProductCard from './product-card';
import CollaborationCard from './collaboration-card';

export default function Home({ products, specialists, collaborations }) {
    return (
        <div>
            <Head title="Solve your gadget" />
            <MetaTags
                title="Solve your gadget"
                description="Comprehensive Gadget Solution, Directly handled by Experts in the context of Gadgets, Technology, and more"
                url={route('home')}
            />

            <header className="relative isolate z-0 overflow-hidden border-b bg-gradient-to-bl from-blue-100 via-transparent py-20 dark:from-blue-950 dark:via-transparent ">
                <Container>
                    <div className="mx-auto flex-shrink-0 lg:mx-0 ">
                        <div>
                            <Link href={route('landing.ask-technician.index')} className="inline-flex space-x-6">
                                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-400 ring-1 ring-inset ring-sky-500/20">
                                    Ask Technicians
                                </span>
                            </Link>
                            <h1 className="mb-1 mt-10 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Comprehensive Gadget Solution</h1>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">Directly handled by Experts in the context of Gadgets, Technology, and more</p>

                            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-5">
                                <Link href={route('landing.ask-technician.index')} className="text-xs font-bold sm:text-sm">
                                    <Card className="p-4">
                                        <div className="flex justify-center">
                                            <Avatar className="h-8 w-8 md:h-20 md:w-20">
                                                <AvatarImage className="h-8 w-8 md:h-20 md:w-20" src={'/assets/4.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="mt-2 flex justify-center text-center">Ask Technicians</div>
                                    </Card>
                                </Link>

                                <Link href={route('landing.appointments.index')} className="text-xs font-bold sm:text-sm">
                                    <Card className="p-4">
                                        <div className="flex justify-center">
                                            <Avatar className="h-8 w-8 md:h-20 md:w-20">
                                                <AvatarImage className="h-8 w-8 md:h-20 md:w-20" src={'/assets/1.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="mt-2 flex justify-center text-center">Appointments</div>
                                    </Card>
                                </Link>
                                <Link href={route('landing.products.index')} className="text-xs font-bold sm:text-sm">
                                    <Card className="p-4">
                                        <div className="flex justify-center">
                                            <Avatar className="h-8 w-8 md:h-20 md:w-20">
                                                <AvatarImage className="h-8 w-8 md:h-20 md:w-20" src={'/assets/3.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="mt-2 flex justify-center text-center">Products</div>
                                    </Card>
                                </Link>
                                <Link href={route('landing.videos.index')} className="text-xs font-bold sm:text-sm">
                                    <Card className="p-4">
                                        <div className="flex justify-center">
                                            <Avatar className="h-8 w-8 md:h-20 md:w-20">
                                                <AvatarImage className="h-8 w-8 md:h-20 md:w-20" src={'/assets/2.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="mt-2 flex justify-center text-center">QuickLearn Videos</div>
                                    </Card>
                                </Link>
                                <Link href={route('landing.products.index')} className="text-xs font-bold sm:text-sm">
                                    <Card className="p-4">
                                        <div className="flex justify-center">
                                            <Avatar className="h-8 w-8 md:h-20 md:w-20">
                                                <AvatarImage className="h-8 w-8 md:h-20 md:w-20" src={'/assets/3.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="mt-2 flex justify-center text-center">Collaboration Fix Up</div>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>

            <div>
                <Container>
                    <div className="mx-auto flex-shrink-0 lg:mx-0 ">
                        <div>
                            <h1 className="mb-1 mt-10 text-2xl font-bold tracking-tight  text-foreground sm:text-4xl">Specializations</h1>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">Explore our areas of expertise</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {specialists.length > 0 ? (
                                    specialists.map((specialist) => (
                                        <Link key={specialist.id} href={route('landing.technician.specialist.show', specialist.slug)}>
                                            <div className="my-4 rounded-md border  p-4">
                                                <h3 className="text-lg font-semibold">{specialist.name}</h3>
                                                <p className="text-gray-600">{specialist.description}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No specialists found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div>
                <Container>
                    <div className="mx-auto flex-shrink-0 lg:mx-0 ">
                        <div>
                            <h1 className="mb-1 mt-10 text-2xl font-bold tracking-tight  text-foreground sm:text-4xl">Collaboration Fix Up</h1>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">Explore our Collaborations</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {collaborations.length > 0 ? (
                                    collaborations.map((collaboration) => (
                                        <CollaborationCard key={collaboration.id} collaboration={collaboration} /> // Gunakan TechnicianCard di sini
                                    ))
                                ) : (
                                    <p>No collaboration found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div>
                <Container>
                    <div className="mx-auto flex-shrink-0 lg:mx-0 ">
                        <div>
                            <h1 className="mb-1 mt-10 text-2xl font-bold tracking-tight  text-foreground sm:text-4xl">Products</h1>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">Our Products</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard key={product.id} product={product} /> // Gunakan TechnicianCard di sini
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
