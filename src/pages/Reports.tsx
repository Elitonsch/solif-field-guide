
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, // Replacing FilePdf with FileText
  Share2,
  Download,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  Clipboard,
} from "lucide-react";

const Reports = () => {
  const [reportData, setReportData] = useState({
    title: "",
    producer: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
  });

  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleInputChange = (field: keyof typeof reportData, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const generateReport = () => {
    setGeneratingReport(true);
    // Simulate report generation process
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
    }, 1500);
  };

  const RecentReport = ({ title, date, type }: { title: string; date: string; type: string }) => (
    <Card className="soil-card hover:bg-secondary/50 cursor-pointer transition-colors">
      <div className="flex items-start">
        <div className="bg-primary/10 p-2 rounded-md">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{date} • {type}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Report Generator"
        description="Create professional soil analysis reports"
      />

      {!reportGenerated ? (
        <div className="space-y-4">
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Report Information</h3>
            <Separator className="mb-4" />
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="title" className="flex items-center gap-1">
                    <Clipboard className="h-3 w-3" /> Title
                  </Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., North Field Soil Analysis" 
                    value={reportData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="producer" className="flex items-center gap-1">
                    <User className="h-3 w-3" /> Producer / Client
                  </Label>
                  <Input 
                    id="producer" 
                    placeholder="e.g., John Smith" 
                    value={reportData.producer}
                    onChange={(e) => handleInputChange('producer', e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Location
                  </Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., North Farm, Field 3" 
                    value={reportData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="date" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Report Date
                  </Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={reportData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="notes">Notes & Observations</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Additional notes or recommendations..." 
                    value={reportData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="resize-none h-20"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="soil-card">
            <h3 className="font-medium mb-3">Report Sections</h3>
            <Separator className="mb-4" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                <input type="checkbox" id="includeAnalysis" className="rounded" defaultChecked />
                <Label htmlFor="includeAnalysis" className="text-sm cursor-pointer flex-1">Soil Analysis Data</Label>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                <input type="checkbox" id="includeCorrection" className="rounded" defaultChecked />
                <Label htmlFor="includeCorrection" className="text-sm cursor-pointer flex-1">Correction Recommendations</Label>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                <input type="checkbox" id="includeFertilization" className="rounded" defaultChecked />
                <Label htmlFor="includeFertilization" className="text-sm cursor-pointer flex-1">Fertilization Plan</Label>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                <input type="checkbox" id="includeMap" className="rounded" defaultChecked />
                <Label htmlFor="includeMap" className="text-sm cursor-pointer flex-1">Field Map</Label>
              </div>
            </div>
          </Card>
          
          <Button 
            className="w-full" 
            onClick={generateReport}
            disabled={!reportData.title || !reportData.producer || generatingReport}
          >
            <FileText className="mr-2 h-4 w-4" />
            {generatingReport ? "Generating Report..." : "Generate Report"}
          </Button>
          
          <div className="pt-6">
            <h3 className="text-sm font-medium mb-3">Recent Reports</h3>
            <div className="space-y-2">
              <RecentReport 
                title="Farm B - Southern Area" 
                date="April 12, 2025" 
                type="Soil Analysis" 
              />
              <RecentReport 
                title="Farm A - Northwest Field" 
                date="March 28, 2025" 
                type="Complete Report" 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="soil-card p-6 border-primary">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4">{reportData.title}</h2>
              <p className="text-sm text-muted-foreground">Report generated successfully!</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div className="text-left">
                  <p className="text-muted-foreground">Producer:</p>
                  <p className="font-medium">{reportData.producer}</p>
                </div>
                
                <div className="text-left">
                  <p className="text-muted-foreground">Location:</p>
                  <p className="font-medium">{reportData.location}</p>
                </div>
                
                <div className="text-left">
                  <p className="text-muted-foreground">Date:</p>
                  <p className="font-medium">{new Date(reportData.date).toLocaleDateString()}</p>
                </div>
                
                <div className="text-left">
                  <p className="text-muted-foreground">File Size:</p>
                  <p className="font-medium">1.2 MB</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button className="w-1/2" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button className="w-1/2">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </Card>
          
          <Card className="soil-card p-4">
            <h3 className="font-medium mb-2">Report Preview</h3>
            <Separator className="mb-4" />
            
            <div className="aspect-[3/4] bg-muted/30 rounded-md flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground">Preview not available in demo</p>
                <p className="text-xs mt-2">Download the report to view the full document</p>
              </div>
            </div>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setReportGenerated(false)}
          >
            Create Another Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reports;
