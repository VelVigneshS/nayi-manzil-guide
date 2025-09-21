import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import appLogo from "@/assets/app-logo.jpg";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    class: "",
    region: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, tArray } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const regions = tArray('auth.signup.regions');
  const classes = ['10th', '11th', '12th', 'Graduate', 'Post Graduate'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Demo signup - simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.password && formData.region) {
        // Store demo user data
        localStorage.setItem('nayi-manzil-user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          class: formData.class,
          region: formData.region,
          isAuthenticated: true
        }));
        
        toast({
          title: "Account Created Successfully",
          description: `Welcome to Nayi Manzil, ${formData.name}!`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Signup Failed",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

        {/* Signup Card */}
        <Card className="bg-white/95 backdrop-blur shadow-hero border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-government text-primary">
                {t('auth.signup.title')}
              </CardTitle>
              <LanguageSelector />
            </div>
            <CardDescription className="text-muted-foreground">
              {t('auth.signup.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.signup.name')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.signup.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">{t('auth.signup.class')}</Label>
                  <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">{t('auth.signup.region')}</Label>
                  <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)} required>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.signup.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.signup.confirmPassword')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="bg-background pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary"
                disabled={loading}
              >
                {loading ? t('common.loading') : t('auth.signup.submit')}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center text-sm text-muted-foreground">
                {t('auth.signup.hasAccount')}{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {t('auth.signup.loginLink')}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Demo Mode:</strong> Fill the form to create a demo account
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}