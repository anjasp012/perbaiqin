import { Link, usePage } from '@inertiajs/react';
import useSwal from '@/hooks/useSwal.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

export default function ArticleList({ articles }) {
    const { ask } = useSwal();
    const { auth } = usePage().props;
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
                <Card key={article.id} className="flex flex-col">
                    <div className="flex-1">
                        <CardHeader>
                            <CardTitle className="text-base">
                                <Link href={article.href}>{article.title}</Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex-1 divide-y text-xs text-muted-foreground [&_li]:grid [&_li]:grid-cols-2 [&_li]:gap-4 [&_li]:py-1.5">
                                <li>
                                    <div>Kategori</div>
                                    <div className="text-right">{article.category.name}</div>
                                </li>
                                <li>
                                    <div>Published at</div>
                                    <div className="text-right">{article.published_at}</div>
                                </li>
                                <li>
                                    <div>Comments</div>
                                    <div className="text-right">{article.comments_count}</div>
                                </li>
                                <li>
                                    <div>Author</div>
                                    <Link className="text-right" href={article.author.href}>
                                        {article.author.name}
                                    </Link>
                                </li>
                            </ul>
                        </CardContent>
                    </div>
                    <CardFooter className="justify-end gap-x-1">
                        {auth.user?.is_admin && (
                            <>
                                {article.status !== 'published' && (
                                    <Button
                                        onClick={() => {
                                            ask({
                                                url: route('articles.destroy', [article]),
                                                method: 'delete',
                                                message: 'Are you sure you want to publish this article?',
                                            });
                                        }}
                                    >
                                        Approve
                                    </Button>
                                )}

                                <Button
                                    onClick={() => {
                                        ask({
                                            url: route('articles.destroy', [article]),
                                            method: 'delete',
                                        });
                                    }}
                                    variant="destructive"
                                    size="sm"
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                        <Link href={route('articles.edit', [article])} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
                            Edit
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
