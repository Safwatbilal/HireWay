import Header from '@/components/Header';
import Providers from '@/components/Provider';
import '../globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tanstack from '@/components/Tanstack';
export const metadata = {
  title: "HireWay",
  description: "Your pathway to hiring and career success.",
};

export default function RootLayout({ children }) {
  return (
    <Tanstack>
    <Providers>
      <html lang="en">
        <body className='bg-bgColor  '>
          <Header></Header>
          {children}
          <ToastContainer></ToastContainer>
        </body>
      </html>
    </Providers>
    </Tanstack>
  );
}
