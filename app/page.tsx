export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-5xl mx-auto">
      <p className="font-bold text-6xl">
        Hello developer, read this before doing work.
      </p>
      <ul className="mt-6 text-lg font-medium list-disc list-inside">
        <li>
          Fonts and colors have already been defined, so don&apos;t reinvent the
          wheel, or modify something.
        </li>
        <li>
          Make components reusable and composable. Add necessary props so that
          they can be easily customized.
        </li>
        <li>
          Test components in the{" "}
          <span className="px-1 py-0.5 border border-gray-500 bg-white rounded-md">
            app/test/page.tsx
          </span>{" "}
          file, but do not push changes made to that file, only push changes to
          the components themselves with the screenshots included.
        </li>
        <li>
          Strictly adhere to what the issue describes. If you think something
          should be changed, discuss it first before making changes.
        </li>
        <li>
          Follow the existing folder structure for new components, pages, or
          features.
        </li>
        <li>Do not install any new dependencies without approval.</li>
        <li>
          This website will be integrated with the backend, so use proper mock
          data where necessary, as they will later be replaced with real data.
        </li>
        <li>
          When using AI-generated code, please make sure to review the quality
          and remove unnecessary comments. AI generated code will have some
          colors from the Tailwind palette, so make sure to adjust them to match
          our design system.
        </li>
        <li>
          The master branch is always protected, create a separate branch for
          your work and create a pull request when you are done. The pull
          request should be made to the development branch first, not directly
          to master. Wait for approval before merging.
        </li>
      </ul>
    </main>
  );
}
