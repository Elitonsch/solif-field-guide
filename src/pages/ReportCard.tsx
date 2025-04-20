import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Share2, Trash2, MoreVertical } from "lucide-react";

const ReportCard = ({ property, date, onView, onDelete }) => {
  // Use breakpoint detection to force correct rendering
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listener para detectar mudanças no tamanho da tela
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Componente de botões para desktop
  const DesktopActions = () => (
    <div className="flex justify-end gap-1 mt-2 pt-2 border-t border-gray-100">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center text-blue-600 hover:bg-blue-50"
        onClick={onView}
      >
        <Eye size={16} className="mr-1" />
        Ver
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center text-green-600 hover:bg-green-50"
      >
        <Share2 size={16} className="mr-1" />
        Compartilhar
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center text-red-600 hover:bg-red-50"
        onClick={onDelete}
      >
        <Trash2 size={16} className="mr-1" />
        Deletar
      </Button>
    </div>
  );

  // Componente do menu dropdown para mobile
  const MobileActions = () => (
    <div className="absolute top-4 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onView} className="flex items-center">
            <Eye size={16} className="mr-2 text-blue-600" />
            Ver
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center">
            <Share2 size={16} className="mr-2 text-green-600" />
            Compartilhar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="flex items-center text-red-600">
            <Trash2 size={16} className="mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm relative">
      <div className="flex flex-col pr-6">
        <h3 className="font-medium text-gray-800">{property}</h3>
        <p className="text-sm text-gray-500">Data: {date}</p>
      </div>
      
      {/* Renderiza condicionalmente com base no tamanho da tela */}
      {isMobile ? <MobileActions /> : <DesktopActions />}
    </div>
  );
};

export default ReportCard;
