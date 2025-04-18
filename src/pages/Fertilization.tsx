
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ListChecks } from "lucide-react";

interface FertilizationResult {
  n: number;
  p2o5: number;
  k2o: number;
  sources: {
    n: { source: string; amount: number };
    p: { source: string; amount: number };
    k: { source: string; amount: number };
  };
}

const Fertilization = () => {
  // Crop types
  const cropTypes = [
    { value: "soybean", label: "Soybean" },
    { value: "corn", label: "Corn" },
    { value: "coffee", label: "Coffee" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "rice", label: "Rice" },
    { value: "beans", label: "Beans" },
  ];

  // Corrective fertilization state
  const [correctiveInputs, setCorrectiveInputs] = useState({
    p: "",
    k: "",
    clayContent: "35",
    cropType: "",
  });

  // Maintenance fertilization state
  const [maintenanceInputs, setMaintenanceInputs] = useState({
    cropType: "",
    yield: "",
    p: "",
    k: "",
    n: "",
    pExtractor: "mehlich",
  });

  // Results state
  const [correctiveResult, setCorrectiveResult] = useState<{p: number, k: number} | null>(null);
  const [maintenanceResult, setMaintenanceResult] = useState<FertilizationResult | null>(null);

  const handleCorrectiveInput = (field: keyof typeof correctiveInputs, value: string) => {
    setCorrectiveInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleMaintenanceInput = (field: keyof typeof maintenanceInputs, value: string) => {
    setMaintenanceInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateCorrectiveFertilization = () => {
    const { p, k, clayContent } = correctiveInputs;
    
    if (p && k && clayContent) {
      const pValue = parseFloat(p);
      const kValue = parseFloat(k);
      const clayValue = parseFloat(clayContent);
      
      // Simplified formulas for demonstration purposes
      // In a real app, these would be based on extensive research tables
      
      // P2O5 calculation based on Mehlich-1 P levels and clay content
      let pRecommendation = 0;
      
      if (pValue < 6) {
        pRecommendation = clayValue > 35 ? 120 : 80;
      } else if (pValue < 12) {
        pRecommendation = clayValue > 35 ? 80 : 60;
      } else if (pValue < 20) {
        pRecommendation = clayValue > 35 ? 40 : 30;
      }
      
      // K2O calculation based on K levels
      let kRecommendation = 0;
      
      if (kValue < 0.15) {
        kRecommendation = 80;
      } else if (kValue < 0.30) {
        kRecommendation = 60;
      } else if (kValue < 0.50) {
        kRecommendation = 40;
      }
      
      setCorrectiveResult({ p: pRecommendation, k: kRecommendation });
    }
  };

  const calculateMaintenanceFertilization = () => {
    const { cropType, yield: yieldValue, p, k, n } = maintenanceInputs;
    
    if (cropType && yieldValue && p && k) {
      const pValue = parseFloat(p);
      const kValue = parseFloat(k);
      const yieldNum = parseFloat(yieldValue);
      
      // Simplified formulas for demonstration purposes
      // In a real app, these would be crop-specific with much more sophisticated calculations
      
      // Base values that would typically come from crop-specific tables
      const baseValues = {
        n: cropType === "soybean" ? 0 : 20,  // Soybeans don't usually need N
        p: 15,
        k: 20
      };
      
      // Calculate nutrient requirements based on yield goals
      // These formulas are greatly simplified for demo
      const nRecommendation = cropType === "soybean" ? 0 : baseValues.n * yieldNum / 1000;
      
      // P recommendation based on soil P levels and yield goals
      let pFactor = 1.0;
      if (pValue < 6) pFactor = 2.0;
      else if (pValue < 12) pFactor = 1.5;
      else if (pValue < 20) pFactor = 1.2;
      
      const pRecommendation = baseValues.p * pFactor * yieldNum / 1000;
      
      // K recommendation based on soil K levels and yield goals
      let kFactor = 1.0;
      if (kValue < 0.15) kFactor = 2.0;
      else if (kValue < 0.30) kFactor = 1.5;
      else if (kValue < 0.50) kFactor = 1.2;
      
      const kRecommendation = baseValues.k * kFactor * yieldNum / 1000;
      
      // Calculate common fertilizer sources and amounts
      // This is extremely simplified
      setMaintenanceResult({
        n: nRecommendation,
        p2o5: pRecommendation,
        k2o: kRecommendation,
        sources: {
          n: {
            source: "Urea (45% N)",
            amount: nRecommendation > 0 ? (nRecommendation / 0.45) : 0
          },
          p: {
            source: "Simple Superphosphate (18% P₂O₅)",
            amount: pRecommendation / 0.18
          },
          k: {
            source: "Potassium Chloride (60% K₂O)",
            amount: kRecommendation / 0.60
          }
        }
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Fertilization"
        description="Calculate fertilizer recommendations for your crops"
      />

      <Tabs defaultValue="corrective">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="corrective">Corrective</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="corrective" className="pt-4 space-y-6">
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Corrective Fertilization</h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="cropTypeCorrective">Crop Type</Label>
                <Select
                  value={correctiveInputs.cropType}
                  onValueChange={(value) => handleCorrectiveInput('cropType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="clayContent">Clay Content (%)</Label>
                <Input 
                  id="clayContent" 
                  placeholder="e.g., 35" 
                  value={correctiveInputs.clayContent}
                  onChange={(e) => handleCorrectiveInput('clayContent', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="p">P (mg/dm³)</Label>
                <Input 
                  id="p" 
                  placeholder="e.g., 8.5" 
                  value={correctiveInputs.p}
                  onChange={(e) => handleCorrectiveInput('p', e.target.value)}
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="k">K (cmolc/dm³)</Label>
                <Input 
                  id="k" 
                  placeholder="e.g., 0.25" 
                  value={correctiveInputs.k}
                  onChange={(e) => handleCorrectiveInput('k', e.target.value)}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={calculateCorrectiveFertilization}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Corrective Fertilization
            </Button>
          </Card>

          {correctiveResult && (
            <Card className="soil-card bg-foliage-500/5 border-foliage-500/20">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">Corrective Fertilization Recommendation</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="soil-stat">
                    <span className="soil-stat-label">Phosphorus (P₂O₅)</span>
                    <span className="soil-stat-value text-foliage-600">{correctiveResult.p} <span className="text-xs">kg/ha</span></span>
                  </div>
                  
                  <div className="soil-stat">
                    <span className="soil-stat-label">Potassium (K₂O)</span>
                    <span className="soil-stat-value text-foliage-600">{correctiveResult.k} <span className="text-xs">kg/ha</span></span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  This is a one-time corrective application to build soil fertility levels.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="maintenance" className="pt-4 space-y-6">
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Maintenance Fertilization</h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="cropTypeMaintenance">Crop Type</Label>
                <Select
                  value={maintenanceInputs.cropType}
                  onValueChange={(value) => handleMaintenanceInput('cropType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="yield">Expected Yield (kg/ha)</Label>
                <Input 
                  id="yield" 
                  placeholder="e.g., 3500" 
                  value={maintenanceInputs.yield}
                  onChange={(e) => handleMaintenanceInput('yield', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="pMaintenance">P (mg/dm³)</Label>
                <Input 
                  id="pMaintenance" 
                  placeholder="e.g., 8.5" 
                  value={maintenanceInputs.p}
                  onChange={(e) => handleMaintenanceInput('p', e.target.value)}
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="kMaintenance">K (cmolc/dm³)</Label>
                <Input 
                  id="kMaintenance" 
                  placeholder="e.g., 0.25" 
                  value={maintenanceInputs.k}
                  onChange={(e) => handleMaintenanceInput('k', e.target.value)}
                  type="number"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="nMaintenance">N (mg/dm³)</Label>
                <Input 
                  id="nMaintenance" 
                  placeholder="e.g., 20" 
                  value={maintenanceInputs.n}
                  onChange={(e) => handleMaintenanceInput('n', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="pExtractor">P Extractor Method</Label>
                <Select
                  value={maintenanceInputs.pExtractor}
                  onValueChange={(value) => handleMaintenanceInput('pExtractor', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mehlich">Mehlich-1</SelectItem>
                    <SelectItem value="resin">Resin</SelectItem>
                    <SelectItem value="bray">Bray-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={calculateMaintenanceFertilization}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Maintenance Fertilization
            </Button>
          </Card>

          {maintenanceResult && (
            <Card className="soil-card bg-foliage-500/5 border-foliage-500/20">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">Maintenance Fertilization Recommendation</h4>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="soil-stat">
                    <span className="soil-stat-label">Nitrogen (N)</span>
                    <span className="soil-stat-value text-foliage-600">{maintenanceResult.n.toFixed(1)} <span className="text-xs">kg/ha</span></span>
                  </div>
                  
                  <div className="soil-stat">
                    <span className="soil-stat-label">Phosphorus (P₂O₅)</span>
                    <span className="soil-stat-value text-foliage-600">{maintenanceResult.p2o5.toFixed(1)} <span className="text-xs">kg/ha</span></span>
                  </div>
                  
                  <div className="soil-stat">
                    <span className="soil-stat-label">Potassium (K₂O)</span>
                    <span className="soil-stat-value text-foliage-600">{maintenanceResult.k2o.toFixed(1)} <span className="text-xs">kg/ha</span></span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-left text-sm space-y-2">
                  <h5 className="font-medium flex items-center">
                    <ListChecks className="h-4 w-4 mr-1" /> 
                    Fertilizer Sources
                  </h5>
                  
                  {maintenanceResult.sources.n.amount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span>{maintenanceResult.sources.n.source}</span>
                      <span className="font-medium">{maintenanceResult.sources.n.amount.toFixed(1)} kg/ha</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs">
                    <span>{maintenanceResult.sources.p.source}</span>
                    <span className="font-medium">{maintenanceResult.sources.p.amount.toFixed(1)} kg/ha</span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span>{maintenanceResult.sources.k.source}</span>
                    <span className="font-medium">{maintenanceResult.sources.k.amount.toFixed(1)} kg/ha</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fertilization;
