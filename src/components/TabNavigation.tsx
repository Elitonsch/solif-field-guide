
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FlaskConical, 
  Wrench, 
  Sprout, 
  FileText 
} from "lucide-react";

interface NavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  to: string;
}

const NavItem = ({ icon: Icon, label, to }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "nav-link", 
        isActive ? "active" : ""
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "" : "text-muted-foreground")} />
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export function TabNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background flex justify-around py-1">
      <NavItem icon={Home} label="Home" to="/" />
      <NavItem icon={FlaskConical} label="Analysis" to="/analysis" />
      <NavItem icon={Wrench} label="Correction" to="/correction" />
      <NavItem icon={Sprout} label="Fertilizer" to="/fertilization" />
      <NavItem icon={FileText} label="Reports" to="/reports" />
    </div>
  );
}
