import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/authentication/useUser";
import { useEffect } from "react";
import { RefreshCw, WifiOff } from "lucide-react";
import Button from "./Button";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated, isError } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending && !isError) {
      navigate("/login");
    }
  }, [isAuthenticated, isPending, isError, navigate]);

  if (isPending) {
    return (
      <Spinner
        title="Authenticating Session"
        subtitle="Verifying your permissions, please wait…"
      />
    );
  }

  // 2. Handle offline / network errors without redirecting
  if (isError && !navigator.onLine) {
    return (
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-muted/40 shadow-sm">
          <WifiOff className="text-destructive h-10 w-10 animate-pulse" />
          <span className="bg-destructive/10 text-destructive absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
            !
          </span>
        </div>

        <div className="max-w-md space-y-2">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Connection Interrupted
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            It looks like you're currently offline. Please check your internet
            connection to continue managing your dashboard.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Button
            onClick={() => window.location.reload()}
            className="gap-2 shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // 3. Render children if authenticated
  if (isAuthenticated) return children;

  return null;
}
