import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Service } from "@/lib/services";

type Props = {
    service: Service;
};

export function ServiceCard({ service }: Props) {
    return (
        <Reveal>
            <div className="card relative flex h-full flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                    <span className="pill text-xs font-semibold uppercase tracking-wide text-indigo-200">
                        {service.category}
                    </span>
                    <span className="text-xs text-slate-400">
                        {service.duration || "4–8 weeks"}
                    </span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{service.name}</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                    {service.summary}
                </p>
                <ul className="grid grid-cols-1 gap-2 text-sm text-slate-200">
                    {service.highlights.slice(0, 3).map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                        >
                            <span className="mt-[2px] h-2 w-2 rounded-full bg-gradient-to-r from-[#662d91] to-[#9d6adf]" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-4 text-sm text-indigo-100">
                    <span className="font-semibold">From {service.investment}</span>
                    <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-900 shadow-md shadow-indigo-500/20 transition hover:-translate-y-[1px]"
                    >
                        View service
                        <span aria-hidden>→</span>
                    </Link>
                </div>
            </div>
        </Reveal>
    );
}

