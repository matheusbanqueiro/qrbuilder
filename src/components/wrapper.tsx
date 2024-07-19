import { ReactNode, memo } from "react";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <main className="max-w-7xl mx-auto flex flex-col">{children}</main>;
};

export default memo(Wrapper);