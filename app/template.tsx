// A template re-mounts on every navigation, which gives each page a soft fade-in.
// Opacity only: a transform here would break position: fixed / pinned children.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
