export const projects = [
  {
    code: "MATM",
    name: "Micro ATM",
    summary:
      "Secure Micro-ATM backend: cash withdrawal, balance and mini-statement via handheld terminals. Dynamic NPCI bank routing, AES-256 data protection.",
    tags: ["ISO 8583", "NPCI", "AES-256"],
  },
  {
    code: "POS",
    name: "Point of Sale",
    summary:
      "mPOS card-payment platform with real-time validation across banks. Switch Handler for NSDL and IPPB routing, HSM tokenization, dynamic ISO 8583.",
    tags: ["ISO 8583", "HSM", "Multi-bank"],
  },
  {
    code: "AEPS",
    name: "Aadhaar Payments",
    summary:
      "Aadhaar biometric payments (RD Services: Mantra, Morpho) per UIDAI. Secure PID block processing, device certification, HMAC validation.",
    tags: ["UIDAI", "Biometric", "HMAC"],
  },
  {
    code: "BBPS",
    name: "Bharat Bill Payment",
    summary:
      "Real-time utility bill pay on NPCI BBPS. Microservices for biller discovery, validation, payment and settlement; async for scale.",
    tags: ["NPCI BBPS", "Microservices", "Async"],
  },
] as const;
