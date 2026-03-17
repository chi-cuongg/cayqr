import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cây Điều Ước',
  description: 'Cây điều ước tương tác tuyệt đẹp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
