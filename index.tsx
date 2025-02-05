import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertConversationSchema } from '@shared/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Robot, Wand2, Flask } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CHARACTERS = [
  { id: 'robot', name: 'Robo Teacher', icon: Robot },
  { id: 'wizard', name: 'Code Wizard', icon: Wand2 },
  { id: 'scientist', name: 'Python Scientist', icon: Flask }
];

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm({
    resolver: zodResolver(insertConversationSchema),
    defaultValues: {
      question: '',
      character: 'robot'
    }
  });

  const askMutation = useMutation({
    mutationFn: async (data: typeof form.getValues) => {
      const response = await apiRequest('POST', '/api/ask', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get answer. Please try again.",
        variant: "destructive"
      });
    }
  });

  const { data: conversations } = useQuery({
    queryKey: ['/api/conversations']
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Python Buddy</h1>
          <p className="text-lg text-gray-700">
            Your friendly AI tutor that makes learning Python fun and easy!
          </p>
        </header>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => askMutation.mutate(data))}>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {CHARACTERS.map((char) => {
                    const Icon = char.icon;
                    return (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => form.setValue('character', char.id)}
                        className={`p-4 rounded-lg flex flex-col items-center ${
                          form.watch('character') === char.id 
                            ? 'bg-purple-100 border-2 border-purple-500' 
                            : 'bg-gray-50 hover:bg-purple-50'
                        }`}
                      >
                        <Icon className="w-8 h-8 mb-2" />
                        <span className="font-medium">{char.name}</span>
                      </button>
                    );
                  })}
                </div>

                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ask your Python question</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="How do I print 'Hello World' in Python?"
                          className="h-32"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={askMutation.isPending}
                >
                  {askMutation.isPending ? "Thinking..." : "Ask Question"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {conversations?.map((conv: any) => (
          <Card key={conv.id} className="mb-4">
            <CardContent className="p-4">
              <p className="font-medium text-gray-600 mb-2">Q: {conv.question}</p>
              <p className="text-gray-800 whitespace-pre-wrap">A: {conv.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}