
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

interface SoilParameter {
  id: string;
  label: string;
  unit: string;
  value: string;
}

const SoilAnalysis = () => {
  const [expanded, setExpanded] = useState({
    general: true,
    macronutrients: true,
    micronutrients: false,
    physical: false
  });

  const [generalParams, setGeneralParams] = useState<SoilParameter[]>([
    { id: "ph", label: "pH", unit: "", value: "" },
    { id: "ca", label: "Ca²⁺", unit: "cmolc/dm³", value: "" },
    { id: "mg", label: "Mg²⁺", unit: "cmolc/dm³", value: "" },
    { id: "k", label: "K⁺", unit: "cmolc/dm³", value: "" },
    { id: "al", label: "Al³⁺", unit: "cmolc/dm³", value: "" },
    { id: "h_al", label: "H+Al", unit: "cmolc/dm³", value: "" },
    { id: "cec", label: "CTC", unit: "cmolc/dm³", value: "" },
    { id: "v", label: "V%", unit: "%", value: "" },
    { id: "mo", label: "MO", unit: "g/dm³", value: "" },
  ]);

  const [macronutrients, setMacronutrients] = useState<SoilParameter[]>([
    { id: "p", label: "P", unit: "mg/dm³", value: "" },
    { id: "s", label: "S", unit: "mg/dm³", value: "" },
    { id: "n", label: "N", unit: "mg/dm³", value: "" },
  ]);

  const [micronutrients, setMicronutrients] = useState<SoilParameter[]>([
    { id: "b", label: "B", unit: "mg/dm³", value: "" },
    { id: "cu", label: "Cu", unit: "mg/dm³", value: "" },
    { id: "fe", label: "Fe", unit: "mg/dm³", value: "" },
    { id: "mn", label: "Mn", unit: "mg/dm³", value: "" },
    { id: "zn", label: "Zn", unit: "mg/dm³", value: "" },
  ]);

  const [physicalParams, setPhysicalParams] = useState<SoilParameter[]>([
    { id: "sand", label: "Sand", unit: "%", value: "" },
    { id: "silt", label: "Silt", unit: "%", value: "" },
    { id: "clay", label: "Clay", unit: "%", value: "" },
    { id: "bulk_density", label: "Bulk Density", unit: "g/cm³", value: "" },
  ]);

  const handleChange = (
    id: string, 
    value: string, 
    setter: React.Dispatch<React.SetStateAction<SoilParameter[]>>
  ) => {
    setter(prev => 
      prev.map(param => 
        param.id === id ? { ...param, value } : param
      )
    );
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderParamInputs = (
    params: SoilParameter[],
    setter: React.Dispatch<React.SetStateAction<SoilParameter[]>>
  ) => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {params.map((param) => (
          <div key={param.id} className="space-y-1">
            <Label htmlFor={param.id} className="soil-input-label">
              {param.label} {param.unit ? `(${param.unit})` : ""}
            </Label>
            <Input
              id={param.id}
              value={param.value}
              onChange={(e) => handleChange(param.id, e.target.value, setter)}
              className="soil-input"
              placeholder="0.00"
              type="number"
              step="0.01"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (
    title: string,
    section: keyof typeof expanded,
    params: SoilParameter[],
    setter: React.Dispatch<React.SetStateAction<SoilParameter[]>>
  ) => {
    return (
      <Card className="soil-card">
        <div 
          className="flex items-center justify-between cursor-pointer pb-2"
          onClick={() => toggleSection(section)}
        >
          <h3 className="font-medium text-sm">{title}</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            {expanded[section] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {expanded[section] && (
          <div className="pt-2 space-y-4">
            <Separator />
            {renderParamInputs(params, setter)}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Soil Analysis"
        description="Input chemical properties for your soil sample"
      />

      <Card className="soil-card">
        <div className="space-y-3">
          <h3 className="font-medium">Sample Information</h3>
          <Separator />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2">
              <Label htmlFor="sample_name">Sample Name</Label>
              <Input id="sample_name" placeholder="e.g. North Field Sample" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sample_date">Collection Date</Label>
              <Input id="sample_date" type="date" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sample_depth">Depth (cm)</Label>
              <Input id="sample_depth" placeholder="0-20" />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {renderSection("General Parameters", "general", generalParams, setGeneralParams)}
        {renderSection("Macronutrients", "macronutrients", macronutrients, setMacronutrients)}
        {renderSection("Micronutrients", "micronutrients", micronutrients, setMicronutrients)}
        {renderSection("Physical Properties", "physical", physicalParams, setPhysicalParams)}
      </div>

      <div className="pt-4 pb-10">
        <Button className="w-full" size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Analysis
        </Button>
      </div>
    </div>
  );
};

export default SoilAnalysis;
