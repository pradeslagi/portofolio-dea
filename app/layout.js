import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/globals.css';
import './styles/theme.css';
import { Poppins } from 'next/font/google';
import { Comic_Neue } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
});

const comic = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-comic',
});

export const metadata = {
  title: 'My Portfolio',
  description: 'Lucu dan minimalis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${comic.variable}`} suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
