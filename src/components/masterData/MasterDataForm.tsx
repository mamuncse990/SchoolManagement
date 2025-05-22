import { FC, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { masterDataConfigs } from "@/app/masterSetupConfig/masterDataConfig";
import { MasterDataItem } from "@/app/masterDataTypes/masterData";
import { toast } from "react-toastify";
import Image from "next/image";

interface MasterDataFormProps {
  id?: string;
  initialData?: MasterDataItem | null;
  table?: string;
}

const MasterDataForm: FC<MasterDataFormProps> = ({
  id,
  initialData,
  table: tableFromProps,
}) => {
  const router = useRouter();
  const params = useParams();
  const table = tableFromProps || (params?.table as string);
  const [formData, setFormData] = useState<Record<string, any>>(
    initialData || {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const config = table ? masterDataConfigs[table as string] : null;
  const [grades, setGrades] = useState<Array<{ id: number; level: number }>>(
    []
  );
  const [supervisors, setSupervisors] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [lessons, setLessons] = useState<
    Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    if (initialData) {
      // Calculate initial duration if start and end times exist
      const newData = { ...initialData };
      if (newData.startTime && newData.endTime && config?.fields.find(f => f.name === 'duration')) {
        newData.duration = calculateDuration(newData.startTime, newData.endTime);
      }
      setFormData(newData);
    } else if (id && config) {
      fetchItem();
    }
  }, [id, config, initialData]);

  useEffect(() => {
    if (table === "class") {
      // Fetch grades
      fetch("/api/grades")
        .then((res) => res.json())
        .then((data) => {
          setGrades(data);
          // Update the gradeId field options
          if (config) {
            const gradeField = config.fields.find((f) => f.name === "gradeId");
            if (gradeField) {
              gradeField.options = data.map(
                (grade: { id: number; level: number }) => ({
                  label: `Grade ${grade.level}`,
                  value: grade.id,
                })
              );
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching grades:", err);
          toast.error("Failed to load grades");
        });

      // Fetch supervisors (teachers)
      fetch("/api/teachers")
        .then((res) => res.json())
        .then((data) => {
          setSupervisors(data);
          // Update the supervisorId field options
          if (config) {
            const supervisorField = config.fields.find(
              (f) => f.name === "supervisorId"
            );
            if (supervisorField) {
              supervisorField.options = data.map(
                (teacher: { id: string; name: string }) => ({
                  label: teacher.name,
                  value: teacher.id,
                })
              );
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching supervisors:", err);
          toast.error("Failed to load supervisors");
        });
    }
    if (table === "Exam") {
      // Fetch grades
      fetch("/api/lessons")
        .then((res) => res.json())
        .then((data) => {
          setLessons(data);
          // Update the gradeId field options
          if (config) {
            const lessonField = config.fields.find((f) => f.name === "lessonId");
            if (lessonField) {
              lessonField.options = data.map(
                (lesson: { id: number; name: number }) => ({
                  label: `${lesson.name}`,
                  value: lesson.id,
                })
              );
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching grades:", err);
          toast.error("Failed to load grades");
        });
    }
  }, [table, config]);

  const fetchItem = async () => {
    try {
      setError("");
      const response = await fetch(`/api/master-data/${table}/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch data");
      }      const data = await response.json();
      // Calculate duration if start and end times exist
      if (data.startTime && data.endTime && config?.fields.find(f => f.name === 'duration')) {
        data.duration = calculateDuration(data.startTime, data.endTime);
      }
      setFormData(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error fetching item";
      setError(message);
      toast.error(message);
      console.error("Error fetching item:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");    try {
      const url = id
        ? `/api/master-data/${table}/${id}`
        : `/api/master-data/${table}`;

      // Pre-process form data
      let processedData = { ...formData };
      if (table === 'Exam') {
        // Make sure dates are in ISO format
        if (processedData.startTime) {
          processedData.startTime = new Date(processedData.startTime).toISOString();
        }
        if (processedData.endTime) {
          processedData.endTime = new Date(processedData.endTime).toISOString();
        }
        // Remove duration as it's a calculated field
        delete processedData.duration;
      }

      console.log("Submitting data:", { table, id, processedData });

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data");
      }

      toast.success(
        `${config?.label} ${id ? "updated" : "created"} successfully!`
      );
      router.push(`/dashboard/masterSetup/master-data/${table}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error saving item";
      setError(message);
      toast.error(message);
      console.error("Error saving item:", error);
    } finally {
      setLoading(false);
    }
  };
  const calculateDuration = (start: string, end: string): string => {
    if (!start || !end) return '';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMinutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Calculate duration if start or end time changes
      if ((name === 'startTime' || name === 'endTime') && config?.fields.find(f => f.name === 'duration')) {
        const duration = calculateDuration(newData.startTime, newData.endTime);
        return { ...newData, duration };
      }
      
      return newData;
    });
  };

  if (!config) return null;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {config.fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "datetime" ? (
            <input
              type="datetime-local"
              name={field.name}
              value={formData[field.name] ? new Date(formData[field.name]).toISOString().slice(0, 16) : ""}
              onChange={handleChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              readOnly={field.readOnly}
              disabled={field.readOnly}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                field.readOnly ? 'bg-gray-100' : ''
              }`}
            />
          )}
        </div>
      ))}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
        >
          <Image src="/save.png" alt="Save" width={20} height={20} />
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(`/dashboard/masterSetup/master-data/${table}`)
          }
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
        >
          <Image src="/cancel.png" alt="Cancel" width={20} height={20} />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MasterDataForm;
