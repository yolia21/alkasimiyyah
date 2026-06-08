import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Diwan | Citizen Portal — Kasimid Sultanate",
  description:
    "Secure citizen portal of the Kasimid Sultanate. Access government services, travel documents, and civil administration.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ottoman-red-950 text-ivory-100">
      {children}
    </div>
  );
}
