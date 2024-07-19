import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./theme-provider";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <>
      <NextTopLoader
        color="#E6332A"
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={false}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #E6332A,0 0 5px #E6332A"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default MainProvider;
