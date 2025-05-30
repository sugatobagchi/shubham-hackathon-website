import type { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScVPufgCjzSbLUOEShjqUjdtyxZSSIdstZyV0o6hsfq8u5WLw/formResponse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Accept JSON or urlencoded
    const formData = req.body;
    // If content-type is JSON, convert to urlencoded
    const params = new URLSearchParams();
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        params.append(key, formData[key]);
      }
    }

    const response = await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const text = await response.text();
    console.log('Google Forms response:', text);

    if (response.ok || response.status === 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to submit to Google Forms', details: text });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: (error as Error).message });
  }
} 