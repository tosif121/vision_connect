import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProject } from '@/lib/apiUtils';

type CreateProjectFormProps = {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateProjectForm({ isFormOpen, setIsFormOpen }: CreateProjectFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    equity: '',
    industry: '',
    status: 'Active',
    skills: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    equity: '',
    industry: '',
    status: '',
    skills: '',
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      if ((event.target as HTMLElement).classList.contains('backdrop')) {
        setIsFormOpen(false);
      }
    }
  };

  useEffect(() => {
    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, industry: value }));
    setErrors((prevErrors) => ({ ...prevErrors, industry: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      equity: '',
      industry: '',
      status: '',
      skills: '',
    };

    if (!formData.title.trim()) newErrors.title = 'Project title is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (
      !formData.equity.trim() ||
      isNaN(Number(formData.equity)) ||
      Number(formData.equity) <= 0 ||
      Number(formData.equity) > 100
    ) {
      newErrors.equity = 'Equity must be a number between 1 and 100.';
    }
    if (!formData.industry.trim()) newErrors.industry = 'Please select an industry.';
    if (!formData.skills.trim()) newErrors.skills = 'Required skills are required.';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const response = await createProject(formData);
      toast.success(response.message);
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop bg-black/80 backdrop-blur-sm">
      <Card ref={formRef} className="relative w-full max-w-xl mx-4 my-8 shadow-2xl">
        <button
          onClick={() => setIsFormOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Create New Project</CardTitle>
          <CardDescription className="text-base">Share your idea with potential co-founders</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Project Title</Label>
              <Input
                name="title"
                placeholder="Enter project title"
                className="h-11"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Description</Label>
              <textarea
                name="description"
                className="w-full p-3 rounded-lg border min-h-[120px] resize-y focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Describe your project idea..."
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Equity Offer (%)</Label>
                <Input
                  name="equity"
                  type="number"
                  placeholder="20"
                  className="h-11"
                  value={formData.equity}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.equity && <p className="text-red-500 text-sm">{errors.equity}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Industry</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="health">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Required Skills</Label>
                <Input
                  name="skills"
                  placeholder="e.g. React, Node.js, Python"
                  className="h-11"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="active"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="inactive"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="inactive">Inactive</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="h-11 text-base font-medium">
                Create Project
              </Button>
              <Button
                variant="outline"
                className="w-max h-11 text-base font-medium"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
