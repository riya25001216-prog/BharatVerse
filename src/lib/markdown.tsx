import type { ReactNode } from 'react';

/**
 * Minimal renderer for the small markdown dialect used by the guide:
 * `**bold**`, `*italic*`, `•` bullets, `###` headings and simple pipe tables.
 */
export function renderMarkdown(text: string): ReactNode {
  const lines = text.split('\n');
  const blocks: ReactNode[] = [];
  let list: ReactNode[] = [];
  let table: string[][] = [];

  const flushList = (key: string) => {
    if (list.length) {
      blocks.push(
        <ul key={key} className="my-1.5 space-y-1.5">
          {list}
        </ul>
      );
      list = [];
    }
  };
  const flushTable = (key: string) => {
    if (table.length) {
      const [head, ...rows] = table;
      blocks.push(
        <div key={key} className="my-2 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left text-[11.5px]">
            <thead>
              <tr className="bg-white/[0.06]">
                {head.map((cell, i) => (
                  <th key={i} className="px-2.5 py-1.5 font-semibold text-white/85">
                    {inline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-white/8">
                  {row.map((cell, c) => (
                    <td key={c} className="px-2.5 py-1.5 align-top text-white/65">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      table = [];
    }
  };

  lines.forEach((raw, index) => {
    const line = raw.trimEnd();

    if (line.trim().startsWith('|')) {
      const cells = line
        .trim()
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => /^-{2,}$/.test(c))) return;
      table.push(cells);
      return;
    }
    flushTable(`t${index}`);

    if (!line.trim()) {
      flushList(`l${index}`);
      return;
    }
    if (line.startsWith('### ')) {
      flushList(`l${index}`);
      blocks.push(
        <div key={`h${index}`} className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-saffron-300/80">
          {line.slice(4)}
        </div>
      );
      return;
    }
    if (line.startsWith('• ')) {
      list.push(
        <li key={`li${index}`} className="flex gap-2 text-[13px] leading-relaxed text-white/78">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-saffron-300/70" />
          <span>{inline(line.slice(2))}</span>
        </li>
      );
      return;
    }
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\.\s/)?.[1];
      list.push(
        <li key={`li${index}`} className="flex gap-2 text-[13px] leading-relaxed text-white/78">
          <span className="mt-0.5 shrink-0 font-semibold text-saffron-300/80">{num}.</span>
          <span>{inline(line.replace(/^\d+\.\s/, ''))}</span>
        </li>
      );
      return;
    }
    flushList(`l${index}`);
    blocks.push(
      <p key={`p${index}`} className="my-1 text-[13px] leading-relaxed text-white/78">
        {inline(line)}
      </p>
    );
  });

  flushList('l-end');
  flushTable('t-end');

  return <>{blocks}</>;
}

function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={key++} className="italic text-white/85">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
