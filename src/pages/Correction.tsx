
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calculator } from "lucide-react";

const Correction = () => {
  // Liming calculation state
  const [limingInputs, setLimingInputs] = useState({
    currentV: "",
    targetV: "70",
    cec: "",
    prnt: "85",
    soilDepth: "20",
  });

  // Gypsum calculation state
  const [gypsumInputs, setGypsumInputs] = useState({
    ca: "",
    al: "",
    clay: "",
    soilDepth: "20",
  });

  // Results state
  const [limingResult, setLimingResult] = useState<number | null>(null);
  const [gypsumResult, setGypsumResult] = useState<number | null>(null);

  const handleLimingInput = (field: keyof typeof limingInputs, value: string) => {
    setLimingInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGypsumInput = (field: keyof typeof gypsumInputs, value: string) => {
    setGypsumInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateLiming = () => {
    // Formula: Liming (t/ha) = CEC * (Target V% - Current V%) / PRNT / 10
    const { currentV, targetV, cec, prnt } = limingInputs;
    
    if (currentV && targetV && cec && prnt) {
      const result = (parseFloat(cec) * (parseFloat(targetV) - parseFloat(currentV))) / parseFloat(prnt) / 10;
      setLimingResult(Math.max(0, result));
    }
  };

  const calculateGypsum = () => {
    // Formula: Gypsum (t/ha) = Clay content * 0.05
    // Alternative: Based on Al saturation, if Al > 0.5 cmolc/dm³
    const { ca, al, clay } = gypsumInputs;
    
    if (clay) {
      // Using clay content-based formula
      const result = parseFloat(clay) * 0.05;
      setGypsumResult(Math.max(0, result));
    } else if (ca && al) {
      // Using calcium/aluminum-based formula
      const alValue = parseFloat(al);
      const result = alValue > 0.5 ? alValue * 0.6 : 0;
      setGypsumResult(Math.max(0, result));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Soil Correction"
        description="Calculate liming and gypsum application recommendations"
      />

      <Tabs defaultValue="liming">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="liming">Liming</TabsTrigger>
          <TabsTrigger value="gypsum">Gypsum</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liming" className="pt-4 space-y-6">
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Liming Calculation</h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="currentV">Current V%</Label>
                <Input 
                  id="currentV" 
                  placeholder="e.g., 40" 
                  value={limingInputs.currentV}
                  onChange={(e) => handleLimingInput('currentV', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="targetV">Target V%</Label>
                <Input 
                  id="targetV" 
                  placeholder="e.g., 70" 
                  value={limingInputs.targetV}
                  onChange={(e) => handleLimingInput('targetV', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="cec">CEC (cmolc/dm³)</Label>
                <Input 
                  id="cec" 
                  placeholder="e.g., 7.5" 
                  value={limingInputs.cec}
                  onChange={(e) => handleLimingInput('cec', e.target.value)}
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="prnt">Lime PRNT %</Label>
                <Input 
                  id="prnt" 
                  placeholder="e.g., 85" 
                  value={limingInputs.prnt}
                  onChange={(e) => handleLimingInput('prnt', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1 col-span-2">
                <Label htmlFor="soilDepth">Soil Depth (cm)</Label>
                <Input 
                  id="soilDepth" 
                  placeholder="e.g., 20" 
                  value={limingInputs.soilDepth}
                  onChange={(e) => handleLimingInput('soilDepth', e.target.value)}
                  type="number"
                />
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={calculateLiming}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Lime Requirement
            </Button>
          </Card>

          {limingResult !== null && (
            <Card className="soil-card bg-primary/5 border-primary/20">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">Liming Recommendation</h4>
                <p className="text-3xl font-bold text-primary">{limingResult.toFixed(2)} <span className="text-sm font-normal">t/ha</span></p>
                <p className="text-xs text-muted-foreground mt-2">
                  Apply {limingResult.toFixed(2)} metric tons of limestone per hectare to achieve a {limingInputs.targetV}% base saturation.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="gypsum" className="pt-4 space-y-6">
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Gypsum Calculation</h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ca">Ca²⁺ (cmolc/dm³)</Label>
                <Input 
                  id="ca" 
                  placeholder="e.g., 2.5" 
                  value={gypsumInputs.ca}
                  onChange={(e) => handleGypsumInput('ca', e.target.value)}
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="al">Al³⁺ (cmolc/dm³)</Label>
                <Input 
                  id="al" 
                  placeholder="e.g., 0.8" 
                  value={gypsumInputs.al}
                  onChange={(e) => handleGypsumInput('al', e.target.value)}
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="clay">Clay Content (%)</Label>
                <Input 
                  id="clay" 
                  placeholder="e.g., 35" 
                  value={gypsumInputs.clay}
                  onChange={(e) => handleGypsumInput('clay', e.target.value)}
                  type="number"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="gypsumSoilDepth">Soil Depth (cm)</Label>
                <Input 
                  id="gypsumSoilDepth" 
                  placeholder="e.g., 20" 
                  value={gypsumInputs.soilDepth}
                  onChange={(e) => handleGypsumInput('soilDepth', e.target.value)}
                  type="number"
                />
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={calculateGypsum}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Gypsum Requirement
            </Button>
          </Card>

          {gypsumResult !== null && (
            <Card className="soil-card bg-accent/5 border-accent/20">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-2">Gypsum Recommendation</h4>
                <p className="text-3xl font-bold text-accent">{gypsumResult.toFixed(2)} <span className="text-sm font-normal">t/ha</span></p>
                <p className="text-xs text-muted-foreground mt-2">
                  Apply {gypsumResult.toFixed(2)} metric tons of gypsum per hectare to improve soil structure and reduce aluminum toxicity.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Correction;
