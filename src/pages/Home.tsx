import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Minimal example page. Replace this with your app's real pages; it exists to
// prove the shell (layout, theme tokens, ui components, toasts) end to end.
const Home = () => {
  const { toast } = useToast();

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3">
          <h1 className="font-editorial text-4xl font-semibold text-foreground">
            YourApp
          </h1>
          <p className="text-lg text-muted-foreground">
            A Vite + React + TypeScript shell: routing, auth wiring, theming,
            a typed API client, and a shadcn/ui component library.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Start here</CardTitle>
            <CardDescription>
              Add pages under <code>src/pages/</code> and register them in{" "}
              <code>src/App.tsx</code>. The header, footer, and theme toggle
              come from <code>src/components/Layout/MainLayout.tsx</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                toast({
                  title: "It works",
                  description: "Toasts, theme tokens, and the ui kit are wired up.",
                })
              }
            >
              Test a toast
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Home;
