"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "true" && sessionId) {
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch("/api/verify-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStatus("Payment successful! Welcome to DJ Tour Pro.");
      } else {
        setPaymentStatus("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("Error verifying payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Dashboard
          </h1>

          {paymentStatus && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-center">{paymentStatus}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">
                Missions
              </h3>
              <p className="text-3xl font-bold text-violet-400">0</p>
              <p className="text-white/60 text-sm">Completed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">
                Contacts
              </h3>
              <p className="text-3xl font-bold text-blue-400">0</p>
              <p className="text-white/60 text-sm">Added</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">Level</h3>
              <p className="text-3xl font-bold text-green-400">1</p>
              <p className="text-white/60 text-sm">Current Level</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60">
              Welcome to your DJ Tour dashboard. Start your journey by exploring
              missions and building your network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardPageContent />
    </Suspense>
  );
}
