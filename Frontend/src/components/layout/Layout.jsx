import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <TopBar />

      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default Layout;