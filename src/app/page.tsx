import { Landing } from "@/components/home/landing";
import { Faq } from "@/components/seo/faq";
import { practicePages } from "@/lib/local-seo";

/** One question from each practice page, so the home page answers the common searches too. */
const faqItems = practicePages.map((page) => page.faqs[0]).filter(Boolean);

export default function HomePage() {
  return (
    <Landing>
      <Faq items={faqItems} heading="Common questions about land, revenue and court matters" id="faq" />
    </Landing>
  );
}
