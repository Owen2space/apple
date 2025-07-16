import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Correct password is 2002 (Selipher's birth year)
const CORRECT_PASSWORD = '2002';
const PASSWORD_KEY = 'selipherBdayAccess';

const PasswordProtection = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if already verified
  useEffect(() => {
    const isVerified = localStorage.getItem(PASSWORD_KEY);
    if (isVerified === 'true') {
      navigate('/surprise');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        // Store verification in local storage
        localStorage.setItem(PASSWORD_KEY, 'true');
        toast({
          title: '💖 Welcome Selipher! 💖',
          description: 'Verified successfully. Enjoy your surprise!',
          duration: 3000,
        });
        navigate('/surprise');
      } else {
        setAttempts(attempts + 1);
        toast({
          title: 'Hmm, that doesn\'t seem right.',
          description: 'Try again with your birth year (4 digits).',
          variant: 'destructive',
          duration: 3000,
        });
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4">
      <div className="w-full max-w-md">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-primary animate-pulse" />
              Special Surprise
              <Heart className="h-5 w-5 text-primary animate-pulse" />
            </CardTitle>
            <CardDescription>
              This birthday gift is for Selipher only!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Please enter your birth year to unlock:
                </p>
                <Input
                  type="password"
                  placeholder="Enter 4-digit year..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                  autoFocus
                />
              </div>

              {attempts > 0 && (
                <div className="text-sm text-red-500">
                  {attempts === 1 ? 'Hint: Your birth year has 4 digits.' : 
                   attempts === 2 ? 'Hint: It starts with "20".' : 
                   'Really? You don\'t know your own birth year? 😉'}
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              onClick={handleSubmit}
              className="w-full"
              disabled={password.length !== 4 || isLoading}
            >
              {isLoading ? 'Checking...' : 'Unlock My Surprise'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PasswordProtection; 