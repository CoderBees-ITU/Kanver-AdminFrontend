import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from '@/lib/firebaseConfig'; // Adjust the path to your Firebase config
import { Card } from '@/components/ui/card';
import AuthLayout from '../auth-layout';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is an admin based on their UID
      if (userCredential.user.uid === 'QjfkPHy94WPNsHrR3IckSkXjEV42') {
        Cookies.set('token', await userCredential.user.uid );

        window.location.href = '/'; // Adjust this route as necessary
      } else {
        signOut(auth);
        setError('Access denied: You are not an admin.');
      }

      /* eslint-disable no-console */
      console.log('Logged in as:', userCredential.user);
      /* eslint-enable no-console */
    } catch {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="p-6">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          By clicking login, you agree to our{' '}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </Card>
    </AuthLayout>
  );
}