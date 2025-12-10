import { Reveal } from "./Reveal";

type SectionHeaderProps = {
    eyebrow?: string;
    title: string;
    copy?: string;
    align?: "left" | "center";
};

export function SectionHeader({
    eyebrow,
    title,
    copy,
    align = "left",
}: SectionHeaderProps) {
    const alignment =
        align === "center"
            ? "mx-auto text-center items-center"
            : "text-left items-start";

    return (
        <Reveal>
            <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
                {eyebrow ? (
                    <span className="pill text-xs font-semibold uppercase tracking-[0.16em] text-slate-900">
                        {eyebrow}
                    </span>
                ) : null}
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    {title}
                </h2>
                {copy ? <p className="text-base text-slate-500">{copy}</p> : null}
            </div>
        </Reveal>
    );
}

