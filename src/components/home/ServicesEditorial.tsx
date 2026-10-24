import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { serviceById, serviceHref, type Service } from "@/config/services";
import { PauseOffscreen, Reveal } from "../ui/Reveal";
import {
  BrowserMockups,
  ChatConversation,
  ContentPipeline,
  InvoicePipelineMini,
  VoiceConsole,
} from "../visuals/ServiceVisuals";

function ServiceText({
  service,
  onNavy = false,
  points = 3,
}: {
  service: Service;
  onNavy?: boolean;
  points?: number;
}) {
  return (
    <div>
      <p className={`font-mono text-sm ${onNavy ? "text-[#8fb0ff]" : "text-blue"}`}>{service.number}</p>
      <h3 className={`mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight font-semibold tracking-tight ${onNavy ? "text-white" : "text-navy"}`}>
        {service.name}
      </h3>
      <p className={`mt-3 text-[16px] leading-relaxed ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>{service.summary}</p>
      <ul className="mt-5 space-y-2">
        {service.capabilities.slice(0, points).map((c) => (
          <li key={c.title} className={`flex gap-2.5 text-[15px] ${onNavy ? "text-white" : "text-ink"}`}>
            <Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${onNavy ? "text-[#8fb0ff]" : "text-blue"}`} />
            {c.title}
          </li>
        ))}
      </ul>
      <Link
        href={serviceHref(service)}
        className={`group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium ${onNavy ? "text-white hover:text-[#8fb0ff]" : "text-blue hover:text-blue-700"}`}
      >
        Explore {service.name}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/** Five services in a deliberately varied editorial layout. */
export function ServicesEditorial() {
  const { social, voice, whatsapp, website, documents } = serviceById;
  return (
    <div className="flex flex-col gap-6">
      {/* 01 — wide row */}
      <Reveal className="grid grid-cols-1 items-center gap-10 rounded-lg border border-line bg-white p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <ServiceText service={social} points={4} />
        <ContentPipeline />
      </Reveal>

      {/* 02 + 03 — paired columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-8 rounded-lg border border-line bg-paper p-6 sm:p-10">
          <ServiceText service={voice} />
          <PauseOffscreen className="mt-auto">
            <VoiceConsole />
          </PauseOffscreen>
        </Reveal>
        <Reveal delay={100} className="flex flex-col gap-8 rounded-lg border border-line bg-paper p-6 sm:p-10">
          <ServiceText service={whatsapp} />
          <PauseOffscreen className="mt-auto">
            <ChatConversation showLead={false} />
          </PauseOffscreen>
        </Reveal>
      </div>

      {/* 04 — reversed wide row */}
      <Reveal className="grid grid-cols-1 items-center gap-10 rounded-lg border border-line bg-white p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <BrowserMockups />
        </div>
        <div className="order-1 lg:order-2">
          <ServiceText service={website} points={4} />
        </div>
      </Reveal>

      {/* 05 — navy feature band */}
      <Reveal className="on-navy rounded-lg bg-navy p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <ServiceText service={documents} onNavy points={4} />
          <div className="flex flex-col justify-center">
            <p className="text-eyebrow mb-4 text-[#8fb0ff]">PDFs and images → validated records</p>
            <InvoicePipelineMini onNavy />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
