import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <>
      <NextTopLoader
        color="#068fff"
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={false}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #068fff,0 0 5px #068fff"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />

      {children}
    </>
  );
};

export default MainProvider;
