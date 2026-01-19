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

interface ProcessFormProps {
  processStepId?: string;
}

interface FormDataState {
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export function ProcessForm({ processStepId }: ProcessFormProps) {
  const router = useRouter();
  const isEditing = !!processStepId;
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    icon: "Search",
    order: 0,
    isActive: true,
  });

  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const handleTap = (id: string, duration = 300) => {
    setTappedElement(id);
    window.setTimeout(() => setTappedElement(null), duration);
  };

  const availableIcons = [
    { name: "Search", label: "🔍 Descoberta e Pesquisa" },
    { name: "Lightbulb", label: "💡 Conceito & Estratégia" },
    { name: "Palette", label: "🎨 Design & Planejamento" },
    { name: "Zap", label: "⚡ Execução & Tecnologia" },
    { name: "CheckCircle", label: "✅ Gestão & Qualidade" },
    { name: "Target", label: "🎯 Pós-Evento & Métricas" },
  ];

  // load process step when editing
  const { data: existingProcessStep, isLoading: loadingProcessStep } =
    api.adminProcess.getProcessStepById.useQuery(
      { id: processStepId! },
      {
        enabled: isEditing,
      },
    );

  // mutations
  const createMutation = api.adminProcess.createProcessStep.useMutation();
  const updateMutation = api.adminProcess.updateProcessStep.useMutation();

  const isLoading =
    loadingProcessStep || createMutation.isPending || updateMutation.isPending;

  // seed the form
  useEffect(() => {
    if (existingProcessStep) {
      setFormData({
        title: existingProcessStep.title ?? "",
        description: existingProcessStep.description ?? "",
        icon: existingProcessStep.icon ?? "Search",
        order: existingProcessStep.order ?? 0,
        isActive: !!existingProcessStep.isActive,
      });
    }
  }, [existingProcessStep]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // handlers
  const handleChange = (
    field: keyof FormDataState,
    value: string | boolean | number,
  ) => {
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

  const handleSelectChange =
    (field: keyof FormDataState) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(field, e.target.value);
    };

  // submit validation / mutation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();
    const icon = formData.icon;

    if (!title) {
      alert("Preencha o Título.");
      return;
    }

    if (!description) {
      alert("Preencha a Descrição.");
      return;
    }

    if (!icon) {
      alert("Selecione um Ícone.");
      return;
    }

    const processStepData = {
      title,
      description,
      icon,
      order: formData.order,
      isActive: formData.isActive,
    };

    try {
      if (isEditing && processStepId) {
        await updateMutation.mutateAsync({
          id: processStepId,
          ...processStepData,
        });
      } else {
        await createMutation.mutateAsync(processStepData);
      }

      router.push("/admin/what-we-do/process");
    } catch (error) {
      console.error("Erro ao salvar etapa do processo:", error);
      alert("Erro ao salvar etapa do processo. Tente novamente.");
    }
  };

  if (!mounted || (isEditing && loadingProcessStep)) return <Loading />;

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
              {isEditing
                ? "Editar Etapa do Processo"
                : "Nova Etapa do Processo"}
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              {isEditing
                ? "Atualize as informações da etapa"
                : "Preencha os dados para criar uma nova etapa"}
            </p>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        onClick={() => {
          handleTap("back-button");
          router.push("/admin/what-we-do/process");
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
            Informações da Etapa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* título */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-stone-700 dark:text-stone-300"
              >
                Título da Etapa *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange("title")}
                placeholder="Ex: Descoberta & Análise"
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
                Descrição *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder="Descreva a etapa em detalhes..."
                rows={4}
                required
                className="resize-none border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* icon */}
            <div className="space-y-2">
              <Label
                htmlFor="icon"
                className="text-stone-700 dark:text-stone-300"
              >
                Ícone *
              </Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={handleSelectChange("icon")}
                className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white focus:outline-none dark:border-stone-600 dark:bg-stone-700"
                required
              >
                <option value="">Selecione um ícone...</option>
                {availableIcons.map((iconOption) => (
                  <option key={iconOption.name} value={iconOption.name}>
                    {iconOption.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                O ícone será exibido no card
              </p>
            </div>

            {/* order */}
            <div className="space-y-2">
              <Label
                htmlFor="order"
                className="text-stone-700 dark:text-stone-300"
              >
                Ordem
              </Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  handleChange("order", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Número para ordenar as etapas
              </p>
            </div>

            {/* switch */}
            <div className="border-t border-stone-200 pt-4 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="isActive"
                    className="font-medium text-stone-700 dark:text-stone-300"
                  >
                    Etapa Ativa
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
                onClick={() => router.push("/admin/what-we-do/process")}
                onTouchStart={() => handleTap("cancel")}
                disabled={isLoading}
                className={`${
                  tappedElement === "cancel" ? "scale-95" : ""
                } transition-all duration-300 active:scale-95`}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                onTouchStart={() => handleTap("submit", 1000)}
                className={`flex-1 transition-all duration-300 ${
                  tappedElement === "submit" ? "scale-95" : ""
                } active:scale-95`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Atualizar Etapa" : "Criar Etapa"}
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
