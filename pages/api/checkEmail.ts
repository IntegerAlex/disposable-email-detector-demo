import type { NextApiRequest, NextApiResponse } from 'next';
import disposableEmailDetector from 'disposable-email-detector';

type ResponseData = {
  isDisposable?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const isEmailDisposable = await disposableEmailDetector(email);
      return res.status(200).json({ isDisposable: isEmailDisposable });
    } catch (err: unknown) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Error checking email. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 