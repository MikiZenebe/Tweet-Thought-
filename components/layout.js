import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>

      <Footer />
    </div>
  );
}
