
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AnalysisList } from "@/components/AnalysisList";
import { AnalysisForm } from "@/components/AnalysisForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Analysis = {
  id: number;
  name: string;
  producer: string;
  date: string;
};

const SoilAnalysis = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  const handleAdd = (data: Omit<Analysis, "id">) => {
    const newAnalysis = {
      ...data,
      id: analyses.length + 1,
    };
    setAnalyses([...analyses, newAnalysis]);
    toast.success("Análise adicionada com sucesso!");
  };

  const handleEdit = (data: Analysis) => {
    setAnalyses(analyses.map(a => a.id === data.id ? data : a));
    toast.success("Análise atualizada com sucesso!");
  };

  const handleDelete = () => {
    if (selectedAnalysis) {
      setAnalyses(analyses.filter(a => a.id !== selectedAnalysis.id));
      setSelectedAnalysis(null);
      setShowDeleteDialog(false);
      toast.success("Análise excluída com sucesso!");
    }
  };

  const openEditDialog = (id: number) => {
    const analysis = analyses.find(a => a.id === id);
    if (analysis) {
      setSelectedAnalysis(analysis);
      setShowForm(true);
    }
  };

  const openDeleteDialog = (id: number) => {
    const analysis = analyses.find(a => a.id === id);
    if (analysis) {
      setSelectedAnalysis(analysis);
      setShowDeleteDialog(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Análises de Solo"
        description="Gerencie suas análises de solo"
      />
      
      <AnalysisList 
        analyses={analyses}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <AnalysisForm 
        open={showForm}
        onOpenChange={setShowForm}
        onSubmit={selectedAnalysis ? handleEdit : handleAdd}
        analysis={selectedAnalysis || undefined}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a análise{' '}
              {selectedAnalysis?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SoilAnalysis;
