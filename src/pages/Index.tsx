import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Eye, Share2, FileText, Microscope, Wrench, Sprout } from "lucide-react";
import LabHeader from "@/components/LabHeader";
import ReportCard from "@/components/ReportCard";
import NavigationBar from "@/components/NavigationBar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Report {
  id: number;
  property: string;
  date: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      property: "Fazenda São João",
      date: "15/04/2025",
    },
    {
      id: 2,
      property: "Sítio Esperança",
      date: "12/04/2025",
    },
    {
      id: 3,
      property: "Rancho Bom Sucesso",
      date: "05/04/2025",
    },
  ]);

  const handleNewProject = () => {
    navigate("/analysis");
    toast.info("Iniciando novo projeto...");
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
    toast.success("Relatório removido com sucesso!");
  };

  const handleViewReport = (id: number) => {
    navigate(`/report`);
    toast.info("Visualizando relatório...");
  };

  const quickAccessItems = [
    { icon: Microscope, label: "Nova Análise", route: "/analysis" },
    { icon: Wrench, label: "Correção", route: "/correction" },
    { icon: Sprout, label: "Adubação", route: "/fertilization" },
    { icon: FileText, label: "Relatório", route: "/report" },
  ];

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white text-gray-900 p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">SolIF Mobile</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <LabHeader />

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Bem-vindo ao SolIF Mobile
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Sua ferramenta completa para análise de solo, recomendações de correção
            e adubação. Registre, analise e gere relatórios técnicos com praticidade
            e precisão.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          {quickAccessItems.map((item) => (
            <Button
              key={item.route}
              variant="outline"
              className="flex flex-col h-20 sm:h-24 items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-solif-50 hover:border-solif-200 transition-all"
              onClick={() => navigate(item.route)}
            >
              <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-solif-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileText size={18} className="text-solif-600" />
            Relatórios Gerados
          </h2>
          
          {reports.length > 0 ? (
            <div className="space-y-3 sm:space-y-4 animate-fade-in">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  property={report.property}
                  date={report.date}
                  onView={() => handleViewReport(report.id)}
                  onDelete={() => handleDeleteReport(report.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 bg-white rounded-lg border border-gray-200 animate-fade-in">
              <p className="text-gray-500 text-sm sm:text-base">Nenhum relatório encontrado</p>
              <Button 
                variant="link" 
                onClick={handleNewProject}
                className="mt-2 text-solif-600 text-sm sm:text-base"
              >
                Criar novo projeto
              </Button>
            </div>
          )}
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Index;
