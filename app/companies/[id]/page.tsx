import { companies } from "../../../data/companies";
import Link from "next/link";
import EnrichButton from "./EnrichButton";

export default async function CompanyProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const company = companies.find(
    (c) =>
      typeof c.id === "string" &&
      typeof resolvedParams.id === "string" &&
      c.id.toLowerCase() === resolvedParams.id.toLowerCase()
  );

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Company not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-6 py-10"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #c7d2fe 0%, #fff 50%, #a5b4fc 100%)',
        padding: '2.5rem 1.5rem',
      }}
    >
      <div
        className="max-w-4xl mx-auto"
        style={{ maxWidth: 960, margin: '0 auto' }}
      >
        {/* Back Button */}
        <Link
          href="/companies"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
        >
          ← Back to Companies
        </Link>

        {/* Profile Card */}
        <div
          className="mt-8 bg-white/90 shadow-2xl rounded-3xl p-10 border border-indigo-100 backdrop-blur-md"
          style={{
            marginTop: '2rem',
            background: 'rgba(255,255,255,0.95)',
            boxShadow: '0 8px 32px 0 rgba(60, 80, 200, 0.15)',
            borderRadius: '2rem',
            padding: '2.5rem',
            border: '1px solid #c7d2fe',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Header Section */}
          <div
            className="flex items-center justify-between"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div>
              <h1
                className="text-4xl font-extrabold text-gray-900 tracking-tight"
                style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}
              >
                {company.name}
              </h1>
              <span
                className="inline-block mt-3 px-4 py-1 text-base bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 text-indigo-700 rounded-full font-semibold shadow-sm"
                style={{
                  display: 'inline-block',
                  marginTop: '0.75rem',
                  padding: '0.25rem 1rem',
                  fontSize: '1.125rem',
                  background: 'linear-gradient(90deg, #bfdbfe 0%, #c7d2fe 50%, #ddd6fe 100%)',
                  color: '#4338ca',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px 0 rgba(60, 80, 200, 0.08)',
                }}
              >
                {company.industry}
              </span>
            </div>
            {/* Logo/Avatar with Gradient Ring */}
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-indigo-200"
                style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #a78bfa 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px 0 rgba(60, 80, 200, 0.15)',
                  border: '4px solid #c7d2fe',
                }}
              >
                {company.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t border-indigo-200 my-8"
            style={{ borderTop: '1px solid #c7d2fe', margin: '2rem 0' }}
          ></div>

          {/* Website Section */}
          <div className="space-y-2">
            <h2
              className="text-xl font-semibold text-gray-700 mb-2"
              style={{ fontSize: '1.25rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}
            >
              Website
            </h2>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 hover:underline break-all font-medium transition-colors duration-200"
              style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', wordBreak: 'break-all' }}
            >
              {company.website}
            </a>
          </div>

          {/* Enrich Button Section */}
          <div className="mt-10 flex justify-end">
            <EnrichButton website={company.website} />
          </div>
        </div>
      </div>
    </div>
  );
}