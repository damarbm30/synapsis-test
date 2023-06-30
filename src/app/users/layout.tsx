import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
