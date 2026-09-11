import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mishk Overseas collects, uses and retains personal data submitted through this website.",
  alternates: { canonical: "/legal/privacy" },
  /* Unreviewed draft — keep out of the index until counsel signs off. */
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" breadcrumb="Privacy" updated="September 2026">
      <LegalSection heading="What this covers">
        <p>
          This policy describes how {site.name} handles personal data submitted
          through this website. It does not cover data exchanged through a
          commercial contract, which is governed by that contract.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>We collect only what you type into a form on this site:</p>
        <ul>
          <li>
            <strong>Quote form:</strong> vessel name, IMO number, port of call,
            ETA and ETD, the supply categories you select, any file you attach,
            your message, and your company, name, email and phone.
          </li>
          <li>
            <strong>Contact form:</strong> your name, company, email, phone,
            subject and message.
          </li>
        </ul>
        <p>
          We do not collect anything else. This site sets{" "}
          <strong>no cookies</strong>, runs no analytics, and embeds no
          third-party trackers. Your IP address is processed transiently by our
          hosting provider and by our rate limiter to prevent form abuse; it is
          not stored against your submission.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use it">
        <p>
          Solely to respond to your enquiry — to price a requisition, answer a
          question, and follow up on it. We do not use it for marketing, and we
          do not sell or share it with anyone except the processors named below.
        </p>
      </LegalSection>

      <LegalSection heading="Who processes it">
        <ul>
          <li>
            <strong>Hosting:</strong> our hosting provider serves this site and
            processes request logs.
          </li>
          <li>
            <strong>Email delivery:</strong> Resend (resend.com) transmits form
            submissions to our supply desk and sends your confirmation.
          </li>
        </ul>
        <p>
          Both may process data outside India. The client must confirm the
          appropriate transfer basis before this policy is published.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Enquiry correspondence is retained for as long as needed to serve the
          enquiry and to meet tax and commercial record-keeping obligations.
          The specific retention period requires client confirmation.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on where you are, you may have the right to access, correct,
          or request deletion of your personal data, to withdraw consent, and to
          complain to a supervisory authority. To exercise any of these, write
          to <a href={site.email.href}>{site.email.display}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy:{" "}
          <a href={site.email.href}>{site.email.display}</a> or{" "}
          <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
        <p>
          The registered entity name, address and grievance officer must be
          named here before publication.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
