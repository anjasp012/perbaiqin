// import { Head, usePage } from '@inertiajs/react';
// import { AppLayout } from '@/layouts/app-layout';
// import { Container } from '@/components/container';
// import { ArticleBlock } from '@/pages/articles/partials/article-block';
// import { pagination } from '@/components/pagination';
// import MetaTags from '@/components/meta-tags';
// import { Header } from '@/components/header';

// export default function Index({ params }) {
//     const { data: articles, meta, links } = usePage().props.articles;
//     return (
//         <div>
//             <Head title={params.title} />
//             <MetaTags title={params.title} description={params.subtitle} url={route('articles.index')} />
//             <Header title={params.title} subtitle={params.subtitle} />
//             <Container>
//                 <div className="py-24">
//                     <ArticleBlock articles={articles} />
//                     {meta.has_pages && (
//                         <div className="mt-24">
//                             <pagination meta={meta} links={links} />
//                         </div>
//                     )}
//                 </div>
//             </Container>
//         </div>
//     );
// }

// Index.layout = (page) => <AppLayout children={page} />;
