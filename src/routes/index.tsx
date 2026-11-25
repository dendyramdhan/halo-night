import { createFileRoute } from "@tanstack/react-router";
import { HaloPage } from "@/components/halo/page";

export const Route = createFileRoute("/")({ component: HaloPage });
