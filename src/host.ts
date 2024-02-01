export const reflectServer = import.meta.env.VITE_REFLECT_SERVER
  ? applyTemplate(import.meta.env.VITE_REFLECT_SERVER)
  : "";

function applyTemplate(template: string) {
  const f = new Function(
    "NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF",
    `return \`${template}\``
  );
  const branchName = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ?? "";
  return f(branchName.replace(/[^a-zA-Z0-9]/g, "-"));
}
