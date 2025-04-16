// app/api/chat/route.js

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return new Response(JSON.stringify({ response: 'Terjadi kesalahan saat memproses request.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada jawaban dari model.';

    return new Response(JSON.stringify({ response: reply }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ response: 'Gagal memproses permintaan.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
