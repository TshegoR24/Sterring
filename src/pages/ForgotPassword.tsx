import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await resetPassword(email);

    if (result.success) {
      setIsSent(true);
    } else {
      toast.error(result.error || "Couldn't send reset email");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-black/80 rounded-sm border border-white/10 p-8 sm:p-10">
            {isSent ? (
              <div className="text-center">
                <MailCheck className="h-12 w-12 text-sterring-orange mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
                <p className="text-white/60 mb-8">
                  If an account exists for <span className="text-white">{email}</span>, we've sent a link to reset your password.
                </p>
                <Link to="/login" className="text-sterring-orange hover:underline font-semibold">
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white mb-2">Reset your password</h1>
                <p className="text-white/60 mb-8">
                  Enter your email and we'll send you a link to get back in.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sterring-orange hover:bg-sterring-orange-dark text-white text-lg py-6 rounded-sm font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-white/60">
                    Remembered it?{" "}
                    <Link to="/login" className="text-sterring-orange hover:underline font-semibold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
