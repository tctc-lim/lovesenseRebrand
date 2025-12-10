import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getServiceBySlug, services } from "@/lib/services";

type ServicePageProps = {
    params: { slug: string };
};

export async function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const service = getServiceBySlug(params.slug);

    if (!service) {
        return {
            title: "Service not found",
            description: "The requested service could not be found.",
        };
    }

    return {
        title: `${service.name} | LoveSense Studio`,
        description: service.summary,
        keywords: service.keywords,
    };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
    const service = getServiceBySlug(params.slug);

    if (!service) return notFound();

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
            <section className="section">
                <Reveal>
                    <div className="card relative overflow-hidden p-8 sm:p-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-400/10 to-transparent" />
                        <div className="relative flex flex-col gap-4">
                            <span className="pill w-fit text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                                {service.category}
                            </span>
                            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                                {service.name}
                            </h1>
                            <p className="max-w-3xl text-lg text-slate-200">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                                <span className="pill">Duration: {service.duration}</span>
                                <span className="pill">Investment: {service.investment}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link href="/booking" className="button button-primary">
                                    Book this service
                                </Link>
                                <Link href="/contact" className="button button-ghost">
                                    Ask a question
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="section">
                <SectionHeader
                    eyebrow="What you get"
                    title="Highlights and deliverables"
                    copy="We make sure every engagement ships with clear artifacts your team can rely on."
                />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Reveal>
                        <div className="card h-full p-6">
                            <h3 className="text-lg font-semibold text-white">Highlights</h3>
                            <ul className="mt-3 space-y-3 text-sm text-slate-200">
                                {service.highlights.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                                    >
                                        <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[#662d91] to-[#9d6adf]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div className="card h-full p-6">
                            <h3 className="text-lg font-semibold text-white">Deliverables</h3>
                            <ul className="mt-3 space-y-3 text-sm text-slate-200">
                                {service.deliverables.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                                    >
                                        <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[#662d91] to-[#9d6adf]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="section">
                <div className="section-narrow rounded-3xl border border-white/10 bg-black/40 p-10">
                    <Reveal>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-2xl">
                                <p className="pill w-fit text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                                    Ready to move
                                </p>
                                <h3 className="mt-3 text-3xl font-semibold text-white">
                                    Book {service.name} and we start within a week.
                                </h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Well confirm scope, timelines, and deliverables in the first call. No
                                    fluff—just clear next steps.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href="/booking" className="button button-primary">
                                    Lock in a slot
                                </Link>
                                <Link href="/contact" className="button button-ghost">
                                    Talk with us
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

