import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import appLogo from "@/assets/app-logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Demo login - simulate API call
    setTimeout(() => {
      if (email && password) {
        // Store demo user data
        localStorage.setItem('nayi-manzil-user', JSON.stringify({
          name: 'Demo User',
          email: email,
          region: 'Srinagar',
          isAuthenticated: true
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome back to Nayi Manzil!",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <img src={appLogo} alt="Nayi Manzil Logo" className="h-12 w-12 rounded-lg" />
            <h1 className="text-2xl font-bold text-white font-government">{t('app.name')}</h1>
          </div>
          <p className="text-white/80">{t('app.description')}</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur shadow-hero border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-government text-primary">
                {t('auth.login.title')}
              </CardTitle>
              <LanguageSelector />
            </div>
            <CardDescription className="text-muted-foreground">
              {t('auth.login.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.login.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary"
                disabled={loading}
              >
                {loading ? t('common.loading') : t('auth.login.submit')}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                {t('auth.login.noAccount')}{' '}
                <Link 
                  to="/signup" 
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {t('auth.login.signupLink')}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Demo Mode:</strong> Use any email and password to login
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}