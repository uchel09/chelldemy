import Topbar from "@/components/layout/Topbar";

interface HomeProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeProps) => {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

export default HomeLayout;
