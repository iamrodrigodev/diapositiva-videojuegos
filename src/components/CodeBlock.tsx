export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <pre aria-label={label} className="mt-3 overflow-x-auto rounded-[0.4rem] bg-[#0a0f19] p-3 font-mono text-[0.8rem] leading-[1.5] text-[#e0edff]">
      <code>{code}</code>
    </pre>
  )
}
