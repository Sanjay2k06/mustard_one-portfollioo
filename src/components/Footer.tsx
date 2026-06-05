import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent" />
              <span className="font-display text-lg font-bold">
                MUSTARD<span className="text-gradient-mustard">ONE</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              One Way for Many Solutions. Engineering, creativity, technical support, and education
              under one identity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Divisions</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/mustardworks" className="hover:text-foreground">MustardWorks</Link></li>
              <li><Link to="/services/mustardstudio" className="hover:text-foreground">MustardStudio</Link></li>
              <li><Link to="/services/mustardcare" className="hover:text-foreground">MustardCare</Link></li>
              <li><Link to="/services/mustardlearn" className="hover:text-foreground">MustardLearn</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MustardOne. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">As Your Expectations</p>
        </div>
      </div>
    </footer>
  );
}
