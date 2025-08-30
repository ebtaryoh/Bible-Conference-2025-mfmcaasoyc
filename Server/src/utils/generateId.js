// Generate Registration ID starting with MFMCYCBC25-XXXXXX (A–Z,0–9)
export function generateRegistrationId(prefix = "MFMCYCBC25") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // skip ambiguous chars
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${code}`;
}

// Five group colors (teams). Adjust names/hex as you like.
export const GROUP_COLORS = [
  { name: "Yellow", hex: "#f59e0b" },
  { name: "Orange", hex: "#f59e0b" },
  { name: "Green", hex: "#22c55e" },
  { name: "Purple", hex: "#8b5cf6" },
  { name: "Pink", hex: "#ec4899" }
];

export function pickRandomGroupColor() {
  return GROUP_COLORS[Math.floor(Math.random() * GROUP_COLORS.length)];
}

// Mask phone/email helpers for safe display (optional)
export function maskEmail(email) {
  if (!email) return "";
  const [u, d] = email.split("@");
  if (!d) return email;
  const u2 = u.length <= 2 ? u[0] + "*" : u[0] + "*".repeat(u.length - 2) + u[u.length - 1];
  return `${u2}@${d}`;
}

export function maskPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return "*".repeat(digits.length);
  return "*".repeat(digits.length - 4) + digits.slice(-4);
}
