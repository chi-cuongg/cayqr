import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wish Tree',
  description: 'Interactive beautiful wish tree',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
