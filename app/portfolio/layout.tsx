import Rooting from "@/components/Rooting";
import { portfolioPageItems } from "@/constants/portfolioItems";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Rooting />
      <main>{children}</main>
    </>
  );
}

export async function generateStaticParams() {
  const paths = portfolioPageItems.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, "") },
  }));

  return paths;
}
