import Generator from "@/components/generator";
import { ModeToggle } from "@/components/ui/modetoggle";
import Image from "next/image";

const Home = () => {
  return (
    <main className="mx-auto flex flex-col items-center">
      <ModeToggle/>
      <Image
        src={"/assets/brand/logo-primary.svg"}
        width={400}
        height={400}
        alt="logo qrbuilder"
        className="mx-auto w-64 md:w-80 dark:flex hidden"
      />
      <Image
        src={"/assets/brand/logo-secondary.svg"}
        width={400}
        height={400}
        alt="logo qrbuilder"
        className="mx-auto w-64 md:w-80 dark:hidden flex"
      />
      <Generator />
    </main>
  );
};

export default Home;
