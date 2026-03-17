import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', margin: 0 }}>Wish Tree</h1>
      <p style={{ opacity: 0.7, maxWidth: '500px' }}>
        An interactive real-time experience. 
        Select a destination to continue:
      </p>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        marginTop: '24px'
      }}>
        <Link href="/tree" style={cardStyle}>
          <h2>Big Screen Display &rarr;</h2>
          <p>The interactive tree visualization (designed for large screens).</p>
        </Link>
        
        <Link href="/submit" style={cardStyle}>
          <h2>Mobile Submission &rarr;</h2>
          <p>Form to submit a new wish to the tree (designed for mobile).</p>
        </Link>
        
        <Link href="/qr" style={cardStyle}>
          <h2>QR Code &rarr;</h2>
          <p>Display QR code that links to the mobile submission page.</p>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: '24px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'inherit',
  textDecoration: 'none',
  width: '100%',
  maxWidth: '300px',
  transition: 'all 0.2s ease',
  textAlign: 'left' as const
};
