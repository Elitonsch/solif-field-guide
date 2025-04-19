
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Share2, 
  Trash2, 
  Eye, 
  Plus 
} from "lucide-react";

// Cores baseadas no tema azul do logo
const BLUE_THEME = {
  primary: '#1EAEDB',   // Azul brilhante
  secondary: '#33C3F0', // Azul céu
  background: '#f0f8ff' // Azul claro suave
};

interface ReportCardProps {
  title: string;
  producer: string;
  date: string;
  onView: () => void;
  onShare: () => void;
  onDelete: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  title, 
  producer, 
  date, 
  onView, 
  onShare, 
  onDelete 
}) => (
  <Card 
    className="p-4 mb-3 shadow-sm" 
    style={{ backgroundColor: BLUE_THEME.background }}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold" style={{ color: BLUE_THEME.primary }}>
          {title}
        </h3>
        <p className="text-sm text-gray-600">{producer}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onView}
          className="text-blue-500 hover:bg-blue-50"
        >
          <Eye className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onShare}
          className="text-blue-500 hover:bg-blue-50"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDelete}
          className="text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
  const recentReports = [
    { 
      id: 1, 
      title: "Análise - Talhão Norte", 
      producer: "João Silva", 
      date: "19/04/2025" 
    },
    { 
      id: 2, 
      title: "Correção - Área Sul", 
      producer: "Maria Santos", 
      date: "18/04/2025" 
    }
  ];

  const handleReportAction = (action: string, id: number) => {
    console.log(`${action} relatório: ${id}`);
  };

  return (
    <div 
      className="p-4 min-h-screen" 
      style={{ backgroundColor: BLUE_THEME.background }}
    >
      {/* Header com Logo e PROdata */}
      <div className="flex items-center mb-6">
        <img 
          src="/logo-white.png" 
          alt="Logo SolIF" 
          className="h-8 w-auto"
        />
        <h1 className="ml-2 text-2xl font-bold" style={{ color: BLUE_THEME.primary }}>
          PROdata
        </h1>
      </div>

      {/* Card de Informações do Laboratório */}
      <Card className="p-6 mb-8 text-left shadow-md" style={{ backgroundColor: 'white' }}>
        <h2 className="text-xl font-semibold mb-3" style={{ color: BLUE_THEME.primary }}>
          Laboratório de Programação e Processamento de Dados
        </h2>
        <p className="text-gray-600 mb-2">
          Dedicado à análise e processamento de dados agrícolas
        </p>
        <p className="text-sm text-gray-500">
          Instituto Federal de Rondônia - IFRO
        </p>
        <p className="text-sm text-gray-500">
          Campus Ariquemes
        </p>
      </Card>

      {/* Seção de Relatórios Recentes */}
      <div className="space-y-4">
        <h3 
          className="text-lg font-semibold mb-2" 
          style={{ color: BLUE_THEME.primary }}
        >
          Relatórios Recentes
        </h3>
        {recentReports.map((report) => (
          <ReportCard
            key={report.id}
            title={report.title}
            producer={report.producer}
            date={report.date}
            onView={() => handleReportAction('Visualizar', report.id)}
            onShare={() => handleReportAction('Compartilhar', report.id)}
            onDelete={() => handleReportAction('Deletar', report.id)}
          />
        ))}
      </div>

      {/* Botão Flutuante */}
      <Link to="/analysis">
        <Button 
          className="fixed bottom-20 right-4 rounded-full shadow-lg"
          style={{ 
            backgroundColor: BLUE_THEME.primary, 
            color: 'white' 
          }}
        >
          <Plus className="mr-2" /> Nova Análise
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
