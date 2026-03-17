import QRCodeDisplay from "./QRCodeDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quét Để Tham Gia | Cây Điều Ước",
  description: "Quét mã QR để gửi điều ước của bạn",
};

export default function QRPage() {
  return (
    <main>
      <QRCodeDisplay />
    </main>
  );
}
