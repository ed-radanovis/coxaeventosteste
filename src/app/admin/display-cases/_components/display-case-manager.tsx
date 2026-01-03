"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Video,
  Youtube,
  ArrowLeft,
  GripVertical,
  GripHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DisplayCaseItem {
  id: string;
  title: string;
  image: string;
  href: string;
  type: string;
  description?: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// component sortable item
function SortableDisplayCaseItem({
  item,
  onDelete,
  onToggleActive,
  onEdit,
  onTap,
  tappedElement,
}: {
  item: DisplayCaseItem;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentActive: boolean) => void;
  onEdit: (id: string) => void;
  onTap: (elementId: string) => void;
  tappedElement: string | null;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-900 dark:text-red-500" />;
      case "video":
        return <Video className="h-4 w-4 text-blue-900 dark:text-blue-500" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return "YouTube";
      case "video":
        return "Vídeo";
      default:
        return type;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border border-stone-200 bg-stone-100 py-2 transition-all duration-300 hover:shadow-lg md:py-4 dark:border-stone-700 dark:bg-stone-700/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            {/* drag handle */}
            <div
              {...attributes}
              {...listeners}
              className="flex cursor-grab touch-none items-center justify-center text-stone-400 active:cursor-grabbing sm:justify-start"
            >
              <GripVertical className="hidden h-8 w-8 sm:block" />
              <GripHorizontal className="h-8 w-8 sm:hidden" />
            </div>

            {/* information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-3 text-center text-lg font-semibold break-words text-stone-900 md:text-start dark:text-stone-100">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mb-2 text-sm break-words text-stone-600 dark:text-stone-400">
                      {item.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      {getTypeText(item.type)}
                    </span>
                    <span>Ordem: {item.order}</span>
                    <span>
                      Criado em: {item.createdAt.toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* status / actions */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-end">
              {/* badges */}
              <div className="flex flex-wrap justify-center sm:justify-start">
                <Badge
                  className={
                    item.isActive
                      ? "border-green-900 bg-green-200 text-green-900 dark:border-green-300 dark:bg-green-900 dark:text-green-300"
                      : "dark:bg-persian-800 text-persian-800 border-persian-800 bg-persian-100 dark:text-persian-200 dark:border-persian-200"
                  }
                >
                  {item.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              {/* CTA buttons */}
              <div className="flex items-center justify-center gap-10 sm:justify-start md:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleActive(item.id, item.isActive)}
                  onTouchStart={() => onTap(`active-${item.id}`)}
                  className={`transition-all duration-200 ease-in-out ${
                    tappedElement === `active-${item.id}`
                      ? "scale-95"
                      : "hover:scale-110"
                  }`}
                >
                  {item.isActive ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item.id)}
                  onTouchStart={() => onTap(`edit-${item.id}`)}
                  className={`transition-all duration-200 ease-in-out ${
                    tappedElement === `edit-${item.id}`
                      ? "scale-95"
                      : "hover:scale-110"
                  }`}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                  onTouchStart={() => onTap(`delete-${item.id}`)}
                  className={`text-persian-400 hover:bg-persian-500/20 hover:text-persian-500 dark:text-cerise-600 transition-all duration-200 ease-in-out dark:hover:bg-red-900/20 ${
                    tappedElement === `delete-${item.id}`
                      ? "scale-95"
                      : "hover:scale-110"
                  }`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DisplayCaseManager() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  // get all displaycases from the DB
  const {
    data: displayCases,
    isLoading,
    refetch,
  } = api.adminDisplayCase.getAllDisplayCases.useQuery();

  // mutation to reorder
  const reorderMutation = api.adminDisplayCase.reorderDisplayCases.useMutation({
    onSuccess: () => refetch(),
  });

  // other mutations
  const deleteMutation = api.adminDisplayCase.deleteDisplayCase.useMutation({
    onSuccess: () => refetch(),
  });

  const toggleActiveMutation =
    api.adminDisplayCase.toggleDisplayCase.useMutation({
      onSuccess: () => refetch(),
    });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // handler stops when the drag ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !displayCases) return;

    const oldIndex = displayCases.findIndex((item) => item.id === active.id);
    const newIndex = displayCases.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // reorder locally
    const reorderedItems = arrayMove(displayCases, oldIndex, newIndex);

    // update order DB
    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    reorderMutation.mutate(updates);
  };

  const filteredDisplayCases = displayCases?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // handlers
  const handleDeleteDisplayCase = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este showcase?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    toggleActiveMutation.mutate({
      id,
      isActive: !currentActive,
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/display-cases/${id}`);
  };

  if (!mounted || isLoading) return <Loading />;

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
              Gerenciar Vitrines
            </h1>
            <div className="my-3 flex flex-col items-center justify-center text-sm text-stone-600 md:flex-row md:justify-start dark:text-stone-400">
              <p>Arraste para reordenar &nbsp;•&nbsp;</p>
              <p>Clique para editar ou excluir</p>
            </div>
          </div>
          <div
            onTouchStart={() => handleTap("user-button")}
            className={`mx-auto mt-2 flex w-fit justify-center rounded-sm border px-2 py-1 transition-all duration-200 ease-in-out md:mx-0 md:mr-40 ${
              tappedElement === "user-button"
                ? "scale-95 border-stone-400"
                : theme === "dark"
                  ? "hover:border-persian-500 border-stone-600 bg-stone-800 hover:scale-102"
                  : "hover:border-crusta-500 border-stone-400 bg-stone-200 hover:scale-102"
            }`}
          >
            <UserButton
              showName
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7 md:w-10 md:h-10",
                  userButtonBox:
                    "flex flex-col-reverse items-center text-muted-foreground",
                  userButtonOuterIdentifier: "text-xm md:text-base",
                  userButtonPopoverActionButton:
                    "dark:text-stone-300 dark:hover:text-yellow-400",
                  userButtonPopoverActionButtonIcon: "dark:text-stone-400",
                },
              }}
            />
          </div>
          <Button
            onClick={() => {
              handleTap("new-display-case");
              router.push("/admin/display-cases/new");
            }}
            onTouchStart={() => handleTap("new-display-case")}
            className={`mt-4 border transition-all duration-300 ease-in-out md:mt-0 ${
              tappedElement === "new-display-case"
                ? "scale-95"
                : theme === "dark"
                  ? "bg-stone-600/60 text-stone-400 hover:scale-102 hover:bg-stone-600"
                  : "border-stone-400 bg-stone-100/80 text-stone-500 hover:scale-102 hover:bg-stone-100"
            }`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Vitrine
          </Button>
        </div>
      </div>

      <div className="my-6">
        <Button
          size="sm"
          onClick={() => {
            handleTap("back-button");
            router.push("/admin");
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
          Voltar ao Dashboard
        </Button>
      </div>

      {/* search bar / statistics */}
      <Card className="mb-6 border border-stone-200 bg-stone-200 dark:border-stone-700 dark:bg-stone-800/80">
        <CardContent className="px-4 py-2 md:px-6 md:py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Buscar Vitrines por título ou descrição..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border-stone-200 bg-stone-50 pl-8 text-xs md:text-base dark:border-stone-600 dark:bg-stone-700/50"
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-20 text-sm text-stone-600 md:gap-4 dark:text-stone-400">
              <span>Total: {displayCases?.length ?? 0}</span>
              <span>
                Ativos: {displayCases?.filter((e) => e.isActive).length ?? 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* list of displaycases */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={displayCases?.map((item) => item.id) ?? []}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {filteredDisplayCases && filteredDisplayCases.length > 0 ? (
              filteredDisplayCases.map((item) => (
                <SortableDisplayCaseItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteDisplayCase}
                  onToggleActive={handleToggleActive}
                  onEdit={handleEdit}
                  onTap={handleTap}
                  tappedElement={tappedElement}
                />
              ))
            ) : (
              <Card className="border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800">
                <CardContent className="p-12 text-center">
                  <Video className="mx-auto mb-4 h-16 w-16 text-stone-400" />
                  <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Nenhuma Vitrine encontrada
                  </h3>
                  <p className="mb-6 text-stone-600 dark:text-stone-400">
                    {searchTerm
                      ? "Tente ajustar os termos da busca."
                      : "Comece criando seu primeiro showcase."}
                  </p>
                  <Button
                    onClick={() => router.push("/admin/display-cases/new")}
                    onTouchStart={() => handleTap("create-first")}
                    className={
                      tappedElement === "create-first" ? "scale-95" : ""
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeira Vitrine
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
