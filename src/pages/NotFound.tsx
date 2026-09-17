import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageTransition } from "@/components/animations/PageTransition";

/**
 * Minimal 404 page with a single path back to the homepage.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <main
        id="main-content"
        className="flex min-h-screen items-center justify-center bg-brutalist-cream px-6 py-24 font-mono text-brutalist-ink"
      >
        <FadeIn>
          <div className="max-w-xl text-center">
            <p className="text-8xl font-bold leading-none sm:text-9xl">404</p>
            <h1 className="mt-8 text-3xl font-bold uppercase sm:text-5xl">
              Page Not Found
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm uppercase leading-relaxed tracking-wide text-brutalist-muted">
              This page does not exist or has been moved.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-8 gap-2 border-4 border-brutalist-ink bg-brutalist-ink font-mono text-brutalist-cream hover:border-brutalist-teal hover:bg-brutalist-teal"
            >
              <Link to="/">
                <Home className="h-5 w-5" />
                Go to Homepage
              </Link>
            </Button>
          </div>
        </FadeIn>
      </main>
    </PageTransition>
  );
};

export default NotFound;
