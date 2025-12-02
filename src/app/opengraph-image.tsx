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
          background: 'radial-gradient(circle at top left, #3B82F6, #8B5CF6)',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: '40px 64px',
            borderRadius: 32,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            color: 'white',
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 32,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                border: '3px solid rgba(255,255,255,0.85)',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                transform: 'rotate(-35deg)',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 42, fontWeight: 700 }}>ClearRoad</div>
            <div style={{ fontSize: 26, opacity: 0.9 }}>AI Career Roadmaps</div>
            <div style={{ fontSize: 20, opacity: 0.75, maxWidth: 540 }}>
              Turn vague career goals into a concrete, phase-by-phase roadmap you can actually follow.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
