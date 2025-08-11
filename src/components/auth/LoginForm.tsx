import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
  onLogin?: () => void;
  onClose?: () => void;
}

export const LoginForm = ({ onSwitchToRegister, onForgotPassword, onLogin, onClose }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("administrator@gmail.com");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen relative overflow-hidden floating-elements">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-primary" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 glass-card">
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold gradient-text">CLEXITIX</span>
            </div>

            {/* Header */}
            <div className="space-y-2">
              <p className="text-primary text-sm font-medium tracking-wider uppercase">HELLO</p>
              <h1 className="text-3xl font-bold text-foreground">WELCOME BACK</h1>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin?.(); }}>
              <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  EMAIL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" defaultChecked />
                  <span className="text-muted-foreground">Remember Password</span>
                </label>
                <button 
                  onClick={onForgotPassword}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Forget Password
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300 font-medium"
              >
                SIGN IN
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <button 
                onClick={onSwitchToRegister}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Sign up now
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