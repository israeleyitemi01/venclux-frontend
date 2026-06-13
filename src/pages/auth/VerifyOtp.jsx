import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios.js"; 

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const email =
    location.state?.email ||
    localStorage.getItem("venclux_pending_email") ||
    "";
  const storeName =
    location.state?.businessName ||
    localStorage.getItem("venclux_pending_business") ||
    "your store";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);

  // FIX: Added structural guard to freeze the execution interval when it hits 0
  useEffect(() => {
    if (timer <= 0) return; // Stop the execution loop if the clock runs down

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index, value) => {
    if (isNaN(value)) return; 
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtpCode = otp.join("");
    if (fullOtpCode.length !== 6) {
      setError("Please complete the full 6-digit authorization signature mapping.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await API.post("/auth/verify-otp", {
        email,
        otp: fullOtpCode
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("venclux_token", response.data.token);
        localStorage.removeItem("venclux_pending_email");
        localStorage.removeItem("venclux_pending_business");
        login(response.data.user);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token coordinate matching verification.");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    setError("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      const response = await API.post("/auth/resend-otp", { email });
      if (response.data.success) {
        setSuccessMessage("A fresh initialization token has been delivered to your email inbox!");
        setOtp(["", "", "", "", "", ""]); 
        setTimer(59); // Safely resets the stopwatch back to 59s to start counting down again
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to redistribute fresh security tokens.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Dark Marketing Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[#C3ECD7] flex items-center justify-center font-bold text-slate-900 text-sm">V</div>
          <span className="text-xl font-bold text-white tracking-tight">Venclux</span>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">Securing your platform ecosystem.</h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            We've deployed an encrypted verification channel straight to your target gateway coordinates.
          </p>
        </div>
        <div className="text-slate-400 text-xs relative z-10">4.9/5 from 800+ reviews</div>
      </div>

      {/* ── Right: Verification Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm">
          <button onClick={() => navigate("/register")} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to registry
          </button>

          <h2 className="text-2xl font-bold text-slate-900">Verify your store</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Enter the security token sent to lock in setup configurations for <span className="font-semibold text-slate-800">{storeName}</span> ({email || "your email"}).
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  disabled={isLoading || isResending}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-extrabold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C3ECD7] focus:border-transparent disabled:opacity-60 bg-slate-50 sm:bg-white"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || isResending}
              className="w-full bg-[#0F172A] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C3ECD7]" />
                  <span>Finalize Engine Verification</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Didn't receive the authentication payload?{" "}
            {timer > 0 ? (
              <span className="font-semibold text-slate-400">Resend in {timer}s</span>
            ) : (
              <button 
                onClick={handleResendCode} 
                disabled={isResending}
                className="font-semibold text-slate-900 hover:underline focus:outline-none disabled:opacity-50"
              >
                {isResending ? "Sending token..." : "Resend fresh code"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
