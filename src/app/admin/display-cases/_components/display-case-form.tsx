"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { VideoUpload } from "@/components/ui/video-upload";

interface DisplayCaseFormProps {
  displayCaseId?: string;
}

type DisplayCaseType = "video" | "youtube";

interface FormDataState {
  title: string;
  image: string; // url or relative path ("/images/..")
  href: string; // video url (embed or file)
  type: DisplayCaseType;
  description: string;
  isActive: boolean;
}

export function DisplayCaseForm({ displayCaseId }: DisplayCaseFormProps) {
  const router = useRouter();
  const isEditing = !!displayCaseId;
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    image: "",
    href: "",
    type: "video",
    description: "",
    isActive: true,
  });

  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const handleTap = (id: string, duration = 300) => {
    setTappedElement(id);
    window.setTimeout(() => setTappedElement(null), duration);
  };

  // load displaycase when editing
  const { data: existingDisplayCase, isLoading: loadingDisplayCase } =
    api.adminDisplayCase.getAllDisplayCases.useQuery(undefined, {
      enabled: isEditing,
      select: (displayCases) =>
        displayCases.find((dc) => dc.id === displayCaseId),
    });

  // mutations
  const createMutation = api.adminDisplayCase.createDisplayCase.useMutation();
  const updateMutation = api.adminDisplayCase.updateDisplayCase.useMutation();

  const isLoading =
    loadingDisplayCase || createMutation.isPending || updateMutation.isPending;

  // seed the form
  useEffect(() => {
    if (existingDisplayCase) {
      setFormData({
        title: existingDisplayCase.title ?? "",
        image: existingDisplayCase.image ?? "",
        href: existingDisplayCase.href ?? "",
        type:
          (existingDisplayCase.type?.toLowerCase() as DisplayCaseType) ??
          "video",
        description: existingDisplayCase.description ?? "",
        isActive: !!existingDisplayCase.isActive,
      });
    }
  }, [existingDisplayCase]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // helpers validation / detection
  const isAbsoluteUrl = (value: string) => {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isValidImageSrc = (value: string) => {
    if (!value) return false;
    if (value.startsWith("/")) return true;
    return isAbsoluteUrl(value);
  };

  const isValidVideoSrc = (value: string) => {
    if (!value) return false;
    if (value.startsWith("/")) return true;
    if (isAbsoluteUrl(value)) return true;
    return false;
  };

  // extract ID from YT - returns embed URL or null
  const getYouTubeEmbed = (value: string): string | null => {
    if (!value) return null;

    if (value.includes("youtube.com/embed/")) {
      try {
        const u = new URL(value);
        const path = u.pathname; // /embed/ID
        const parts = path.split("/");
        const id = parts[parts.length - 1];
        if (id) return `https://www.youtube.com/embed/${id}`;
      } catch {}
    }

    try {
      const u = isAbsoluteUrl(value) ? new URL(value) : null;
      if (u) {
        const hostname = u.hostname.toLowerCase();
        if (hostname.includes("youtube.com")) {
          if (u.searchParams.has("v")) {
            const id = u.searchParams.get("v");
            if (id) return `https://www.youtube.com/embed/${id}`;
          }
          const shortMatch = /^\/(shorts)\/([^/]+)/.exec(u.pathname);
          if (shortMatch?.[2]) {
            return `https://www.youtube.com/embed/${shortMatch[2]}`;
          }
        }

        if (hostname.includes("youtu.be")) {
          const id = u.pathname.replace("/", "");
          if (id) return `https://www.youtube.com/embed/${id}`;
        }
      } else {
        const ytbMatch =
          /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/.exec(
            value,
          );
        if (ytbMatch?.[1]) {
          return `https://www.youtube.com/embed/${ytbMatch[1]}`;
        }
      }
    } catch {}
    return null;
  };

  // normalize incoming href - if YT convert and set type
  const normalizeAndDetectTypeForHref = (raw: string) => {
    const trimmed = raw.trim();
    const yt = getYouTubeEmbed(trimmed);
    if (yt) {
      return { href: yt, type: "youtube" as DisplayCaseType };
    }

    // keep default video
    return { href: trimmed, type: "video" as DisplayCaseType };
  };

  // normalize image -  if upload will be absolute url /  if user typed relative keep it
  const normalizeImage = (raw: string) => raw.trim();

  // handlers
  const handleChange = (
    field: keyof FormDataState,
    value: string | boolean,
  ) => {
    if (field === "href" && typeof value === "string") {
      const { href, type } = normalizeAndDetectTypeForHref(value);
      setFormData((prev) => ({ ...prev, href, type }));
      return;
    }

    if (field === "image" && typeof value === "string") {
      setFormData((prev) => ({ ...prev, image: normalizeImage(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }) as FormDataState);
  };

  const handleInputChange =
    (field: keyof FormDataState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleChange(field, e.target.value);
    };

  const handleSwitchChange =
    (field: keyof FormDataState) => (checked: boolean) => {
      handleChange(field, checked);
    };

  // submit validation / mutation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = formData.title.trim();
    const image = String(formData.image ?? "").trim();
    let href = String(formData.href ?? "").trim();
    let type: DisplayCaseType = formData.type;

    if (!title) {
      alert("Preencha o Título.");
      return;
    }

    // normalize href and type again
    const normalized = normalizeAndDetectTypeForHref(href);
    href = normalized.href;
    type = normalized.type;

    if (!isValidImageSrc(image)) {
      alert(
        "Preencha a Imagem corretamente. Use uma URL (http/https) ou caminho começado em '/'.",
      );
      return;
    }

    if (!isValidVideoSrc(href)) {
      alert(
        "Preencha a URL do Vídeo corretamente. Use:\n- Para YouTube: link do YouTube (será convertido automaticamente para embed)\n- Para vídeos locais: /videos/arquivo.mp4\n- Ou URL absoluta (http/https).",
      );
      return;
    }

    const displayCaseData = {
      title,
      image,
      href,
      type,
      description: formData.description || undefined,
      isActive: formData.isActive,
    };

    try {
      if (isEditing && displayCaseId) {
        await updateMutation.mutateAsync({
          id: displayCaseId,
          ...displayCaseData,
        });
      } else {
        await createMutation.mutateAsync(displayCaseData);
      }

      router.push("/admin/display-cases");
    } catch (error) {
      console.error("Erro ao salvar vitrine:", error);
      alert("Erro ao salvar vitrine. Tente novamente.");
    }
  };

  if (!mounted || (isEditing && loadingDisplayCase)) return <Loading />;

  return (
    <div
      className="min-h-screen bg-stone-300 p-6 dark:bg-stone-900"
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {/* header */}
      <div className="mb-4">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="flex justify-center text-3xl font-bold text-stone-900 md:justify-start dark:text-stone-100">
              {isEditing ? "Editar Vitrine" : "Nova Vitrine"}
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              {isEditing
                ? "Atualize as informações da Vitrine"
                : "Preencha os dados para criar uma nova Vitrine"}
            </p>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        onClick={() => {
          handleTap("back-button");
          router.push("/admin/display-cases");
        }}
        onTouchStart={() => handleTap("back-button")}
        className={`mb-6 flex items-center gap-2 border transition-all duration-300 ease-in-out ${
          tappedElement === "back-button"
            ? "scale-98"
            : theme === "dark"
              ? "bg-stone-600/60 text-stone-400 hover:scale-102 hover:bg-stone-600"
              : "border-stone-400 bg-stone-100/80 text-stone-500 hover:scale-102 hover:bg-stone-100"
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao gerenciamento
      </Button>

      {/* form */}
      <Card className="mx-auto max-w-4xl border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800">
        <CardHeader>
          <CardTitle className="text-stone-900 dark:text-stone-100">
            Informações da Vitrine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-stone-700 dark:text-stone-300"
              >
                Título da Vitrine *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange("title")}
                placeholder="Ex: Festival de Música Verão 2024"
                required
                className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-stone-700 dark:text-stone-300"
              >
                Descrição
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder="Descreva a Vitrine em detalhes..."
                rows={3}
                className="resize-none border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* image */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <ImageUpload
                  value={formData.image}
                  onChange={(value) => handleChange("image", value)}
                  disabled={isLoading}
                />
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  Use URL (https://...) ou caminho iniciando com /images/...
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="type"
                  className="text-stone-700 dark:text-stone-300"
                >
                  Tipo de Vídeo
                </Label>

                <select
                  id="type"
                  value={formData.type}
                  onChange={() => {
                    /* read-only; manual editing not allowed. */
                  }}
                  disabled
                  className="flex h-10 w-full cursor-not-allowed rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white focus:outline-none dark:border-stone-600 dark:bg-stone-700"
                >
                  <option value="video">
                    🎥 &nbsp;&nbsp; Vídeo Local - MP4{" "}
                  </option>
                  <option value="youtube">🔴▶ &nbsp;&nbsp; YouTube</option>
                </select>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Definição de tipo automática YouTube ou Vídeo.
                </p>
              </div>
            </div>

            {/* video */}
            <div>
              <VideoUpload
                value={formData.href}
                onChange={(value) => handleChange("href", value)}
                disabled={isLoading}
              />
              <div className="my-2 flex flex-col items-center justify-center text-xs text-stone-600 md:flex-row md:justify-start dark:text-stone-400">
                <p className="text-justify tracking-widest md:tracking-normal">
                  Para links (ex: https://youtu.be/ID ou
                  https://www.youtube.com/watch?v=ID) &nbsp;
                </p>
                <p>❗ &nbsp;Conversão automática para EMBED.</p>
              </div>
            </div>

            {/* switch */}
            <div className="border-t border-stone-200 pt-4 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="isActive"
                    className="font-medium text-stone-700 dark:text-stone-300"
                  >
                    Vitrine Ativa
                  </Label>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Visível no site
                  </p>
                </div>
                <div
                  onTouchStart={() => handleTap("isActive")}
                  className={tappedElement === "isActive" ? "scale-95" : ""}
                >
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={handleSwitchChange("isActive")}
                  />
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row dark:border-stone-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/display-cases")}
                onTouchStart={() => handleTap("cancel")}
                disabled={isLoading}
                className={`$ {tappedElement === "cancel" ? "scale-95" : ""} transition-all duration-300 active:scale-95`}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                onTouchStart={() => handleTap("submit", 1000)}
                className={`flex-1 transition-all duration-300 ${tappedElement === "submit" ? "scale-95" : ""} active:scale-95`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Atualizar Vitrine" : "Criar Vitrine"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
