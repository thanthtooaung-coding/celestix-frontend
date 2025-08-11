import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSwitchToLogin, onSuccess }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden floating-elements">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-cinema" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 glass-card">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <p className="text-primary text-sm font-medium tracking-wider uppercase">WELCOME</p>
              <h1 className="text-3xl font-bold gradient-text">TO CLEXITIX</h1>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="space-y-2 text-left">
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  USER NAME <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  EMAIL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  PASSWORD <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  CONFIRM PASSWORD <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I Agree To The Terms, Privacy Policy And Fees
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300 font-medium"
              >
                REGISTER
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <button 
                onClick={onSwitchToLogin}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Login now
              </button>
            </p>

            {/* Divider */}
            <div className="flex items-center space-x-4 my-6">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-muted-foreground text-sm">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary">
                <span className="text-blue-400 text-lg">f</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary">
                <span className="text-blue-400 text-lg">t</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary">
                <span className="text-red-400 text-lg">G</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};