import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new user account
    alert("Signup functionality would be implemented here");
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/60 mb-8">Join SA Cinema and start streaming</p>

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
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  required
                />
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
                />
              </div>

              <label className="flex items-start gap-2 text-white/60 text-sm">
                <input type="checkbox" className="rounded mt-1" required />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-white hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-white hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 text-lg py-6 rounded-full font-semibold"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline font-semibold">
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


