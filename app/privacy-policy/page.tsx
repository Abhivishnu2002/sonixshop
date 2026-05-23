import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — SonixShop",
  description:
    "Read the Privacy Policy of Udysonix Pvt Ltd to understand how we collect, use, and protect your personal data when you shop on SonixShop.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Information You Provide Directly",
        body: "When you create an account, place an order, or contact our support team, we collect: full name, email address, phone number, shipping and billing address, payment method details (processed securely via PCI-DSS compliant payment processors — we never store raw card numbers), and any communications you send us.",
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        body: "When you browse SonixShop, our servers and analytics tools automatically collect: IP address and approximate geographic location, browser type and version, device type and operating system, pages visited, time spent on pages, search terms used on our platform, clickstream data and referring URLs, and cookie identifiers.",
      },
      {
        subtitle: "1.3 Information From Third Parties",
        body: "We may receive information about you from payment gateways (Razorpay, Stripe, UPI providers), shipping carriers for delivery status updates, and social login providers if you choose to sign in with Google or Facebook.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "2.1 Order Fulfilment",
        body: "We use your personal information to process and confirm your orders, arrange delivery, send order status notifications via email and SMS, handle returns and refunds, and resolve any order-related disputes.",
      },
      {
        subtitle: "2.2 Account & Service Management",
        body: "Your information enables us to create and maintain your account, authenticate your identity, personalise your shopping experience, display your order history and wishlist, and remember your preferences across sessions.",
      },
      {
        subtitle: "2.3 Communication",
        body: "We send transactional emails (order confirmations, shipping updates, invoices) which are mandatory, and promotional communications such as newsletters and offer alerts, which you may opt out of at any time via the unsubscribe link in any marketing email.",
      },
      {
        subtitle: "2.4 Fraud Prevention & Security",
        body: "We analyse usage patterns to detect, prevent, and respond to fraud, unauthorised access, and other illegal activities. This processing is carried out in our legitimate interests and is essential for platform security.",
      },
      {
        subtitle: "2.5 Legal Obligations",
        body: "We may process and retain your data to comply with applicable Indian laws including the Information Technology Act 2000, GST regulations, and any orders from competent legal authorities.",
      },
    ],
  },
  {
    id: "cookies",
    title: "3. Cookies & Tracking Technologies",
    content: [
      {
        subtitle: "3.1 What Cookies We Use",
        body: "We use essential cookies (required for shopping cart and login), performance cookies (analytics via Google Analytics to understand traffic), and preference cookies (to remember your language and currency preferences).",
      },
      {
        subtitle: "3.2 Managing Cookies",
        body: "You can configure or disable cookies in your browser settings at any time. Disabling essential cookies may prevent certain features — such as the shopping cart — from functioning correctly. We do not use cookies to serve third-party advertising.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing & Disclosure",
    content: [
      {
        subtitle: "4.1 Service Providers",
        body: "We share your data with carefully vetted third-party service providers who operate under strict data processing agreements, including shipping and logistics partners (Blue Dart, Delhivery, DTDC), payment processors, cloud infrastructure providers (hosting, databases), and email/SMS communication services.",
      },
      {
        subtitle: "4.2 Business Transfers",
        body: "In the event of a merger, acquisition, or sale of all or part of Udysonix Pvt Ltd's assets, your personal data may be transferred to the acquiring entity. You will be notified via email and a prominent notice on our website before your data becomes subject to a different privacy policy.",
      },
      {
        subtitle: "4.3 Legal Requirements",
        body: "We may disclose your information to law enforcement, regulators, or courts when required to do so by applicable law, court order, or governmental regulations, or when we believe disclosure is necessary to protect the rights, property, or safety of Udysonix Pvt Ltd, our customers, or others.",
      },
      {
        subtitle: "4.4 No Sale of Personal Data",
        body: "Udysonix Pvt Ltd does not sell, rent, or trade your personal information to any third party for their own marketing purposes.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: [
      {
        subtitle: "",
        body: "We retain your personal data for as long as your account is active or as needed to provide our services. Transaction records including invoices and order history are retained for a minimum of 7 years as required by Indian GST and tax laws. You may request deletion of your account and associated data by contacting support@sonixshop.in. Note that we may retain certain information as required by law or for legitimate business purposes.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights & Choices",
    content: [
      {
        subtitle: "6.1 Access & Correction",
        body: "You have the right to access the personal data we hold about you and to request corrections for any inaccuracies. You can update most information directly from your account dashboard.",
      },
      {
        subtitle: "6.2 Deletion",
        body: "You may request deletion of your personal data, subject to our legal obligations to retain certain records. Approved deletion requests are processed within 30 days.",
      },
      {
        subtitle: "6.3 Opt-Out of Marketing",
        body: "You can unsubscribe from marketing emails using the 'Unsubscribe' link in any email, or by updating your notification preferences in your account settings.",
      },
      {
        subtitle: "6.4 Data Portability",
        body: "Upon written request, we will provide you with a copy of your personal data in a commonly used, machine-readable format within 30 days.",
      },
    ],
  },
  {
    id: "security",
    title: "7. Security",
    content: [
      {
        subtitle: "",
        body: "Udysonix Pvt Ltd employs industry-standard technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include TLS/HTTPS encryption for all data in transit, encrypted storage for sensitive data at rest, access controls limiting who can view personal data, regular security audits and vulnerability assessments, and PCI-DSS compliant payment processing. Despite these measures, no data transmission over the internet can be guaranteed as 100% secure. You are responsible for keeping your account password confidential.",
      },
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: [
      {
        subtitle: "",
        body: "SonixShop is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided personal data to us, please contact us immediately and we will delete such information promptly.",
      },
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      {
        subtitle: "",
        body: "Udysonix Pvt Ltd reserves the right to update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will post the updated policy with a revised 'Last Updated' date. For significant changes, we will notify you by email or via a banner on the SonixShop homepage at least 14 days before the changes take effect. Continued use of our services after any changes constitutes your acceptance of the revised policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      {
        subtitle: "",
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact our Data Protection Team: Email: privacy@sonixshop.in | Phone: +91-80-XXXX-XXXX | Address: Udysonix Pvt Ltd, 4th Floor, Tech Park, Bengaluru, Karnataka — 560 001, India. We aim to respond to all privacy-related inquiries within 5 business days.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const tocItems = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <div className="relative w-full border-b border-slate-900 bg-gradient-to-b from-slate-950 to-[#020617] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Shield className="w-4 h-4" />
            <span>Legal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            This policy explains how <strong className="text-slate-200">Udysonix Pvt Ltd</strong>, operating the SonixShop platform, collects, uses, and safeguards your personal information.
          </p>
          <p className="text-slate-500 text-xs mt-4">
            Last Updated: <span className="text-slate-400 font-medium">23 May 2026</span>&nbsp;&nbsp;·&nbsp;&nbsp;Effective: <span className="text-slate-400 font-medium">23 May 2026</span>
          </p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Sticky TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-8 space-y-1 p-5 rounded-2xl border border-slate-800/60 bg-slate-950/40 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Contents</p>
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors py-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-indigo-400 transition-colors shrink-0" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Intro note */}
            <div className="mb-10 p-5 rounded-2xl border border-indigo-900/40 bg-indigo-950/20">
              <p className="text-sm text-indigo-200 leading-relaxed">
                By accessing or using SonixShop, you acknowledge that you have read, understood, and agree to the collection and use of your information as described in this Privacy Policy. This policy is governed by the laws of India and any disputes arising hereunder shall be subject to the jurisdiction of courts in Bengaluru, Karnataka.
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <h2 className="text-xl font-bold text-white mb-5 pb-3 border-b border-slate-800/60">
                    {section.title}
                  </h2>
                  <div className="space-y-5">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {item.subtitle && (
                          <h3 className="text-sm font-semibold text-slate-200 mb-2">
                            {item.subtitle}
                          </h3>
                        )}
                        <p className="text-sm text-slate-400 leading-7">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer nav */}
            <div className="mt-14 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-xs text-slate-500">
                © 2026 Udysonix Pvt Ltd. All rights reserved.
              </p>
              <div className="flex gap-5 text-xs">
                <Link href="/terms-and-conditions" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  Terms &amp; Conditions
                </Link>
                <Link href="/" className="text-slate-400 hover:text-slate-300 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
