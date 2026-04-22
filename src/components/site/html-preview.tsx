/**
 * Renders an HTML <a> snippet as syntax-highlighted code.
 * Used inside link tooltips to show the actual markup the link emits.
 *
 * Color scope is intentionally hardcoded (zinc / blue / emerald) so the
 * preview reads like a code editor in both light and dark site themes.
 */
export function HtmlPreview({
  href,
  label,
  target,
}: {
  href: string;
  label: string;
  target?: string;
}) {
  const arrow = target === "_blank" ? " ↗" : "";

  return (
    <pre className="m-0 font-mono text-[11px] leading-relaxed whitespace-pre">
      <span className="text-blue-400">{"<a"}</span>
      {" "}
      <span className="text-zinc-400">href</span>
      <span className="text-zinc-500">=</span>
      <span className="text-emerald-300">{`"${href}"`}</span>
      {target && (
        <>
          {"\n   "}
          <span className="text-zinc-400">target</span>
          <span className="text-zinc-500">=</span>
          <span className="text-emerald-300">{`"${target}"`}</span>
        </>
      )}
      <span className="text-blue-400">{">"}</span>
      {"\n  "}
      <span className="text-zinc-100">
        {label}
        {arrow}
      </span>
      {"\n"}
      <span className="text-blue-400">{"</a>"}</span>
    </pre>
  );
}
