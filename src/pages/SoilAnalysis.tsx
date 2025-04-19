
import { PageHeader } from "@/components/PageHeader";
import { AnalysisList } from "@/components/AnalysisList";

const SoilAnalysis = () => {
  const analyses = [
    {
      id: 1,
      name: "Talhão Norte",
      producer: "João Silva",
      date: "19/04/2025"
    },
    {
      id: 2,
      name: "Área Sul",
      producer: "Maria Santos",
      date: "18/04/2025"
    }
  ];

  const handleEdit = (id: number) => {
    console.log('Editar análise:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Deletar análise:', id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Análises de Solo"
        description="Gerencie suas análises de solo"
      />
      
      <AnalysisList 
        analyses={analyses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SoilAnalysis;
