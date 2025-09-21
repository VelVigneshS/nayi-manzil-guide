import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Navbar } from "@/components/Navbar";
import heroStudents from "@/assets/hero-students.jpg";

export default function Landing() {
  const { t, tArray } = useTranslation();

  const problemPoints = tArray('landing.problem.points');
  const features = [
    {
      icon: BookOpen,
      title: t('landing.features.items.0.title'),
      description: t('landing.features.items.0.description'),
    },
    {
      icon: Users,
      title: t('landing.features.items.1.title'),
      description: t('landing.features.items.1.description'),
    },
    {
      icon: Award,
      title: t('landing.features.items.2.title'),
      description: t('landing.features.items.2.description'),
    },
    {
      icon: TrendingUp,
      title: t('landing.features.items.3.title'),
      description: t('landing.features.items.3.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <img 
            src={heroStudents} 
            alt="Students in Jammu & Kashmir" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-government">
                {t('landing.hero.title')}{' '}
                <span className="text-yellow-300">{t('app.name')}</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-4 font-medium">
                {t('landing.hero.subtitle')}
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {t('landing.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-hero">
                    {t('landing.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  {t('landing.hero.learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <AlertCircle className="h-16 w-16 text-warning mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-government">
              {t('landing.problem.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('landing.problem.subtitle')}
            </p>
            <p className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto mb-12">
              {t('landing.problem.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card border-warning/20 shadow-card animate-scale-in">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Key Challenges Students Face:
                </h3>
                <ul className="space-y-4">
                  {problemPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-warning flex-shrink-0 mt-2"></div>
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-destructive/20 shadow-card animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  The Impact:
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t('landing.problem.impact')}
                </p>
                <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-destructive font-medium">
                    This cycle continues to worsen educational outcomes in J&K
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-government">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-4 font-government">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-government">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of J&K students who are making informed career decisions with Nayi Manzil
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-hero">
                {t('landing.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                {t('navigation.login')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}