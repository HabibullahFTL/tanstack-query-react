import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-10 my-10">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
