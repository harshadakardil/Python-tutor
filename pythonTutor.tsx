import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";

const formSchema = z.object({
  question: z.string().min(1, "Please enter a question"),
});

type FormData = z.infer<typeof formSchema>;

export default function PythonTutor() {
  const [answer, setAnswer] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const askMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/ask", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnswer(data.answer);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    askMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ask your Python question here..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={askMutation.isPending}
          >
            {askMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              "Ask Question"
            )}
          </Button>
        </form>
      </Form>

      {answer && (
        <Card className="p-4 bg-muted">
          <pre className="whitespace-pre-wrap font-mono text-sm">{answer}</pre>
        </Card>
      )}
    </div>
  );
}
