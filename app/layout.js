import Link from 'next/link';
import './global.css'

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/add-post">Add Post</Link>
                </li>
                <li>
                    <Link href="/edit-post">Edit Post</Link>
                </li>
            </ul>
            {children}
            </body>
      </html>
    )
  }