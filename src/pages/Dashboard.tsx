import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, School, FileText, Target, User, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import appLogo from "@/assets/app-logo.jpg";

interface User {
  name: string;
  email: string;
  region: string;
  class?: string;
  isAuthenticated: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('nayi-manzil-user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.isAuthenticated) {
        setUser(parsedUser);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nayi-manzil-user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const features = [
    {
      icon: Target,
      title: t('dashboard.features.quiz.title'),
      description: t('dashboard.features.quiz.description'),
      cta: t('dashboard.features.quiz.cta'),
      href: '/quiz',
      color: 'bg-gradient-primary',
      badge: 'Start Here'
    },
    {
      icon: School,
      title: t('dashboard.features.colleges.title'),
      description: t('dashboard.features.colleges.description'),
      cta: t('dashboard.features.colleges.cta'),
      href: '/colleges',
      color: 'bg-secondary',
      badge: null
    },
    {
      icon: FileText,
      title: t('dashboard.features.exams.title'),
      description: t('dashboard.features.exams.description'),
      cta: t('dashboard.features.exams.cta'),
      href: '/exams',
      color: 'bg-accent',
      badge: 'New'
    },
    {
      icon: BookOpen,
      title: t('dashboard.features.recommendations.title'),
      description: t('dashboard.features.recommendations.description'),
      cta: t('dashboard.features.recommendations.cta'),
      href: '/recommendations',
      color: 'bg-success',
      badge: null
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={appLogo} alt="Nayi Manzil Logo" className="h-10 w-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-primary font-government">
                  {t('app.name')}
                </h1>
                <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <LanguageSelector />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('navigation.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-hero rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-government mb-2">
                {t('dashboard.welcome')}, {user.name}! 👋
              </h2>
              <p className="text-white/90 text-lg mb-4">
                {t('dashboard.subtitle')}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <User className="h-3 w-3 mr-1" />
                  {user.region}
                </Badge>
                {user.class && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Class {user.class}
                  </Badge>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assessment Status</p>
                  <p className="text-2xl font-bold text-foreground">Not Started</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Colleges in {user.region}</p>
                  <p className="text-2xl font-bold text-foreground">15+</p>
                </div>
                <School className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <FileText className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 animate-scale-in group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-government">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.href}>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 font-government">
            Getting Started Guide
          </h3>
          <div className="space-y-4">
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Take Your Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete the aptitude and interest test to get personalized recommendations
                    </p>
                  </div>
                  <Link to="/quiz">
                    <Button size="sm" className="ml-auto">Start</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card opacity-60">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground">View Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      Get career suggestions based on your assessment results
                    </p>
                  </div>
                  <Button size="sm" variant="outline" disabled className="ml-auto">Locked</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card opacity-60">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground">Explore Colleges</h4>
                    <p className="text-sm text-muted-foreground">
                      Find government colleges that match your career path
                    </p>
                  </div>
                  <Button size="sm" variant="outline" disabled className="ml-auto">Locked</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}