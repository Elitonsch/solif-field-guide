
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FlaskConical,
  Wrench,
  Sprout,
  FileText,
  ArrowRight,
  Share2,
  Trash2,
  Eye,
  Plus
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  to 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string; 
  to: string;
}) => (
  <Link to={to}>
    <Card className="soil-card hover:shadow-md transition-all duration-200 flex items-start gap-3 hover:border-primary/50">
      <div className="bg-primary/10 p-2 rounded-md">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm flex items-center gap-1">
          {title}
          <ArrowRight className="h-3 w-3 ml-auto" />
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </Card>
  </Link>
);

const ReportCard = ({ 
  title, 
  date,
  producer,
  onView,
  onShare,
  onDelete
}: { 
  title: string; 
  date: string;
  producer: string;
  onView: () => void;
  onShare: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card className="soil-card p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{producer}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onView} className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare} className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const recentReports = [
    { 
      id: 1, 
      title: "Análise - Talhão Norte", 
      date: "19/04/2025", 
      producer: "João Silva",
      type: "Análise de solo argiloso" 
    },
    { 
      id: 2, 
      title: "Correção - Área Sul", 
      date: "18/04/2025", 
      producer: "Maria Santos",
      type: "Correção de solo arenoso" 
    }
  ];

  const handleView = (id: number) => {
    console.log('Visualizar relatório:', id);
  };

  const handleShare = (id: number) => {
    console.log('Compartilhar relatório:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Deletar relatório:', id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
        <div className="bg-primary/10 p-3 rounded-full">
          <h1 className="text-2xl font-bold text-primary">SolIF</h1>
        </div>
        <div>
          <h2 className="text-lg font-semibold">PROdata</h2>
          <p className="text-sm text-muted-foreground">
            Laboratório de Programação e Processamento de Dados
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Tecnologia para o campo
          </p>
        </div>
      </div>

      <PageHeader 
        title="Painel de Controle" 
        description="Gerencie análises de solo e obtenha recomendações" 
      />

      <div className="grid gap-3">
        <FeatureCard 
          icon={FlaskConical} 
          title="Análise de Solo" 
          description="Registre propriedades químicas e parâmetros" 
          to="/analysis" 
        />
        <FeatureCard 
          icon={Wrench} 
          title="Correção" 
          description="Calcule recomendações de calagem e gesso" 
          to="/correction" 
        />
        <FeatureCard 
          icon={Sprout} 
          title="Adubação" 
          description="Obtenha planos precisos de adubação" 
          to="/fertilization" 
        />
        <FeatureCard 
          icon={FileText} 
          title="Relatórios" 
          description="Gere e exporte relatórios profissionais" 
          to="/reports" 
        />
      </div>

      {recentReports.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Relatórios Recentes</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/reports" className="text-xs">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-2">
            {recentReports.map((report) => (
              <ReportCard 
                key={report.id}
                title={report.title}
                producer={report.producer}
                date={report.date}
                onView={() => handleView(report.id)}
                onShare={() => handleShare(report.id)}
                onDelete={() => handleDelete(report.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Desenvolvido por</span>
          <strong className="font-medium">PROdata</strong>
          <span>&</span>
          <strong className="font-medium">IFRO</strong>
        </div>
      </div>

      <Button 
        className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg"
        size="icon"
        asChild
      >
        <Link to="/analysis">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
