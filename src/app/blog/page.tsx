import Link from "next/link";
import { Metadata } from "next";
import { baseUrl } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Legal Guides & Blog",
  description:
    "Practical legal guides on Andhra Pradesh law — revenue records, bail, consumer complaints, and cheque bounce matters. By Advocate S. Nagendra Naik, Anantapur Bar.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
      <section>
        <h1 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink mb-4">
          Legal Guides
        </h1>
        <p className="max-w-[52ch] text-base text-muted mb-12 md:text-lg">
          Practical articles on Andhra Pradesh law — revenue records, bail, consumer complaints,
          cheque bounce, and more. Written for clients, not lawyers.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="lift flex flex-col overflow-hidden rounded-3xl bg-paper-2 border border-rule p-6 md:p-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-sm text-muted">
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h2
                className="mt-4 font-display text-xl leading-tight text-ink md:text-2xl"
              >
                {post.title}
              </h2>
              <p className="mt-4 text-base leading-[1.7] text-ink-2">
                {post.summary}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-ink underline underline-offset-4 hover:underline-offset-2"
              >
                Read guide<span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
