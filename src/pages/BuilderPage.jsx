import WebsitePreview from "@/components/adventure/WebsitePreview";
import Teki from "@/components/teki/Teki";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAdventureStore } from "@/stores/adventureStore";
import { useProgressStore } from "@/stores/progressStore";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function BuilderPage() {
  const navigate = useNavigate();
  const isUnlocked = useProgressStore((s) => s.isBuilderUnlocked("website"));
  const adventure = useAdventureStore();

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-app flex flex-col items-center justify-center p-6 text-center">
        <span className="text-7xl mb-4">🔒</span>
        <h2 className="text-2xl font-black text-ink mb-2">Builder Locked</h2>
        <p className="text-muted mb-6 max-w-sm text-base">
          Complete the Website Adventure first to unlock the free-form builder!
        </p>
        <Button
          variant="solid"
          color="blue"
          onClick={() => navigate({ to: "/adventure" })}
        >
          Go to Website Adventure
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-app">
      {/* Nav */}
      <header
        className="border-b-2 shrink-0"
        style={{
          backgroundColor: "var(--app-surface)",
          borderColor: "var(--app-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            icon={<ArrowLeft size={14} />}
            onClick={() => navigate({ to: "/dashboard" })}
          >
            Dashboard
          </Button>
          <span className="font-bold text-ink text-base">Website Builder</span>
          <span
            className="text-sm rounded-full px-2 py-0.5 font-semibold"
            style={{
              background: "rgba(74,222,128,0.15)",
              color: "#4ade80",
              border: "2px solid var(--app-border)",
            }}
          >
            Free Mode
          </span>
          <div className="flex-1" />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* Preview */}
        <div
          className="flex-1 border-r-2"
          style={{ borderColor: "var(--app-border)" }}
        >
          <WebsitePreview />
        </div>

        {/* Control panel */}
        <div
          className="w-72 overflow-y-auto p-4 flex flex-col gap-4"
          style={{ backgroundColor: "var(--app-surface)" }}
        >
          <h3 className="font-bold text-ink text-base">Site Settings</h3>

          <div className="flex flex-col gap-3">
            <Input
              label="Site Name"
              value={adventure.website.name}
              onChange={(e) => adventure.setWebsiteName(e.target.value)}
              placeholder="My Website"
            />

            <div>
              <label
                className="text-sm font-semibold block mb-1"
                style={{ color: "var(--ink-muted)" }}
              >
                Primary Color
              </label>
              <input
                type="color"
                value={adventure.website.color}
                onChange={(e) => adventure.setWebsiteColor(e.target.value)}
                className="h-10 w-full rounded-xl cursor-pointer p-0.5"
                style={{
                  border: "2px solid var(--app-border)",
                  backgroundColor: "var(--app-raised)",
                }}
              />
            </div>
          </div>

          <hr style={{ borderColor: "var(--app-border)" }} />

          <div>
            <h4 className="section-label mb-2">Header</h4>
            <Input
              label="Title"
              value={adventure.website.sections.header.content.title}
              onChange={(e) =>
                adventure.updateSection("header", { title: e.target.value })
              }
              placeholder="My Website"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="section-label">Hero</h4>
            <Input
              label="Headline"
              value={adventure.website.sections.hero.content.headline}
              onChange={(e) =>
                adventure.updateSection("hero", { headline: e.target.value })
              }
              placeholder="Welcome!"
            />
            <Input
              label="Subtext"
              value={adventure.website.sections.hero.content.subtext}
              onChange={(e) =>
                adventure.updateSection("hero", { subtext: e.target.value })
              }
              placeholder="Short description"
            />
            <Input
              label="Button Text"
              value={adventure.website.sections.hero.content.buttonText}
              onChange={(e) =>
                adventure.updateSection("hero", { buttonText: e.target.value })
              }
              placeholder="Explore"
            />
          </div>

          <div>
            <h4 className="section-label mb-2">Footer</h4>
            <Input
              label="Copyright"
              value={adventure.website.sections.footer.content.copyright}
              onChange={(e) =>
                adventure.updateSection("footer", { copyright: e.target.value })
              }
              placeholder="© 2024 My Website"
            />
          </div>
        </div>
      </div>

      <Teki />
    </div>
  );
}
