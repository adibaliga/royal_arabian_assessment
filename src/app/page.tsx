export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-ra-navy mb-4">
          Royal Arabian Developer Assessment
        </h1>
        <p className="text-gray-600 mb-8">
          Your task is to build the China destination page at{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-ra-orange">/cn</code>
        </p>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left">
          <h2 className="font-semibold text-lg mb-3">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Set up your Sanity project and add your credentials to <code className="bg-gray-100 px-1 rounded">.env.local</code></li>
            <li>Create the Destination and Package schemas in Sanity</li>
            <li>Add sample content for China destination and packages</li>
            <li>Build the <code className="bg-gray-100 px-1 rounded">/cn</code> page</li>
            <li>Deploy to Vercel</li>
          </ol>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          See the assessment document and README for full requirements.
        </p>
      </div>
    </main>
  );
}
