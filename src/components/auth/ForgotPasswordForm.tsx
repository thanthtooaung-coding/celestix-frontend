import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");

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
              <h1 className="text-3xl font-bold text-foreground">FORGOT PASSWORD</h1>
            </div>

            {/* Form */}
            <form className="space-y-6">
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

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300 font-medium"
              >
                SEND EMAIL
              </Button>
            </form>

            {/* Back Link */}
            <p className="text-muted-foreground text-sm">
              Remember your password?{" "}
              <button 
                onClick={onBack}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Back to login
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};