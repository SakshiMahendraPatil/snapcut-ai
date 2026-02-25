import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { listProcessedImages } from "@/lib/storage";

const History = () => {
  const [items, setItems] = useState<Array<{ id: string; name: string; url: string; type: string }>>([]);

  useEffect(() => {
    listProcessedImages().then((records) => {
      const mapped = records.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        url: URL.createObjectURL(r.data),
      }));
      setItems(mapped);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">History</h1>
            <p className="text-muted-foreground">Background-removed images saved on this device</p>
          </div>
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground">No processed images yet</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {items.map((img) => (
                <a
                  key={img.id}
                  href={img.url}
                  download={img.name}
                  className="block aspect-square bg-muted rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                  title={img.name}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
