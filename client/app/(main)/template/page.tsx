import ThemeToggle from "@/components/theme-toggle";

export default function template() {
  return (
    <>
      <main className="bg-background text-foreground font-sans min-h-screen">
        {/* Banner top */}
        <div className="bg-secondary text-secondary-foreground text-center text-sm py-2">
          ✨ Get 15% off – Use code <strong>LOVE15</strong> at checkout!
        </div>

        {/* Navbar */}
        <header className="bg-card text-card-foreground shadow-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-primary">Cozy Skincare</div>
            <nav className="space-x-6 text-sm">
              <a href="#" className="hover:text-primary">
                Home
              </a>
              <a href="#" className="hover:text-primary">
                Shop
              </a>
              <a href="#" className="hover:text-primary">
                About
              </a>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-background py-16 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl font-bold leading-tight text-primary mb-4">
              Natural Skincare <br /> Daily Routine
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Glow naturally with products powered by 100% nature.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md shadow hover:opacity-90 transition">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="/hero-product.png"
              alt="Skincare Product"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-12 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {["Moisturizers", "Serums", "Masks", "Cleansers"].map((cat) => (
                <div
                  key={cat}
                  className="bg-card p-4 text-center rounded-lg shadow hover:ring-2 hover:ring-ring transition"
                >
                  <div className="w-20 h-20 bg-muted mx-auto mb-3 rounded-full" />
                  <p className="text-sm font-medium">{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card text-card-foreground py-10 border-t border-border">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 text-sm">
            <div>
              <h3 className="font-bold text-lg mb-2">Cozy Skincare</h3>
              <p className="text-muted-foreground">
                Powered by nature, crafted with love.
              </p>
            </div>
            <div className="space-y-2">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Contact Us</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
