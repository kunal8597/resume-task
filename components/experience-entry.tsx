"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import type { ExperienceEntry as ExperienceEntryType } from "@/lib/types";

interface ExperienceEntryProps {
  entry: ExperienceEntryType;
  onUpdate: (entry: ExperienceEntryType) => void;
  onDelete: (id: string) => void;
}

export function ExperienceEntry({ entry, onUpdate, onDelete }: ExperienceEntryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleInputChange = (
    field: keyof ExperienceEntryType,
    value: string | boolean
  ) => {
    onUpdate({
      ...entry,
      [field]: value,
      ...(field === "currentlyWorkHere" && value
        ? { endDate: null }
        : {}),
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {entry.companyName || "New Experience"}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(entry.id)}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor={`company-${entry.id}`} className="text-sm font-medium">Company Name</Label>
              <Input
                id={`company-${entry.id}`}
                value={entry.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="mt-1"
                placeholder="e.g. Apple"
              />
            </div>
            <div>
              <Label htmlFor={`title-${entry.id}`} className="text-sm font-medium">Job Title</Label>
              <Input
                id={`title-${entry.id}`}
                value={entry.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className="mt-1"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`location-${entry.id}`} className="text-sm font-medium">Location</Label>
                <Input
                  id={`location-${entry.id}`}
                  value={entry.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="mt-1"
                  placeholder="e.g. San Francisco"
                />
              </div>
              <div>
                <Label htmlFor={`country-${entry.id}`} className="text-sm font-medium">Country</Label>
                <Input
                  id={`country-${entry.id}`}
                  value={entry.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="mt-1"
                  placeholder="e.g. United States"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`start-date-${entry.id}`} className="text-sm font-medium">Start Date</Label>
                <div className="relative mt-1">
                  <Input
                    id={`start-date-${entry.id}`}
                    type="text"
                    value={entry.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                  {entry.startDate && (
                    <button
                      onClick={() => handleInputChange("startDate", "")}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor={`end-date-${entry.id}`} className="text-sm font-medium">End Date</Label>
                <div className="relative mt-1">
                  <Input
                    id={`end-date-${entry.id}`}
                    type="text"
                    value={entry.endDate || ""}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    placeholder="MM/YYYY"
                    disabled={entry.currentlyWorkHere}
                  />
                  {entry.endDate && !entry.currentlyWorkHere && (
                    <button
                      onClick={() => handleInputChange("endDate", "")}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${entry.id}`}
              checked={entry.currentlyWorkHere}
              onCheckedChange={(checked) =>
                handleInputChange("currentlyWorkHere", checked)
              }
            />
            <Label htmlFor={`current-${entry.id}`} className="text-sm">
              I currently work here
            </Label>
          </div>

          <div className="space-y-2">
  <Label className="text-sm font-medium">Description</Label>
  <div className="dark:text-black"> 
    <RichTextEditor
      content={entry.description}
      onChange={(content) => handleInputChange("description", content)}
    />
  </div>
</div>
        </div>
      )}
    </div>
  );
}