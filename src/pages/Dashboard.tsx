
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

const Dashboard = () => {
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
      
      <div className="flex justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Desenvolvido por</span>
          <strong className="font-medium">PROdata</strong>
          <span>&</span>
          <strong className="font-medium">IFRO</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
