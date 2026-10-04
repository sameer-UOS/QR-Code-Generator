export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  content: string[];
  keyTips: string[];
  targetCategory: string;
}

export const GUIDES: GuideArticle[] = [
  {
    id: 'wifi-qr-guide',
    slug: 'how-to-create-wifi-qr-code',
    title: 'How to Create a Wi-Fi QR Code for Instant Guest Access',
    category: 'Wi-Fi & Networking',
    readTime: '3 min read',
    description: 'Learn how Wi-Fi QR codes work, the exact format required, and how guests can connect with a single camera tap without typing long passwords.',
    content: [
      'Sharing Wi-Fi passwords with guests, customers, or colleagues often leads to tedious mistakes, especially when using complex alphanumeric passphrases. A Wi-Fi QR code completely eliminates this friction by encoding the authentication parameters directly into a standardized protocol that iOS and Android recognize natively.',
      'When an iPhone camera or Android device scans a Wi-Fi QR code formatted according to the WIFI:T:WPA;S:ssid;P:password;; standard, a native prompt instantly appears: "Join [Network Name] Network?". Tapping Join automatically negotiates the handshake and connects the device without displaying or requiring manual entry of the passphrase.',
      'Security tip: For guest Wi-Fi networks in cafes or Airbnb rentals, we recommend using WPA/WPA2 or WPA3 authentication and printing the QR code on a non-reflective surface at least 3 x 3 cm in size.',
    ],
    keyTips: [
      'Ensure your SSID matches the broadcast name with exact capitalization.',
      'Check "Hidden Network" only if your router does not broadcast its SSID beacon.',
      'Always test the printed code with both an iPhone and an Android phone before laminating or framing.',
    ],
    targetCategory: 'wifi',
  },
  {
    id: 'print-design-best-practices',
    slug: 'qr-code-design-and-print-best-practices',
    title: 'QR Code Print & Design Best Practices: Sizing, Contrast & Quiet Zones',
    category: 'Design & Production',
    readTime: '4 min read',
    description: 'A comprehensive checklist for designers and print production teams to prevent unscannable QR codes on billboards, packaging, and business cards.',
    content: [
      'A common design mistake is treating a QR code as a decorative illustration rather than an optical barcode. Smartphone cameras rely on high optical contrast and edge detection to locate the three square finder patterns in the corners.',
      'Rule 1: Sizing Formula (The 10:1 Ratio). As a rule of thumb, the QR code width should be at least 1/10th of the scanning distance. For a handheld menu or business card scanned from 20 cm away, a minimum size of 2 x 2 cm (0.8 x 0.8 in) is required. For a poster scanned from 2 meters away, design the QR code to be at least 20 x 20 cm.',
      'Rule 2: Contrast & Inversion. The background should be significantly lighter than the foreground. While dark backgrounds with white modules are technically valid in some decoders, many budget Android cameras struggle with inverted codes. Always maintain at least a 4:1 WCAG contrast ratio.',
      'Rule 3: Respect the Quiet Zone. Every QR code requires a blank border (quiet zone) of at least 4 module widths around the entire code. If other graphic elements or crop lines encroach on this zone, camera sensors cannot isolate the matrix.',
    ],
    keyTips: [
      'Export in Vector SVG or Print-Ready PDF at 300+ DPI for commercial printing.',
      'Never stretch, skew, or distort the aspect ratio of the QR square.',
      'Avoid high-gloss laminates or reflective foils that create glare under direct lighting.',
    ],
    targetCategory: 'url',
  },
  {
    id: 'static-vs-dynamic',
    slug: 'static-vs-dynamic-qr-codes-explained',
    title: 'Static vs. Dynamic QR Codes: Everything You Need to Know',
    category: 'Technical Architecture',
    readTime: '5 min read',
    description: 'Understand the fundamental architecture differences between direct-encoded static QR codes and server-routed dynamic QR codes.',
    content: [
      'The biggest confusion among QR code users is understanding whether their QR code will "expire" or stop working after a few weeks.',
      'Static QR Codes (What QuickQR creates): The raw payload (URL, Wi-Fi password, vCard data, or plain text) is directly encoded into the binary matrix of dots. Because there is no intermediary server or database redirect involved, a static QR code never expires. As long as the target website remains online or the Wi-Fi password does not change, the QR code works forever. Furthermore, static codes offer 100% privacy because your data is never sent to or logged on a third-party server.',
      'Dynamic QR Codes: In contrast, dynamic QR codes encode a short redirect URL pointing to a provider\'s backend server (e.g. qr.provider.com/x92b). When scanned, the user hits the provider\'s server first, which logs the scan analytics before redirecting to the final destination. The benefit is you can change the final URL later without reprinting; the drawback is that if the provider shuts down or charges a subscription, all your printed codes break.',
    ],
    keyTips: [
      'Use Static QR codes for Wi-Fi, vCards, personal portfolios, and permanent websites.',
      'Static codes are completely free, private, and permanent.',
      'Dynamic codes are only necessary when you anticipate needing to change a marketing campaign URL after printing 10,000 flyers.',
    ],
    targetCategory: 'url',
  },
  {
    id: 'vcard-digital-business-cards',
    slug: 'complete-guide-to-vcard-qr-codes',
    title: 'How to Build Digital Business Cards with vCard 3.0 QR Codes',
    category: 'Networking',
    readTime: '3 min read',
    description: 'Turn your traditional paper business card into an instant contact download with vCard standard encoding.',
    content: [
      'Paper business cards often end up lost in wallets or discarded. By adding a vCard QR code to the back of your card, any new contact can point their phone camera at your card and tap "Add to Contacts" to instantly populate their address book.',
      'QuickQR formats contact payloads according to the universal vCard 3.0 specification (RFC 2426). This includes full name, organization, job title, phone numbers, email, company website, physical office address, and personalized notes.',
      'Payload tip: Because vCard encodes substantial text data, the QR code matrix will be denser (e.g., Version 5 to 7). Always use a slightly larger print size (at least 2.5 x 2.5 cm) and keep Error Correction at Level M or Q for rapid scanning.',
    ],
    keyTips: [
      'Include international dialing codes (e.g., +1, +44, +49) so contacts abroad can dial effortlessly.',
      'Keep note fields concise to avoid an overly dense QR matrix.',
      'Pair the vCard QR code with your printed name and phone number as a dual backup.',
    ],
    targetCategory: 'vcard',
  },
];
