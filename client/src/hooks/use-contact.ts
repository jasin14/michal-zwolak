import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { type InsertMessage } from "@shared/schema";

export function useContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Client-side validation before request
      const validated = api.contact.submit.input.parse(data);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Nieprawidłowe dane");
        }
        if (res.status === 500) {
          const error = await res.json();
          throw new Error(error.message || "Błąd serwera");
        }
        throw new Error("Nie udało się wysłać wiadomości");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Wiadomość wysłana! ✓",
        description: "Dziękuję za kontakt! Odpiszę najszybciej jak to możliwe.",
      });
    },
    onError: (error) => {
      toast({
        title: "Błąd wysyłania",
        description: error.message || "Coś poszło nie tak. Spróbuj ponownie.",
        variant: "destructive",
      });
    },
  });
}
