
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  producer: z.string().min(1, "Produtor é obrigatório"),
});

type Analysis = {
  id?: number;
  name: string;
  producer: string;
  date?: string;
};

interface AnalysisFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Analysis) => void;
  analysis?: Analysis;
}

export function AnalysisForm({ open, onOpenChange, onSubmit, analysis }: AnalysisFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: analysis?.name || "",
      producer: analysis?.producer || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      id: analysis?.id,
      date: analysis?.date || new Date().toLocaleDateString(),
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {analysis ? "Editar Análise" : "Nova Análise"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da análise" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="producer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produtor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produtor" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {analysis ? "Salvar" : "Adicionar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
