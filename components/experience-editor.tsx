"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExperienceEntry } from "@/components/experience-entry";
import { Plus, Briefcase, Eye, HelpCircle, Trash2, MoveVertical, Upload } from "lucide-react";
import type { ExperienceEntry as ExperienceEntryType } from "@/lib/types";
import { JsonUpload } from "@/components/json-upload";
import { ThemeToggle } from "@/components/theme-toggle";

const createNewEntry = (): ExperienceEntryType => ({
  id: crypto.randomUUID(),
  companyName: "",
  jobTitle: "",
  location: "",
  country: "",
  startDate: "",
  endDate: "",
  currentlyWorkHere: false,
  description: "",
});

export function ExperienceEditor() {
  const [entries, setEntries] = useState<ExperienceEntryType[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, createNewEntry()]);
  };

  const handleUpdateEntry = (updatedEntry: ExperienceEntryType) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const text = await file.text();
      const json = JSON.parse(text);
      

      const processedEntries = Array.isArray(json) ? json.map(entry => ({
        ...entry,
        id: entry.id || crypto.randomUUID()
      })) : [];
      
      setEntries(processedEntries);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
     
    <div className="max-w-3xl mx-auto p-6">
      
      <div className="bg-background rounded-xl shadow-sm border">
      
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
              <div>
                <h2 className="text-2xl font-semibold">Professional Experience</h2>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">PREMIUM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <JsonUpload onUpload={handleFileUpload} isUploading={isUploading} />
              <Button variant="ghost" size="icon">
                <MoveVertical className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
              
              <ThemeToggle />
            </div>
          </div>

          <Button onClick={handleAddEntry} className="w-full justify-center py-6 text-base">
            <Plus className="h-5 w-5 mr-2" />
            Add Experience
          </Button>
        </div>

        <div className="divide-y divide-border">
          {entries.map((entry) => (
            <ExperienceEntry
              key={entry.id}
              entry={entry}
              onUpdate={handleUpdateEntry}
              onDelete={handleDeleteEntry}
            />
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground  mb-4 ">
              Add your work experience to build your resume
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleAddEntry} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Manually
              </Button>
              <JsonUpload onUpload={handleFileUpload} isUploading={isUploading} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import from JSON
              </JsonUpload>
            </div>
          </div>
        )}
         
      </div>
     
    </div>
  
    
    
  );
}