import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rushiraj Jadeja — Full-Stack Developer & Indie Maker';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#111',
              lineHeight: 1.1,
            }}
          >
            Rushiraj Jadeja
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#666',
              fontWeight: 400,
            }}
          >
            Full-Stack Developer & Indie Maker
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#999',
              marginTop: '8px',
            }}
          >
            rushiraj.me
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            display: 'flex',
            gap: '16px',
            fontSize: 16,
            color: '#aaa',
          }}
        >
          <span>CashLens</span>
          <span>·</span>
          <span>PrivacyPage</span>
          <span>·</span>
          <span>InvoiceZen</span>
          <span>·</span>
          <span>Cloudo</span>
          <span>·</span>
          <span>DeadBy.ai</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
