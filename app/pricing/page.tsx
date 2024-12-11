import React from "react";

const Pricing = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#4dd193]">
          Pricing Plans
        </h1>
        <p className="text-[#AEC3B0] max-w-2xl mx-auto text-lg">
          Choose a plan that fits your needs. Enjoy our premium features and
          services.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#4dd193] mb-2">
            Basic Plan
          </h2>
          <p className="text-[#AEC3B0] mb-4">
            Perfect for individuals starting out.
          </p>
          <p className="text-3xl font-bold text-[#4dd193] mb-4">$9/month</p>
          <ul className="text-[#AEC3B0] mb-4">
            <li>✔️ Access to basic features</li>
            <li>✔️ 10GB Storage</li>
            <li>✔️ Email Support</li>
          </ul>
          <button className="bg-[#4dd193] hover:bg-[#3ba875] text-black py-2 px-4 rounded">
            Choose Plan
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#4dd193] mb-2">
            Standard Plan
          </h2>
          <p className="text-[#AEC3B0] mb-4">Ideal for small teams.</p>
          <p className="text-3xl font-bold text-[#4dd193] mb-4">$19/month</p>
          <ul className="text-[#AEC3B0] mb-4">
            <li>✔️ Access to all features</li>
            <li>✔️ 50GB Storage</li>
            <li>✔️ Priority Email Support</li>
          </ul>
          <button className="bg-[#4dd193] hover:bg-[#3ba875] text-black py-2 px-4 rounded">
            Choose Plan
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-[#4dd193] mb-2">
            Premium Plan
          </h2>
          <p className="text-[#AEC3B0] mb-4">For larger organizations.</p>
          <p className="text-3xl font-bold text-[#4dd193] mb-4">$29/month</p>
          <ul className="text-[#AEC3B0] mb-4">
            <li>✔️ All Standard features</li>
            <li>✔️ 200GB Storage</li>
            <li>✔️ 24/7 Support</li>
          </ul>
          <button className="bg-[#4dd193] hover:bg-[#3ba875] text-black py-2 px-4 rounded">
            Choose Plan
          </button>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
