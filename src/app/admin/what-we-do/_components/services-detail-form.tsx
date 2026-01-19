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
import { Save, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface ServicesDetailFormProps {
  serviceDetailId?: string;
}

interface FormDataState {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  bgImage: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export function ServicesDetailForm({
  serviceDetailId,
}: ServicesDetailFormProps) {
  const router = useRouter();
  const isEditing = !!serviceDetailId;
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    detailedDescription: "",
    features: [""],
    bgImage: "",
    iconName: "Video",
    order: 0,
    isActive: true,
  });

  const [newFeature, setNewFeature] = useState("");

  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const handleTap = (id: string, duration = 300) => {
    setTappedElement(id);
    window.setTimeout(() => setTappedElement(null), duration);
  };

  const availableIcons = [
    { name: "Video", label: "🎥 Vídeo & Streaming" },
    { name: "Users", label: "👥 Gestão de Público" },
    { name: "Mic", label: "🎤 Sonorização & Palco" },
    { name: "Camera", label: "📷 Iluminação & Efeitos" },
    { name: "Palette", label: "🎨 Design & Cenografia" },
    { name: "Zap", label: "⚡ Tecnologia & Inovação" },
    { name: "Globe", label: "🌐 Eventos Híbridos" },
    { name: "BarChart", label: "📊 Análise & Métricas" },
  ];

  // load service detail when editing
  const { data: existingServiceDetail, isLoading: loadingServiceDetail } =
    api.adminServiceDetail.getServiceDetailById.useQuery(
      { id: serviceDetailId! },
      {
        enabled: isEditing,
      },
    );

  // mutations
  const createMutation =
    api.adminServiceDetail.createServiceDetail.useMutation();
  const updateMutation =
    api.adminServiceDetail.updateServiceDetail.useMutation();

  const isLoading =
    loadingServiceDetail ||
    createMutation.isPending ||
    updateMutation.isPending;

  // seed the form
  useEffect(() => {
    if (existingServiceDetail) {
      setFormData({
        title: existingServiceDetail.title ?? "",
        description: existingServiceDetail.description ?? "",
        detailedDescription: existingServiceDetail.detailedDescription ?? "",
        features: existingServiceDetail.features?.length
          ? existingServiceDetail.features
          : [""],
        bgImage: existingServiceDetail.bgImage ?? "",
        iconName: existingServiceDetail.iconName ?? "Video",
        order: existingServiceDetail.order ?? 0,
        isActive: !!existingServiceDetail.isActive,
      });
    }
  }, [existingServiceDetail]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // handlers for features
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature,
      ),
    }));
  };

  // general handlers
  const handleChange = (
    field: keyof FormDataState,
    value: string | boolean | number | string[],
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
    const detailedDescription = formData.detailedDescription.trim();
    const features = formData.features.filter((feature) => feature.trim());
    const bgImage = formData.bgImage.trim();
    const iconName = formData.iconName;

    if (!title) {
      alert("Preencha o Título.");
      return;
    }

    if (!description) {
      alert("Preencha a Descrição curta.");
      return;
    }

    if (!detailedDescription) {
      alert("Preencha a Descrição detalhada.");
      return;
    }

    if (features.length === 0) {
      alert("Adicione pelo menos uma feature.");
      return;
    }

    if (!bgImage) {
      alert("Adicione uma Imagem de fundo.");
      return;
    }

    if (!iconName) {
      alert("Selecione um Ícone.");
      return;
    }

    const serviceDetailData = {
      title,
      description,
      detailedDescription,
      features,
      bgImage,
      iconName,
      order: formData.order,
      isActive: formData.isActive,
    };

    try {
      if (isEditing && serviceDetailId) {
        await updateMutation.mutateAsync({
          id: serviceDetailId,
          ...serviceDetailData,
        });
      } else {
        await createMutation.mutateAsync(serviceDetailData);
      }

      router.push("/admin/what-we-do/services-detail");
    } catch (error) {
      console.error("Erro ao salvar especialidades:", error);
      alert("Erro ao salvar especialidades. Tente novamente.");
    }
  };

  if (!mounted || (isEditing && loadingServiceDetail)) return <Loading />;

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
              {isEditing ? "Editar especialidades" : "Novo especialidades"}
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              {isEditing
                ? "Atualize as informações da especialidade"
                : "Preencha os dados para criar uma nova especialidade"}
            </p>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        onClick={() => {
          handleTap("back-button");
          router.push("/admin/what-we-do/services-detail");
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
            Informações da Especialidade
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
                Título da Especialidade *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange("title")}
                placeholder="Ex: Produção de Vídeo & Streaming"
                required
                className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* short description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-stone-700 dark:text-stone-300"
              >
                Descrição Curta *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder="Breve descrição que aparece no card fechado..."
                rows={2}
                required
                className="resize-none border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* detailed description */}
            <div className="space-y-2">
              <Label
                htmlFor="detailedDescription"
                className="text-stone-700 dark:text-stone-300"
              >
                Descrição Detalhada *
              </Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange("detailedDescription")}
                placeholder="Descrição completa que aparece quando o card é expandido..."
                rows={5}
                required
                className="resize-y border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* features */}
            <div className="space-y-2">
              <Label className="text-stone-700 dark:text-stone-300">
                Features *
              </Label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleUpdateFeature(index, e.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nova feature..."
                    className="flex-1 border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddFeature}
                    size="sm"
                    className="bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Adicione as features que aparecem como lista no card expandido
              </p>
            </div>

            {/* image */}
            <div className="space-y-2">
              <Label
                htmlFor="bgImage"
                className="text-stone-700 dark:text-stone-300"
              >
                Imagem de Fundo *
              </Label>
              <ImageUpload
                value={formData.bgImage}
                onChange={(value) => handleChange("bgImage", value)}
                disabled={isLoading}
              />
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Use URL (https://...) ou caminho iniciando com /images/...
              </p>
            </div>

            {/* icon */}
            <div className="space-y-2">
              <Label
                htmlFor="iconName"
                className="text-stone-700 dark:text-stone-300"
              >
                Ícone *
              </Label>
              <select
                id="iconName"
                value={formData.iconName}
                onChange={handleSelectChange("iconName")}
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
                Número para ordenar as especialidades
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
                    Especialidade Ativa
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
                onClick={() => router.push("/admin/what-we-do/services-detail")}
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
                    {isEditing
                      ? "Atualizar Especialidade"
                      : "Criar Especialidade"}
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
