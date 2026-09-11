import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Mishk Overseas website, published catalogue information and quotations.",
  alternates: { canonical: "/legal/terms" },
  /* Unreviewed draft — keep out of the index until counsel signs off. */
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" breadcrumb="Terms" updated="September 2026">
      <LegalSection heading="These terms">
        <p>
          By using this website you accept these terms. They govern the website
          only. Supply of goods and services is governed by the terms stated on
          our quotation and acceptance, which take precedence over anything
          here.
        </p>
      </LegalSection>

      <LegalSection heading="Catalogue information">
        <p>
          Item lists, units of issue, availability indicators and lead times on
          this site are published in good faith as a guide. They are{" "}
          <strong>not an offer</strong> and do not form part of any contract.
          Availability changes, and the position at the time of your enquiry is
          what governs.
        </p>
        <p>
          Where an IMPA code or other identifier is shown, it is provided for
          convenience. Confirm the specification on the quotation before
          ordering.
        </p>
      </LegalSection>

      <LegalSection heading="Quotations">
        <p>
          A quotation is valid for the period stated on it and is subject to
          stock and prior sale. No contract arises until we confirm acceptance
          of your order in writing. Response-time commitments described on this
          site are service targets, not contractual warranties, unless
          incorporated into a written agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy">
        <p>
          We take reasonable care over the content of this site but do not
          warrant that it is complete, current or error-free. Port coverage,
          lead times and service capability should be confirmed at enquiry.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party names">
        <p>
          Manufacturer, brand and vessel names used on this site are the
          property of their respective owners. Their use does not imply
          endorsement or an agency relationship unless expressly stated.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the extent permitted by law, we are not liable for loss arising
          from reliance on website content. Nothing here limits liability that
          cannot lawfully be limited. The governing law and jurisdiction clause
          requires client instruction before publication.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={site.email.href}>{site.email.display}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
