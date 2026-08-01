import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowRight, ShieldCheck, Shirt, Recycle, MessageSquare } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="space-y-8 text-gray-900">
      {/* Hero Banner Section */}
      <section className="border border-gray-300 bg-white p-8 rounded text-center space-y-4">
        <span className="inline-block bg-gray-100 border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded font-semibold uppercase tracking-wider">
          Unified Mentor Internship Project
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Clothing Exchange & Swap Marketplace
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-600 leading-relaxed">
          Exchange pre-loved clothing directly with fashion enthusiasts in your community instead of purchasing new items.
          Reduce garment waste, save money, and refresh your wardrobe sustainably.
        </p>
        <div className="flex justify-center space-x-3 pt-2">
          <Link
            to="/marketplace"
            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded text-xs font-semibold flex items-center space-x-2"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/register"
            className="border border-gray-400 bg-white hover:bg-gray-100 text-gray-800 px-5 py-2.5 rounded text-xs font-semibold"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-300 p-5 rounded space-y-2 text-xs">
          <Shirt className="w-6 h-6 text-gray-800" />
          <h3 className="font-bold text-sm text-gray-900">1. List Your Clothes</h3>
          <p className="text-gray-600">
            Upload items like Levi's Denim Jackets, Zara Dresses, or Nike Hoodies with photos, condition, and sizing details.
          </p>
        </div>

        <div className="bg-white border border-gray-300 p-5 rounded space-y-2 text-xs">
          <RefreshCw className="w-6 h-6 text-gray-800" />
          <h3 className="font-bold text-sm text-gray-900">2. Propose Swaps</h3>
          <p className="text-gray-600">
            Browse the marketplace, offer items from your closet in return, and agree on direct 1:1 item exchanges.
          </p>
        </div>

        <div className="bg-white border border-gray-300 p-5 rounded space-y-2 text-xs">
          <MessageSquare className="w-6 h-6 text-gray-800" />
          <h3 className="font-bold text-sm text-gray-900">3. Direct Chat Negotiation</h3>
          <p className="text-gray-600">
            Negotiate exchange details, shipping preferences, or local meetup locations through the negotiation chat.
          </p>
        </div>
      </section>

      {/* Sample Featured Wardrobe Items Preview */}
      <section className="bg-white border border-gray-300 p-6 rounded space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Marketplace Additions</h2>
            <p className="text-gray-500">Authentic pre-loved apparel available for swap today</p>
          </div>
          <Link to="/marketplace" className="text-gray-900 hover:underline font-semibold text-xs">
            View All ({'>'})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-3 rounded bg-gray-50 flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80"
              alt="Levi's Jacket"
              className="w-16 h-16 object-cover border border-gray-300 rounded"
            />
            <div>
              <p className="font-bold text-gray-900">Levi's Denim Jacket</p>
              <p className="text-gray-500 text-[11px]">Brand: Levi's | Size: L</p>
              <span className="bg-gray-200 border border-gray-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-medium mt-1 inline-block">
                Gently Used
              </span>
            </div>
          </div>

          <div className="border border-gray-200 p-3 rounded bg-gray-50 flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=200&q=80"
              alt="Zara Dress"
              className="w-16 h-16 object-cover border border-gray-300 rounded"
            />
            <div>
              <p className="font-bold text-gray-900">Zara Summer Dress</p>
              <p className="text-gray-500 text-[11px]">Brand: Zara | Size: M</p>
              <span className="bg-gray-200 border border-gray-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-medium mt-1 inline-block">
                Like New
              </span>
            </div>
          </div>

          <div className="border border-gray-200 p-3 rounded bg-gray-50 flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80"
              alt="Nike Hoodie"
              className="w-16 h-16 object-cover border border-gray-300 rounded"
            />
            <div>
              <p className="font-bold text-gray-900">Nike Tech Fleece Hoodie</p>
              <p className="text-gray-500 text-[11px]">Brand: Nike | Size: XL</p>
              <span className="bg-gray-200 border border-gray-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-medium mt-1 inline-block">
                Like New
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
