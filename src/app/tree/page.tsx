import TreeDisplay from "./TreeDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cây Điều Ước | Trực Tiếp",
  description: "Giao diện hiển thị điều ước tương tác trực tiếp",
};

export default function TreePage() {
  return (
    <main>
      <TreeDisplay />
    </main>
  );
}
