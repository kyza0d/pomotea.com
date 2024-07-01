import Timer from "@/components/Timer";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      {/*
        <div className="ml-auto">
          <UserAvatar />
        </div>
      */}
      <Timer />
    </div>
  );
};
