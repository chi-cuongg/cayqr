import SubmitForm from "./SubmitForm";
import styles from "./submit.module.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Make a Wish | Wish Tree",
  description: "Add your wish to the interactive digital tree",
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
