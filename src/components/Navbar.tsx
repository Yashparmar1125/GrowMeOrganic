import { Menubar } from 'primereact/menubar';

export default function Navbar() {
  const start = <div className="text-xl font-bold p-2">Artworks Manager</div>;

  return (
    <div className="card mb-4">
      <Menubar start={start} className="bg-blue-50 border-none border-noround" />
    </div>
  );
}