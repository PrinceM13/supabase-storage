import ImageUploadAndDisplay from "@/components/ImageUploadAndDisplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <h1>Supabse Storage</h1>
      <ImageUploadAndDisplay />
    </main>
  );
}
