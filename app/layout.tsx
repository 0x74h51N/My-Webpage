import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppI18nProvider } from "@/utils/i18Provider";
import { AppReduxProvider } from "@/store/provider";
import PageTracker from "@/components/PageTracker";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrunchyPix",
  description: "Unleash the Power of Web Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Suspense fallback={<LoadingComponent />}>
          <AppReduxProvider>
            <AppI18nProvider>
              <PageTracker />
              <CustomCursor />
              <SpeedInsights />
              <Analytics />
              <div className="flex justify-center min-w-[100svw]">
                <Navbar />
              </div>
              <main>{children}</main>
              <Footer />
            </AppI18nProvider>
          </AppReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
