export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#fffaf7] py-8">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 text-sm text-stone-600 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="mb-2 text-lg text-stone-800">HairBan</h3>
          <p>Luxury hair buns and accessories for every elegant occasion.</p>
        </div>
        <div>
          <h4 className="mb-2 text-stone-800">Quick Links</h4>
          <ul className="space-y-1">
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-stone-800">Contact</h4>
          <p>Email: hello@hairban.com</p>
          <p>Phone: +1 800 555 0199</p>
        </div>
      </div>
    </footer>
  );
}
