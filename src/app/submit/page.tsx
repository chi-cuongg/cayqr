import SubmitForm from "./SubmitForm";
import styles from "./submit.module.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Gửi Điều Ước | Cây Điều Ước",
  description: "Thêm điều ước của bạn lên cây điều ước kỹ thuật số",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function SubmitPage() {
  return (
    <main className={styles.container}>
      <SubmitForm />
    </main>
  );
}
