import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getGenerationCount } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const generationCount = await getGenerationCount();

  return (
    <div className="h-full relative">
      {/* This div hidden on mobile views */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar generationCount={generationCount} />
      </div>
      <main className="md:pl-72">
        <Navbar /> {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
