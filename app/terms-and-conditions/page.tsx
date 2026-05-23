import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — SonixShop",
  description:
    "Read the Terms and Conditions governing your use of SonixShop, operated by Udysonix Pvt Ltd. Understand your rights and obligations as a customer.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        subtitle: "",
        body: "By accessing, browsing, or placing an order on SonixShop (accessible at www.sonixshop.in), you confirm that you are at least 18 years of age (or have the consent of a parent or legal guardian), you have read and agree to be legally bound by these Terms and Conditions, you have read and accept our Privacy Policy, and you have the legal capacity to enter into binding contracts under the laws of India. If you do not agree to these Terms, you must discontinue use of SonixShop immediately. Udysonix Pvt Ltd reserves the right to modify these Terms at any time. Continued use after changes are posted constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: [
      {
        subtitle: "",
        body: "'Company', 'We', 'Us', or 'Our' refers to Udysonix Pvt Ltd, registered in India. 'Platform' means the SonixShop website and any associated mobile applications. 'User', 'You', or 'Customer' refers to the person accessing or using the Platform. 'Products' means the physical gadgets, accessories, and electronics listed for sale on the Platform. 'Order' means a confirmed request to purchase one or more Products. 'Seller' refers to third-party vendors who list Products on the Platform (if applicable). 'Content' refers to text, images, descriptions, prices, reviews, and all other information displayed on the Platform.",
      },
    ],
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: [
      {
        subtitle: "3.1 Registration",
        body: "To place an order, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately at support@sonixshop.in if you suspect unauthorised access to your account.",
      },
      {
        subtitle: "3.2 Account Suspension",
        body: "Udysonix Pvt Ltd reserves the right to suspend or permanently terminate any account that violates these Terms, engages in fraudulent activity, places orders with invalid payment information, or abuses promotions or coupon codes. We will make reasonable efforts to notify you before taking such action.",
      },
      {
        subtitle: "3.3 One Account Per Person",
        body: "Each individual may maintain only one personal account. Creating multiple accounts to abuse discounts, referral programmes, or promotions is strictly prohibited and may result in cancellation of all associated orders and accounts.",
      },
    ],
  },
  {
    id: "products-pricing",
    title: "4. Products, Pricing & Availability",
    content: [
      {
        subtitle: "4.1 Product Descriptions",
        body: "We strive to ensure that product descriptions, specifications, images, and pricing information on SonixShop are accurate. However, we do not warrant that product descriptions or other content are error-free, complete, or current. In cases of inaccuracy discovered after an order is placed, we reserve the right to cancel the order and issue a full refund.",
      },
      {
        subtitle: "4.2 Pricing",
        body: "All prices on SonixShop are listed in Indian Rupees (INR) and include applicable GST unless otherwise stated. Shipping charges, if applicable, are displayed at checkout. Udysonix Pvt Ltd reserves the right to change prices at any time without prior notice. Price changes will not affect orders that have already been confirmed.",
      },
      {
        subtitle: "4.3 Stock Availability",
        body: "Product listings are subject to availability. In the event that a Product becomes unavailable after your order has been placed, we will notify you by email and offer a full refund or the option to choose an alternative product.",
      },
      {
        subtitle: "4.4 Promotions & Coupon Codes",
        body: "Promotional discounts and coupon codes are subject to specific terms and validity periods. They cannot be combined with other offers unless explicitly stated, are non-transferable, have no cash value, and may be withdrawn at any time without notice. Coupon codes found through unauthorised channels may be rejected.",
      },
    ],
  },
  {
    id: "ordering-payment",
    title: "5. Ordering & Payment",
    content: [
      {
        subtitle: "5.1 Order Process",
        body: "An order confirmation email acknowledges receipt of your order. A binding contract of sale is formed only when we dispatch the item and send you a shipment confirmation. Udysonix Pvt Ltd reserves the right to refuse or cancel any order at its sole discretion, including orders that appear fraudulent or placed in unusual quantities.",
      },
      {
        subtitle: "5.2 Payment Methods",
        body: "We accept major credit and debit cards (Visa, Mastercard, American Express), UPI (Google Pay, PhonePe, Paytm), Net Banking, and select Buy Now Pay Later (BNPL) options as available. All payments are processed by PCI-DSS compliant payment gateways. Udysonix Pvt Ltd does not store your full card details on our servers.",
      },
      {
        subtitle: "5.3 Payment Failure",
        body: "If your payment fails, your order will not be confirmed. Do not attempt to make multiple payments for the same order without first verifying with our support team. Any duplicate payments received will be refunded within 7 business days.",
      },
      {
        subtitle: "5.4 Invoice & GST",
        body: "A GST-compliant tax invoice will be issued electronically for all orders and sent to your registered email address. The invoice will reflect Udysonix Pvt Ltd as the seller of record.",
      },
    ],
  },
  {
    id: "shipping-delivery",
    title: "6. Shipping & Delivery",
    content: [
      {
        subtitle: "6.1 Delivery Timelines",
        body: "Estimated delivery dates are provided in good faith but are not guaranteed. Standard delivery within India typically takes 4–7 business days. Express delivery options may be available at checkout for an additional charge. Deliveries may be delayed due to circumstances beyond our control, including natural disasters, courier strikes, or government restrictions.",
      },
      {
        subtitle: "6.2 Shipping Charges",
        body: "Free shipping is available on all orders above ₹499. Orders below this threshold attract a flat shipping fee as displayed at checkout. Remote or difficult-to-access locations may attract additional shipping charges, which will be communicated before order confirmation.",
      },
      {
        subtitle: "6.3 Risk of Loss",
        body: "Risk of loss and damage to products passes to you upon delivery. If your shipment arrives visibly damaged, please refuse delivery or document the damage and contact our support team within 48 hours of receipt.",
      },
      {
        subtitle: "6.4 Unsuccessful Deliveries",
        body: "If a delivery attempt is unsuccessful because no one is available to receive it, the carrier will typically make one or two additional attempts. If the order is returned to us undelivered, we will contact you to arrange re-delivery (which may attract an additional charge) or issue a refund minus original shipping costs.",
      },
    ],
  },
  {
    id: "returns-refunds",
    title: "7. Returns, Exchanges & Refunds",
    content: [
      {
        subtitle: "7.1 Return Window",
        body: "Most items purchased on SonixShop are eligible for return within 10 days of delivery, provided they are unused, in original packaging with all accessories and tags intact, and accompanied by the original invoice. Certain product categories including personal care accessories, consumables, and software are not eligible for return.",
      },
      {
        subtitle: "7.2 Damaged or Defective Items",
        body: "If you receive a defective or incorrect item, please contact support@sonixshop.in within 48 hours of delivery with photo/video evidence. We will arrange a free pickup and replacement or full refund at no cost to you.",
      },
      {
        subtitle: "7.3 Refund Processing",
        body: "Approved refunds are processed to your original payment method within 7–10 business days of us receiving and inspecting the returned item. Refunds for UPI and bank transfers may take up to 5 additional business days to reflect in your account depending on your bank.",
      },
      {
        subtitle: "7.4 Non-Returnable Items",
        body: "Items that have been used, damaged by the user, are missing original packaging or accessories, or where the serial number has been tampered with will not be accepted for return. Digital products and gift cards are non-refundable.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: [
      {
        subtitle: "",
        body: "All content on SonixShop including but not limited to the brand name, logo, product images, descriptions, website design, user interface, and software is the intellectual property of Udysonix Pvt Ltd or its licensors, and is protected under applicable Indian and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from the Platform without prior written permission from Udysonix Pvt Ltd. Unauthorised use may result in civil and criminal liability.",
      },
    ],
  },
  {
    id: "prohibited-conduct",
    title: "9. Prohibited Conduct",
    content: [
      {
        subtitle: "",
        body: "By using SonixShop, you agree not to: use the Platform for any unlawful purpose or in violation of any applicable laws; submit false, inaccurate, or fraudulent information; use bots, scrapers, or automated tools to access or collect data from the Platform; attempt to gain unauthorised access to any part of the Platform or its related systems; post defamatory, offensive, or harmful content in reviews or communications; resell products purchased on SonixShop on other platforms without our written consent; interfere with the proper functioning of the Platform; or impersonate any person or entity.",
      },
    ],
  },
  {
    id: "limitation-liability",
    title: "10. Limitation of Liability",
    content: [
      {
        subtitle: "",
        body: "To the maximum extent permitted under applicable law, Udysonix Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Platform or Products. Our total aggregate liability for any claim arising out of or relating to these Terms or your use of SonixShop shall not exceed the total amount paid by you for the specific order giving rise to the claim in the preceding 3 months. Nothing in these Terms excludes liability for fraud, death, or personal injury caused by our negligence, or any other liability that cannot be excluded by law.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Dispute Resolution",
    content: [
      {
        subtitle: "",
        body: "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any dispute, controversy, or claim arising out of or relating to these Terms shall first be attempted to be resolved amicably through good-faith negotiation. If the dispute remains unresolved after 30 days, it shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Bengaluru, Karnataka, India. The arbitration shall be conducted in English. For consumer disputes, you may also approach the appropriate Consumer Forum under the Consumer Protection Act, 2019.",
      },
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: [
      {
        subtitle: "",
        body: "For any questions, complaints, or concerns regarding these Terms and Conditions, please contact us: Email: legal@sonixshop.in | Customer Support: support@sonixshop.in | Phone: +91-80-XXXX-XXXX | Postal Address: Udysonix Pvt Ltd, 4th Floor, Tech Park, Bengaluru, Karnataka — 560 001, India. Grievance Officer: [Name], reachable at grievance@sonixshop.in, available Monday to Friday, 10:00 AM to 6:00 PM IST.",
      },
    ],
  },
];

export default function TermsAndConditionsPage() {
  const tocItems = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <div className="relative w-full border-b border-slate-900 bg-gradient-to-b from-slate-950 to-[#020617] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <FileText className="w-4 h-4" />
            <span>Legal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            These Terms and Conditions govern your use of SonixShop, owned and operated by{" "}
            <strong className="text-slate-200">Udysonix Pvt Ltd</strong>. Please read them carefully before using our platform.
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
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-purple-400 transition-colors py-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-purple-400 transition-colors shrink-0" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Intro note */}
            <div className="mb-10 p-5 rounded-2xl border border-purple-900/40 bg-purple-950/20">
              <p className="text-sm text-purple-200 leading-relaxed">
                These Terms constitute a legally binding agreement between you and Udysonix Pvt Ltd. By using SonixShop, you agree to comply with and be bound by these Terms. If you disagree with any part of these Terms, please discontinue use of the Platform immediately.
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
                <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Privacy Policy
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
