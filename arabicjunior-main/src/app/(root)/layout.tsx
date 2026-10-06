import Newsletter from "@/globals/Newsletter";
import "../globals.css";
import { Footer, Header } from "@/globals";
import ChatbotWidget from "@/components/ChatbotWidget";
import Preloader from "@/components/Preloader";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div aria-label="home-layout" className="w-full relative">
      <Preloader />
      <Header />
      <div className="w-full relative overflow-x-clip">{children}</div>
      <Newsletter />
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
