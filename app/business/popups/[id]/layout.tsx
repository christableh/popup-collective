import { popups } from "@/lib/popups";

export function generateStaticParams() {
  return popups.map((p) => ({ id: p.id }));
}

export default function PopUpLayout({ children }: LayoutProps<"/business/popups/[id]">) {
  return children;
}
