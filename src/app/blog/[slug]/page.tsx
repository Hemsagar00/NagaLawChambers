import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { baseUrl } from "@/lib/site";
import { getBlogPost } from "@/lib/blog-posts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostSlugs();
}

function blogPostSlugs(): { slug: string }[] {
  return [
    { slug: "ror-adangal-correction-andhra-pradesh" },
    { slug: "anticipatory-bail-anantapur-andhra-pradesh" },
    { slug: "cheque-bounce-section-138-ni-act-andhra-pradesh" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${post.title} | NAGA Law Chambers`,
      description: post.summary,
      url: path,
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[800px] px-5 py-16 md:px-8 md:py-24">
      <SiteHeader />
      <article>
        <header className="mb-12">
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            {post.category}
          </span>
          <time
            dateTime={post.date}
            className="block mt-2 text-sm text-muted"
          >
            {post.date} · {post.readTime} · By {post.author}
          </time>
          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[var(--tracking-display)] text-ink md:text-[4rem]">
            {post.title}
          </h1>
          <p className="mt-6 text-base leading-[1.75] text-ink-2 md:text-lg">
            {post.summary}
          </p>
        </header>

        <div className="prose-xl text-ink-2 leading-[1.8]">
          {post.body.map((para, i) => (
            <p key={i} className="mb-8">
              {para}
            </p>
          ))}
        </div>

        <section className="mt-16 p-8 rounded-3xl bg-paper-2 border border-rule">
          <h2 className="mb-6 font-display text-2xl leading-tight text-ink">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-5">
            {post.faqs.map((faq, i) => (
              <div key={i}>
                <dt className="font-semibold text-ink">
                  {faq.q}
                </dt>
                <dd className="mt-2 text-base text-ink-2 leading-[1.7]">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="mt-16 pt-8 border-t border-rule">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink underline underline-offset-4"
          >
            <span aria-hidden="true">←</span> All guides
          </Link>
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}
