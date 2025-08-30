function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()} <span className="font-semibold">MFM CYCBC 2025</span>. All rights reserved.
      </p>
      <p className="mt-2 text-xs md:text-sm">
        Powered by <span className="text-yellow-400 font-medium">Faith & Technology</span>
      </p>
    </footer>
  );
}

export default Footer;
