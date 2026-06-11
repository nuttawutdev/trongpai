export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Admin
      </h1>

      <form className="mt-6 space-y-4">
        <input
          placeholder="Event Name"
          className="w-full rounded border p-2"
        />

        <input
          placeholder="Location"
          className="w-full rounded border p-2"
        />

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}