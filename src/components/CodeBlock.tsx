export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <pre aria-label={label} className="mt-3 rounded-[0.4rem] bg-well p-3 font-mono text-[0.8rem] leading-normal break-words whitespace-pre-wrap text-fg">
      <code>{code}</code>
    </pre>
  )
}
