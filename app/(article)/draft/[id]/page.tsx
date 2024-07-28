import { getDraft } from "@/api-handlers/draft";
import { DraftEditor, DraftHeader } from "@/components/Draft";
import { notFound } from "next/navigation";

export default async function DraftArticlePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const draft = await getDraft({ id });

  if (!draft) notFound();

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto border-x dark:border-slate-800 px-6 py-4">
      <DraftHeader />
      <DraftEditor title={draft.title} content={draft.content.markdown} />
    </div>
  );
}
