import TreeDisplay from "./TreeDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wish Tree | Live Viewing",
  description: "Live interactive display of wishes",
};

export default function TreePage() {
  return (
    <main>
      <TreeDisplay />
    </main>
  );
}
