import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A, #1D4ED8)',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            padding: '48px 80px',
            borderRadius: 40,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            color: 'white',
          }}
        >
          {/* Logo block */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 40,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 45px rgba(15,23,42,0.75)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                border: '4px solid rgba(255,255,255,0.9)',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                transform: 'rotate(-40deg)',
              }}
            />
          </div>

          {/* Text block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              maxWidth: 560,
            }}
          >
            <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
              ClearRoad
            </div>
            <div style={{ fontSize: 30, opacity: 0.9 }}>
              AI Career Roadmaps
            </div>
            <div style={{ fontSize: 22, opacity: 0.8 }}>
              A clear, phase-by-phase path from where you are to where you want to go.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
