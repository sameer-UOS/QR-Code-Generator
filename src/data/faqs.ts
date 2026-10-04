export interface FAQItem {
  id: string;
  question: string;
  category: 'General' | 'Privacy & Security' | 'Customization & Print' | 'Technical';
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'is-it-free',
    category: 'General',
    question: 'Is this QR code generator really free with no hidden charges?',
    answer: 'Yes, 100%. QuickQR generates static QR codes entirely on the client side in your web browser. There are no monthly subscriptions, no watermarks, no registration walls, and no artificial daily limits. You can generate and download as many high-resolution QR codes as you need.',
  },
  {
    id: 'do-qr-expire',
    category: 'General',
    question: 'Do the generated QR codes ever expire?',
    answer: 'Never. QuickQR generates standard static QR codes where the actual payload (such as your URL, Wi-Fi password, or vCard) is directly encoded into the matrix dots. Because it does not pass through a redirect server or expiring database, the code will remain functional permanently.',
  },
  {
    id: 'commercial-use',
    category: 'General',
    question: 'Can I use the generated QR codes for commercial purposes?',
    answer: 'Yes! You have full rights to use your downloaded QR codes on commercial products, restaurant menus, retail packaging, billboard advertising, books, flyers, and digital marketing materials without paying royalties or attributing QuickQR.',
  },
  {
    id: 'privacy-server',
    category: 'Privacy & Security',
    question: 'Does QuickQR store my Wi-Fi password or personal contact details?',
    answer: 'No. All QR code matrix calculations, image rendering, and exports occur locally inside your device’s web browser using JavaScript and HTML5 Canvas. Your Wi-Fi credentials, phone numbers, and vCard details are never transmitted over the internet to our servers or stored in any database.',
  },
  {
    id: 'export-formats',
    category: 'Customization & Print',
    question: 'Which file formats can I download?',
    answer: 'We provide four genuine export formats: (1) High-resolution PNG up to 4096px with optional transparency; (2) Standard JPG with automatic solid background fallback; (3) Scalable Vector SVG (ideal for large-scale billboards and vector editors like Illustrator and Figma); and (4) Print-Ready PDF document formatted with centering, guidelines, and encoded metadata.',
  },
  {
    id: 'logo-safety',
    category: 'Customization & Print',
    question: 'Can I add a custom logo in the center of the QR code?',
    answer: 'Yes. You can upload any PNG, JPG, or SVG logo or choose from our quick presets. When a logo is active, QuickQR automatically elevates the QR error correction to Level Q (25%) or Level H (30%) and adds a protective knockout shield to ensure maximum scannability. We recommend keeping the logo size under 25% of the total QR code width.',
  },
  {
    id: 'scanner-verification',
    category: 'Technical',
    question: 'How does the built-in Real-Time Scanner Verification work?',
    answer: 'Whenever you change your content, colors, patterns, or logo, QuickQR runs an actual embedded optical barcode reader (jsQR) on the rendered canvas image in real time. It confirms whether standard smartphone camera decoders can successfully read the payload and alerts you immediately if contrast or logo density makes it difficult to scan.',
  },
  {
    id: 'static-vs-dynamic',
    category: 'Technical',
    question: 'What is the difference between Static and Dynamic QR codes?',
    answer: 'A static QR code embeds the final content directly. Once printed, the content cannot be modified, but it never relies on an intermediary host. A dynamic QR code points to a redirect service so the destination can be edited later. QuickQR specializes in static QR codes because they are genuinely free, private, and permanent.',
  },
  {
    id: 'print-quality',
    category: 'Customization & Print',
    question: 'How can I ensure my QR code prints sharply without blurriness?',
    answer: 'For professional offset or digital printing, always download the Vector SVG format or the Print-Ready PDF. Unlike raster images that can pixelate when scaled up, vector SVG maintains infinite mathematical sharpness at billboard sizes.',
  },
  {
    id: 'wifi-compatibility',
    category: 'Technical',
    question: 'Will the Wi-Fi QR code work on both iPhones and Android phones?',
    answer: 'Yes. QuickQR uses the universal Wi-Fi QR specification (WIFI:T:WPA;S:ssid;P:password;;). Both iOS (iOS 11 and later) and Android (Android 10 and later) natively recognize this standard directly inside their default camera apps without requiring any third-party scanner.',
  },
  {
    id: 'contrast-rules',
    category: 'Customization & Print',
    question: 'Can I use custom brand colors for my QR code?',
    answer: 'Yes, you can customize both the foreground and background colors. However, always ensure high optical contrast (we recommend a dark foreground on a white or light background). Our editor features a live contrast ratio checker that warns you if your chosen color combination falls below the 4:1 scannability threshold.',
  },
  {
    id: 'account-needed',
    category: 'General',
    question: 'Do I need to sign up or provide an email address?',
    answer: 'No. QuickQR has zero login screens, zero email captures, and zero password requirements. Open the website, choose your type, customize your design, and download your file in seconds.',
  },
];
