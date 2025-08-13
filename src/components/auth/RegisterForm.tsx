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
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validate = () => {
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://47.130.149.164:8081/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: "CUSTOMER"
        }),
      });

      if (response.ok) {
        onSuccess?.();
      } else {
        const errorData = await response.json();
        setErrors({ ...errors, email: errorData.message || "Failed to register" });
      }
    } catch (error) {
      setErrors({ ...errors, email: "An error occurred. Please try again." });
    }
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
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                {errors.username && <p className="text-destructive text-xs">{errors.username}</p>}
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
                {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
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
                {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
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
                {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
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
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Login now
              </button>
            </p>            
          </div>
        </Card>
      </div>
    </div>
  );
};