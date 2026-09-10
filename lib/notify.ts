import { toast } from "@/components/ui/toast";

interface NotifyOptions {
  description?: string;
  action?: { label: string; href: string };
  duration?: number;
}

type ToastType = "success" | "info" | "warning" | "error";

function push(type: ToastType, title: string, opts: NotifyOptions = {}) {
  return toast.add({
    title,
    description: opts.description,
    type,
    timeout: opts.duration ?? 4200,
    data: opts.action ? { action: opts.action } : undefined,
  });
}

export const notify = {
  success: (title: string, opts?: NotifyOptions) => push("success", title, opts),
  info: (title: string, opts?: NotifyOptions) => push("info", title, opts),
  warning: (title: string, opts?: NotifyOptions) => push("warning", title, opts),
  error: (title: string, opts?: NotifyOptions) => push("error", title, opts),
};
