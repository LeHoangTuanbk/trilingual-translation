export default function FyloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-darkBlue dark:text-white font-opensans">
        {children}
      </body>
    </html>
  );
}
