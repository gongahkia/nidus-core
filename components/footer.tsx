import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white/95 border-t border-slate-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about-nidus" className="text-slate-600 hover:text-purple-700 transition-colors">About us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-600 hover:text-purple-700 transition-colors">Contact us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/lending" className="text-slate-600 hover:text-purple-700 transition-colors">Business Pay Later</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/product-guide" className="text-slate-600 hover:text-purple-700 transition-colors">Product Guide</Link>
                </li>
                <li>
                  <Link href="/docs/developer-guide" className="text-slate-600 hover:text-purple-700 transition-colors">Developer Guide</Link>
                </li>
                <li>
                  <Link href="/help" className="text-slate-600 hover:text-purple-700 transition-colors">Help Center</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-slate-600 hover:text-purple-700 transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-slate-600 hover:text-purple-700 transition-colors">Service Agreement</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 mt-8 mb-4">
          NIDUS is a ...
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Nidus</span>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-block">
              <span className="inline-block bg-black text-white rounded p-1 text-xs font-bold" style={{fontSize:'1rem'}}>in</span>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-block">
              <span className="inline-block bg-black text-white rounded p-1 text-xs font-bold" style={{fontSize:'1rem'}}>G</span>
            </a>
          </div>
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} NIDUS Pte. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}