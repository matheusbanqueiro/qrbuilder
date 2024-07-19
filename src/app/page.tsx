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
        className="mx-auto dark:flex hidden"
      />
      <Image
        src={"/assets/brand/logo-secondary.svg"}
        width={400}
        height={400}
        alt="logo qrbuilder"
        className="mx-auto dark:hidden flex"
      />
      <Generator />
    </main>
  );
};

export default Home;
