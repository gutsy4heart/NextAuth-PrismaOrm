import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
