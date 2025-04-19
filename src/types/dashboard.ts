
export interface Report {
  id: number;
  title: string;
  producer: string;
  date: string;
}

export interface ReportActionProps {
  onView: (id: number) => void;
  onShare: (id: number) => void;
  onDelete: (id: number) => void;
}
