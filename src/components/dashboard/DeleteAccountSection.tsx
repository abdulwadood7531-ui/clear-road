'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function DeleteAccountSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure? This will permanently delete your account and all saved roadmaps.')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to delete account');
        setLoading(false);
        return;
      }

      // Redirect to home; session will be invalid after deletion
      router.push('/');
    } catch (err) {
      console.error('Error deleting account', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card className="border-destructive/40 bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-destructive">Danger zone</CardTitle>
        <CardDescription>
          Permanently delete your account and all saved roadmaps. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-xs text-muted-foreground">
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting account...' : 'Delete my account'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
