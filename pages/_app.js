import { AuthProvider } from "../components/authContext";
import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import { AnimatePresence } from "framer-motion";
import Chakra from "../components/chakra";
import Payhip from "../components/payhip";
import { Analytics } from "@vercel/analytics/react";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function Website({ Component, pageProps, router }) {
  const isLoginPage = router.pathname === "/login"; // Detectar si estamos en Login

  return (
    <AuthProvider>
      {isLoginPage ? (
     
        <Component {...pageProps} key={router.route} />
      ) : (
        <Chakra cookies={pageProps.cookies}>
          <Fonts />
          <Payhip />
          <Layout router={router}>
            <AnimatePresence
              mode="wait"
              initial={true}
              onExitComplete={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0 });
                }
              }}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
            <Analytics />
          </Layout>
        </Chakra>
      )}
    </AuthProvider>
  );
}

export default Website;
