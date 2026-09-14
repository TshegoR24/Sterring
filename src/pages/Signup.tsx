import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup, loginWithGoogle, isAuthenticated } = useAuth();

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    const result = await signup(formData.name, formData.email, formData.password);

    if (result.success) {
      toast.success("Account created! Welcome to Sterring! 🎬");
      navigate("/");
    } else {
      toast.error(result.error || "Signup failed");
    }

    setIsSubmitting(false);
  };

  const handleGoogleSignup = async () => {
    setIsGoogleSubmitting(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      toast.error(result.error || "Google sign-in failed");
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-black/80 rounded-sm border border-white/10 p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/60 mb-8">Join Sterring and start streaming</p>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignup}
              disabled={isGoogleSubmitting || isSubmitting}
              className="w-full bg-white hover:bg-white/90 text-black text-sm font-semibold py-6 rounded-sm border-0 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGoogleSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1C3.24 21.3 7.28 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.1H1.26A11.97 11.97 0 0 0 0 12c0 1.94.46 3.77 1.26 5.39l4.01-3.1z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.61l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75z"/>
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-white/40 text-xs uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-11"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 translate-y-[1px] text-white/40 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <label className="flex items-start gap-2 text-white/60 text-sm">
                <input type="checkbox" className="rounded mt-1" required />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-sterring-orange hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-sterring-orange hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sterring-orange hover:bg-sterring-orange-dark text-white text-lg py-6 rounded-sm font-bold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                Already have an account?{" "}
                <Link to="/login" className="text-sterring-orange hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
