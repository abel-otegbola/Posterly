import Button from "@/components/button/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[url('/bg.svg')] bg-cover bg-top min-h-screen flex flex-col">
      <header className="flex justify-between 2xl:p-8 md:p-6 p-4 items-center">
        <h1>Posterly</h1>

        <Button variant="secondary" href="/create">Create</Button>
      </header>

      <section className="flex flex-col items-center 2xl:gap-8 md:gap-6 gap-4 2xl:p-12 md:p-10 p-6">
        <h2 className="2xl:text-[48px] md:text-[40px] text-[32px] max-w-2xl md:leading-[40px] leading-[40px] font-semibold text-center">
          AI-Powered Poster Generator for Your Business
        </h2>

        <p className="text-center max-w-2xl leading-[24px] mb-4">
          Transform your ideas into professional, eye-catching posters instantly with the power of AI. No design skills required—just input your text and watch as our intelligent platform creates stunning visuals tailored to your brand and message.
        </p>

        <div className="relative">
          <div className="absolute dark:top-[20%] top-[5%] left-[6%] w-[88%] dark:h-[60%] h-[90%] z-[-1] btn-bg p-2 backdrop-blur-[15px] rounded-[12px] bg-opacity-80 ">
          </div>
          <Button className="z-2" href="/create">Get Started for free</Button>
        </div>
      </section>

      <div className="p-4">
        <Image src="/hero-bg.png" alt="Posterly app mockup" width={1920} height={1080} className="md:w-[75%] w-full h-auto mt-auto mx-auto" />
      </div>
    </main>
  );
}
