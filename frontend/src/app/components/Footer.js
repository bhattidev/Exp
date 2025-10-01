// app/components/Footer.js
import { Factory, Shield, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/80 backdrop-blur-lg border-t border-gray-700">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img alt="POF Logo" src="/pof.png" className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">JBH Complex, POF</h3>
              <p className="text-gray-400 text-xs">
                Industrial Production Monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              System Operational
            </span>
            <span>v2.1.0</span>
          </div>

          <div className="text-gray-400 text-xs">
            © {currentYear} Pakistan Ordnance Factories
          </div>
        </div>
      </div>
    </footer>
  );
}
