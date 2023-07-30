import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { getGenerationCount } from "@/lib/api-limit";

const Navbar = async () => {
  const generationCount = await getGenerationCount();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar generationCount={generationCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
