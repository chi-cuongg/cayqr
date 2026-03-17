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
      <h1 style={{ fontSize: '3rem', margin: 0 }}>Cây Điều Ước</h1>
      <p style={{ opacity: 0.7, maxWidth: '500px' }}>
        Một trải nghiệm tương tác thời gian thực. 
        Chọn một điểm đến để tiếp tục:
      </p>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        marginTop: '24px'
      }}>
        <Link href="/tree" style={cardStyle}>
          <h2>Màn Hình Lớn &rarr;</h2>
          <p>Giao diện cây tương tác (thiết kế cho màn hình lớn).</p>
        </Link>
        
        <Link href="/submit" style={cardStyle}>
          <h2>Gửi Lời Ước Bằng Điện Thoại &rarr;</h2>
          <p>Biểu mẫu để gửi một điều ước mới lên cây (thiết kế cho điện thoại).</p>
        </Link>
        
        <Link href="/qr" style={cardStyle}>
          <h2>Mã QR &rarr;</h2>
          <p>Hiển thị mã QR liên kết đến trang gửi điều ước.</p>
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
