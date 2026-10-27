export default function Cartao({ as: Tag = "section", className = "", children, ...resto }) {
  return (
    <Tag className={`cartao ${className}`.trim()} {...resto}>
      {children}
    </Tag>
  );
}
