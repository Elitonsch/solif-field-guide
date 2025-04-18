
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Link } from "react-router-dom";
import {
  Home,
  FlaskConical,
  Wrench,
  Sprout,
  FileText,
  ArrowRight
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
}) => {
  return (
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
};

const RecentProjectCard = ({ 
  title, 
  date, 
  type 
}: { 
  title: string; 
  date: string; 
  type: string;
}) => {
  return (
    <Card className="soil-card p-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-xs text-muted-foreground">{type}</p>
    </Card>
  );
};

const Dashboard = () => {
  const recentProjects = [
    { id: 1, title: "Farm A - Northwest Field", date: "2 days ago", type: "Clay soil analysis" },
    { id: 2, title: "Farm B - Southern Area", date: "1 week ago", type: "Sandy soil correction" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-center py-4">
        <div className="bg-soil-500/10 p-3 rounded-full">
          <h1 className="text-2xl font-bold text-soil-700 dark:text-soil-300">SolIF</h1>
        </div>
      </div>

      <PageHeader 
        title="Soil Field Guide" 
        description="Analyze soil samples and get recommendations for corrections and fertilization" 
      />

      <div className="grid gap-3">
        <FeatureCard 
          icon={FlaskConical} 
          title="Soil Analysis" 
          description="Input soil chemical properties and parameters" 
          to="/analysis" 
        />
        <FeatureCard 
          icon={Wrench} 
          title="Correction" 
          description="Calculate liming and gypsum recommendations" 
          to="/correction" 
        />
        <FeatureCard 
          icon={Sprout} 
          title="Fertilization" 
          description="Get precise fertilization plans for your crops" 
          to="/fertilization" 
        />
        <FeatureCard 
          icon={FileText} 
          title="Reports" 
          description="Generate and export professional reports" 
          to="/reports" 
        />
      </div>

      {recentProjects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium">Recent Projects</h2>
          <div className="grid gap-2">
            {recentProjects.map((project) => (
              <RecentProjectCard 
                key={project.id} 
                title={project.title} 
                date={project.date} 
                type={project.type} 
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Developed by</span>
          <strong className="font-medium">PROdata</strong>
          <span>&</span>
          <strong className="font-medium">IFRO</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
