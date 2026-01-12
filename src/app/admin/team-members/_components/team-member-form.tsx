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
import { Save, ArrowLeft, Loader2, X, Plus } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface TeamMemberFormProps {
  teamMemberId?: string;
}

interface FormDataState {
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
  linkedin: string;
  instagram: string;
  youtube: string;
  email: string;
  yearsExperience: number;
  isActive: boolean;
  order: number;
}

export function TeamMemberForm({ teamMemberId }: TeamMemberFormProps) {
  const router = useRouter();
  const isEditing = !!teamMemberId;
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    role: "",
    image: "",
    description: "",
    expertise: [],
    linkedin: "",
    instagram: "",
    youtube: "",
    email: "",
    yearsExperience: 0,
    isActive: true,
    order: 0,
  });

  const [newExpertise, setNewExpertise] = useState("");
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  const handleTap = (id: string, duration = 300) => {
    setTappedElement(id);
    window.setTimeout(() => setTappedElement(null), duration);
  };

  // load team menbers when editing
  const { data: existingTeamMember, isLoading: loadingTeamMember } =
    api.adminTeamMember.getAllTeamMembers.useQuery(undefined, {
      enabled: isEditing,
      select: (members) => members.find((member) => member.id === teamMemberId),
    });

  // mutations
  const createMutation = api.adminTeamMember.createTeamMember.useMutation();
  const updateMutation = api.adminTeamMember.updateTeamMember.useMutation();

  const isLoading =
    loadingTeamMember || createMutation.isPending || updateMutation.isPending;

  // seed the form
  useEffect(() => {
    if (existingTeamMember) {
      setFormData({
        name: existingTeamMember.name ?? "",
        role: existingTeamMember.role ?? "",
        image: existingTeamMember.image ?? "",
        description: existingTeamMember.description ?? "",
        expertise: existingTeamMember.expertise ?? [],
        linkedin: existingTeamMember.linkedin ?? "",
        instagram: existingTeamMember.instagram ?? "",
        youtube: existingTeamMember.youtube ?? "",
        email: existingTeamMember.email ?? "",
        yearsExperience: existingTeamMember.yearsExperience ?? 0,
        isActive: existingTeamMember.isActive ?? true,
        order: existingTeamMember.order ?? 0,
      });
    }
  }, [existingTeamMember]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // handlers
  const handleChange = (
    field: keyof FormDataState,
    value: string | number | boolean | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }) as FormDataState);
  };

  const handleInputChange =
    (field: keyof FormDataState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "yearsExperience"
          ? parseInt(e.target.value) || 0
          : e.target.value;
      handleChange(field, value);
    };

  const handleSwitchChange =
    (field: keyof FormDataState) => (checked: boolean) => {
      handleChange(field, checked);
    };

  const handleAddExpertise = () => {
    if (
      newExpertise.trim() &&
      !formData.expertise.includes(newExpertise.trim())
    ) {
      handleChange("expertise", [...formData.expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (index: number) => {
    const newExpertise = [...formData.expertise];
    newExpertise.splice(index, 1);
    handleChange("expertise", newExpertise);
  };

  // submit validation / mutation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, role, image, description, yearsExperience } = formData;

    if (!name.trim()) {
      alert("Preencha o Nome.");
      return;
    }

    if (!role.trim()) {
      alert("Preencha o Cargo.");
      return;
    }

    if (!image.trim()) {
      alert("Preencha a Imagem.");
      return;
    }

    if (!description.trim()) {
      alert("Preencha a Descrição.");
      return;
    }

    if (yearsExperience < 0) {
      alert("Anos de experiência não podem ser negativos.");
      return;
    }

    const teamMemberData = {
      name: name.trim(),
      role: role.trim(),
      image: image.trim(),
      description: description.trim(),
      expertise: formData.expertise,
      linkedin: formData.linkedin.trim() || undefined,
      instagram: formData.instagram.trim() || undefined,
      youtube: formData.youtube.trim() || undefined,
      email: formData.email.trim() || undefined,
      yearsExperience,
      isActive: formData.isActive,
      order: formData.order,
    };

    try {
      if (isEditing && teamMemberId) {
        await updateMutation.mutateAsync({
          id: teamMemberId,
          ...teamMemberData,
        });
      } else {
        await createMutation.mutateAsync(teamMemberData);
      }

      router.push("/admin/team-members");
    } catch (error) {
      console.error("Erro ao salvar membro da equipe:", error);
      alert("Erro ao salvar membro da equipe. Tente novamente.");
    }
  };

  if (!mounted || (isEditing && loadingTeamMember)) return <Loading />;

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
              {isEditing ? "Editar Membro da Equipe" : "Novo Membro da Equipe"}
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              {isEditing
                ? "Atualize as informações do membro"
                : "Preencha os dados para adicionar um novo membro"}
            </p>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        onClick={() => {
          handleTap("back-button");
          router.push("/admin/team-members");
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
            Informações do Membro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* name / position */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-stone-700 dark:text-stone-300"
                >
                  Nome *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder="Ex: Juliana Coxa"
                  required
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="role"
                  className="text-stone-700 dark:text-stone-300"
                >
                  Cargo *
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange("role")}
                  placeholder="Ex: Fundadora & CEO"
                  required
                  className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>
            </div>

            {/* image */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-stone-700 dark:text-stone-300"
              >
                Imagem (URL) *
              </Label>
              <ImageUpload
                value={formData.image}
                onChange={(value) => handleChange("image", value)}
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                Use URL (https://...) ou caminho iniciando com /images/...
              </p>
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
                placeholder="Descreva o membro da equipe em detalhes..."
                rows={4}
                required
                className="resize-none border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* XP */}
            <div className="space-y-2">
              <Label
                htmlFor="yearsExperience"
                className="text-stone-700 dark:text-stone-300"
              >
                Anos de Experiência
              </Label>
              <Input
                id="yearsExperience"
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={handleInputChange("yearsExperience")}
                placeholder="0"
                className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
              />
            </div>

            {/* expertise */}
            <div className="space-y-2">
              <Label className="text-stone-700 dark:text-stone-300">
                Especialidades
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  placeholder="Ex: Estratégia Corporativa"
                  className="flex-1 border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddExpertise())
                  }
                />
                <Button
                  type="button"
                  onClick={handleAddExpertise}
                  onTouchStart={() => handleTap("add-expertise")}
                  className={
                    tappedElement === "add-expertise" ? "scale-95" : ""
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.expertise.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.expertise.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-stone-200 px-3 py-1 text-sm dark:bg-stone-700"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(index)}
                        onTouchStart={() => handleTap(`remove-${index}`)}
                        className="rounded-full p-0.5 hover:bg-stone-300 dark:hover:bg-stone-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* social media */}
            <div className="space-y-4">
              <h3 className="font-medium text-stone-700 dark:text-stone-300">
                Redes Sociais (opcionais)
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedin"
                    className="text-stone-700 dark:text-stone-300"
                  >
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange("linkedin")}
                    placeholder="https://linkedin.com/in/..."
                    className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="instagram"
                    className="text-stone-700 dark:text-stone-300"
                  >
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange("instagram")}
                    placeholder="https://instagram.com/..."
                    className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="youtube"
                    className="text-stone-700 dark:text-stone-300"
                  >
                    YouTube
                  </Label>
                  <Input
                    id="youtube"
                    value={formData.youtube}
                    onChange={handleInputChange("youtube")}
                    placeholder="https://youtube.com/@..."
                    className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-stone-700 dark:text-stone-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    placeholder="membro@coxaeventos.com"
                    className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
                  />
                </div>
              </div>
            </div>

            {/* status */}
            <div className="border-t border-stone-200 pt-4 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="isActive"
                    className="font-medium text-stone-700 dark:text-stone-300"
                  >
                    Membro Ativo
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
                onClick={() => router.push("/admin/team-members")}
                onTouchStart={() => handleTap("cancel")}
                disabled={isLoading}
                className={`${tappedElement === "cancel" ? "scale-95" : ""} transition-all duration-300 active:scale-95`}
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
                    {isEditing ? "Atualizar Membro" : "Criar Membro"}
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
