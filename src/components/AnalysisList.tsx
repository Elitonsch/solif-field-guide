
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Analysis {
  id: number;
  name: string;
  producer: string;
  date: string;
}

interface AnalysisListProps {
  analyses: Analysis[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AnalysisCard = ({ analysis, onEdit, onDelete }: { 
  analysis: Analysis;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 p-2 rounded-md">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium">Análise - {analysis.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{analysis.producer}</p>
            <p className="text-xs text-muted-foreground">{analysis.date}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(analysis.id)} className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(analysis.id)} className="h-8 w-8 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export function AnalysisList({ analyses, onEdit, onDelete }: AnalysisListProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {analyses.map((analysis) => (
          <AnalysisCard 
            key={analysis.id}
            analysis={analysis}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      
      <Button 
        className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg"
        size="icon"
        asChild
      >
        <Link to="/analysis/new">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}
