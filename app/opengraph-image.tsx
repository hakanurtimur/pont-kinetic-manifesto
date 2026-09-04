import { ImageResponse } from 'next/og';

export const alt = 'PONT — The physical home of Europe’s next technological era';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function PontSocialMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 740.01 193" width="296" height="78">
      <path
        fill="#FF5A42"
        d="m405.01.04 76.01 122.82c.49.79 3.29.28 3.69-.29l.3-122.53h36l.01 190.95-38.71-.08-79.41-128.6c-.49-1.61-1.57-2.01-2.36-2.21-.54-.13-2.25.14-2.25 1.27l-.02 129.62h-36.54L362.01.04zm294 0-.38 32.24-54.88-.01-.02 158.77-37.47-.06.01-158.7-54.99-.05-.27-32.2zM74.93.36l12.53 1.17c37.82 6.1 55.37 35.85 48.86 72.89-3.17 18.04-14.46 32.44-31.3 39.65-8.47 3.86-17.49 5.77-27.01 5.81l-40.44.17V191H0V0zm20.81 77.8c5.63-11.51 5.32-24.53-.18-35.62-4.78-7.22-12.69-11.65-21.58-11.71l-36.39-.23v59.67l36.34-.33c8.86-.08 16.87-4.06 21.82-11.79Zm79.27 1.61 48.47.1a23.92 23.92 0 0 0 10.92 23.24 23.9 23.9 0 0 0 25.68-.06c7.82-5 12.04-14.08 10.82-23.29h69.68c.1 52.38-42.17 93.64-93.15 93.72-51.36.09-93.81-41.4-93.59-93.79l21.18-.03Z"
      />
      <path
        fill="#F4F4EF"
        d="M319.17 79.78H270.9c-1.58-11.92-11.75-20.8-23.76-20.77S225 67.97 223.48 79.88l-48.47-.1c1.42-22.49 10.82-42.47 28.84-56.92 23.21-18.63 56.77-20.34 81.91-3.49 20.43 13.7 32.61 36.16 33.41 60.41"
      />
      <circle cx="716.88" cy="167.86" r="23.13" fill="#FF5A42" />
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: '#101629',
        color: '#F4F4EF',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -165,
          right: -110,
          width: 590,
          height: 590,
          borderRadius: 590,
          border: '2px solid rgba(255,90,66,0.22)',
          boxShadow: '0 0 120px rgba(255,90,66,0.12)',
        }}
      />
      <div style={{ position: 'absolute', top: 0, left: 52, width: 2, height: 630, background: '#FF5A42' }} />
      <div style={{ position: 'absolute', top: 50, left: 52, right: 52, height: 1, background: 'rgba(244,244,239,0.22)' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '82px 78px 54px 92px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <PontSocialMark />
          <div style={{ display: 'flex', color: '#8992A7', fontSize: 18, fontWeight: 700, letterSpacing: '0.16em' }}>
            AMSTERDAM OOST
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 66, fontWeight: 800, lineHeight: 0.91, letterSpacing: '-0.055em' }}>
          <div style={{ display: 'flex' }}>THE PHYSICAL HOME OF</div>
          <div style={{ display: 'flex' }}>EUROPE&apos;S NEXT</div>
          <div style={{ display: 'flex', color: '#FF5A42' }}>TECHNOLOGICAL ERA.</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', color: '#8992A7', fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>
            PHYSICAL AI × LIFE SCIENCES × CAPITAL × COMMUNITY × ACADEMY
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800 }}>10.000</span>
            <span style={{ color: '#FF5A42', fontSize: 18, fontWeight: 800 }}>M²</span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
