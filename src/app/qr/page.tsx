import QRCodeDisplay from "./QRCodeDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan to Join | Wish Tree",
  description: "Scan the QR code to submit your wish",
};

export default function QRPage() {
  return (
    <main>
      <QRCodeDisplay />
    </main>
  );
}
