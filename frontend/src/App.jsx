import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    checking_status: "<0",
    duration: 24,
    credit_history: "existing paid",
    purpose: "radio/tv",
    credit_amount: 5000,
    savings_status: "<100",
    employment: "1<=X<4",
    installment_commitment: 3,
    personal_status: "male single",
    other_parties: "none",
    residence_since: 2,
    property_magnitude: "real estate",
    age: 35,
    other_payment_plans: "none",
    housing: "own",
    existing_credits: 1,
    job: "skilled",
    num_dependents: 1,
    own_telephone: "yes",
    foreign_worker: "no",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumericField = [
      "duration",
      "credit_amount",
      "installment_commitment",
      "residence_since",
      "age",
      "existing_credits",
      "num_dependents",
    ].includes(name);

    setFormData((prev) => ({
      ...prev,
      [name]: isNumericField ? Number(value) : value,
    }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction from the server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white/90 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-white">
            Risk Assessment Engine
          </h1>
          <p className="text-white/50 text-sm">
            Powered by Logistic Regression
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white/2 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-xl font-medium mb-6">Applicant Profile</h2>
            <form
              onSubmit={handlePredict}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Credit Amount ($)
                </label>
                <input
                  type="number"
                  name="credit_amount"
                  value={formData.credit_amount}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Duration (Months)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Housing
                </label>
                <select
                  name="housing"
                  value={formData.housing}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="rent">Rent</option>
                  <option value="own">Own</option>
                  <option value="free">Free</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Foreign Worker
                </label>
                <select
                  name="foreign_worker"
                  value={formData.foreign_worker}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  Checking Status
                </label>
                <select
                  name="checking_status"
                  value={formData.checking_status}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="no checking">No Checking</option>
                  <option value="<0">Less than 0</option>
                  <option value="0<=X<200">0 to 200</option>
                  <option value=">=200">Greater than 200</option>
                </select>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-medium rounded-xl px-4 py-4 hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Analyzing Risk..." : "Run Analysis"}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/2 border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center backdrop-blur-xl transition-all duration-500">
              {!result && !error && (
                <div className="text-white/30">
                  <p className="text-sm">Awaiting applicant data.</p>
                </div>
              )}

              {error && (
                <div className="text-red-400">
                  <p>{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-sm text-white/50 uppercase tracking-widest">
                    Decision
                  </h3>

                  <div
                    className={`text-4xl font-semibold tracking-tight ${result.decision.includes("Reject") ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {result.decision}
                  </div>

                  <div className="h-px w-12 bg-white/10 mx-auto my-8"></div>

                  <div className="space-y-1">
                    <p className="text-6xl font-light tracking-tighter">
                      {result.default_probability}
                    </p>
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Probability of Default
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
