import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://x.com/kibousystems" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Twitter /></a>
          <a href="https://github.com/KibouSystems" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Github /></a>
          <a href="https://www.linkedin.com/company/kibousystems/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Linkedin /></a>
        </div>
        <p>&copy; {currentYear} Kibou Systems. All rights reserved.</p>
        <p className="text-sm mt-2">Crafted with passion in the digital cosmos.</p>
      </div>
    </footer>
  );
}
