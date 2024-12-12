export default function Home() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow-lg p-12 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Discover Our Exclusive Real Estate Listings
          </h1>
          <p className="text-lg mb-6">
            Find your perfect home with us! Our platform provides the best property listings.
          </p>
        
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose Our Platform?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li className="mb-4">
              <strong>Wide Selection:</strong> Choose from a variety of properties that fit your needs.
            </li>
            <li className="mb-4">
              <strong>Expert Support:</strong> Get advice from our dedicated real estate professionals.
            </li>
            <li className="mb-4">
              <strong>Clear & Easy Process:</strong> Simplify your home buying journey with transparency.
            </li>
            <li className="mb-4">
              <strong>Trusted by Many:</strong> Join a community that values trust and reliability.
            </li>
          </ul>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Browse our listings today and get in touch with our team for expert assistance.
          </p>
         
        </div>
      </div>
    </section>
  );
}
