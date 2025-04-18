
import { ReactNode } from "react";
import { TabNavigation } from "./TabNavigation";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen pb-16">
      <div className="container max-w-md mx-auto py-4 px-4">
        {children}
      </div>
      <TabNavigation />
    </div>
  );
}
