"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useTheme } from "next-themes";

interface EventFormProps {
  eventId?: string;
}
interface FormDataState {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: string;
  isFeatured: boolean;
  isActive: boolean;
}

export function EventForm({ eventId }: EventFormProps) {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const isEditing = !!eventId;

  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    price: "",
    isFeatured: false,
    isActive: true,
  });

  // state to provide tap feedback on touch devices (replicates hover -> tap)
  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const handleTap = (id: string, duration = 300) => {
    setTappedElement(id);
    window.setTimeout(() => setTappedElement(null), duration);
  };

  // search for event if edition
  const { data: existingEvent, isLoading: loadingEvent } =
    api.admin.getAllEvents.useQuery(undefined, {
      enabled: isEditing,
      select: (events) => events.find((event) => event.id === eventId),
    });

  // mutations
  const createMutation = api.admin.createEvent.useMutation();
  const updateMutation = api.admin.updateEvent.useMutation();

  const { theme } = useTheme();

  const isLoading =
    loadingEvent || createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        title: existingEvent.title ?? "",
        description: existingEvent.description ?? "",
        date:
          (existingEvent.date
            ? new Date(existingEvent.date).toISOString().split("T")[0]
            : "") ?? "",
        location: existingEvent.location ?? "",
        image: existingEvent.image ? String(existingEvent.image) : "",
        price: existingEvent.price ? String(existingEvent.price) : "",
        isFeatured: !!existingEvent.isFeatured,
        isActive: !!existingEvent.isActive,
      });
    }
  }, [existingEvent]);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  // handlers
  const handleChange = (
    field: keyof FormDataState,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedDate = new Date(formData.date);
    if (isNaN(parsedDate.getTime())) {
      alert("Selecione uma data válida.");
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: parsedDate,
      location: formData.location,
      image: formData.image || undefined,
      price: formData.price ? Number.parseFloat(formData.price) : undefined,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    try {
      if (isEditing && eventId) {
        await updateMutation.mutateAsync({ id: eventId, ...eventData });
      } else {
        await createMutation.mutateAsync(eventData);
      }

      router.push("/admin/events");
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };

  if (!isLoaded) return <Loading />;
  if (!userId) return <Loading />;

  if (isEditing && loadingEvent) return <Loading />;

  return (
    <div
      className="min-h-screen bg-stone-300 p-6 dark:bg-stone-900"
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {/* header */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              {isEditing ? "Editar Evento" : "Novo Evento"}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {isEditing
                ? "Atualize as informações do evento"
                : "Preencha os dados para criar um novo evento"}
            </p>
          </div>
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => {
          handleTap("back-button");
          router.push("/admin/events");
        }}
        onTouchStart={() => handleTap("back-button")}
        className={`flex items-center gap-2 border transition-all duration-300 ease-in-out ${
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
            Informações do Evento
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
                Título do Evento *
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
                Descrição *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder="Descreva o evento em detalhes..."
                rows={4}
                required
                className="resize-none border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* date / location */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-stone-700 dark:text-stone-300"
                >
                  <Calendar className="mr-2 inline h-4 w-4 text-blue-900 dark:text-blue-700" />
                  Data do Evento *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange("date")}
                  required
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-stone-700 dark:text-stone-300"
                >
                  <MapPin className="text-crusta-500 dark:text-carrot-500 mr-2 inline h-4 w-4" />
                  Localização *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange("location")}
                  placeholder="Ex: São Paulo, SP"
                  required
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>
            </div>

            {/* image / price */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-stone-700 dark:text-stone-300"
                >
                  <ImageIcon className="mr-2 inline h-4 w-4 text-amber-400 dark:text-amber-300" />
                  URL da Imagem
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={handleInputChange("image")}
                  placeholder="/images/evento.jpg"
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  eg: /images/image_services_grid_1.jpg
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-stone-700 dark:text-stone-300"
                >
                  <DollarSign className="mr-2 inline h-4 w-4 text-green-800 dark:text-green-600" />
                  Preço (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange("price")}
                  placeholder="0.00 para gratuito"
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>
            </div>

            {/* switches */}
            <div className="grid grid-cols-1 gap-6 border-t border-stone-200 pt-4 md:grid-cols-2 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="isFeatured"
                    className="font-medium text-stone-700 dark:text-stone-300"
                  >
                    Evento em Destaque
                  </Label>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Aparecerá na seção principal
                  </p>
                </div>
                <div
                  onTouchStart={() => handleTap("isFeatured")}
                  className={tappedElement === "isFeatured" ? "scale-95" : ""}
                >
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={handleSwitchChange("isFeatured")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="isActive"
                    className="font-medium text-stone-700 dark:text-stone-300"
                  >
                    Evento Ativo
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
                onClick={() => router.push("/admin/events")}
                onTouchStart={() => handleTap("cancel")}
                disabled={isLoading}
                className={tappedElement === "cancel" ? "scale-95" : ""}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                onTouchStart={() => handleTap("submit", 1000)}
                className={`flex-1 ${
                  tappedElement === "submit" ? "scale-95" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Atualizar Evento" : "Criar Evento"}
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
