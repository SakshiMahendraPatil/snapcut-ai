import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="JustCrop" className="h-14" />
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-10">
          <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/api-docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            API
          </Link>
          <Link to="/history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            History
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Log in
            </button>
          </Link>
          <Link to="/register">
            <button className="gradient-primary text-sm font-semibold px-5 py-2.5 rounded-lg text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Get Started Free
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
