import { atom } from "nanostores";
import type { DisplayKind } from "@/lib/displays";

export const display = atom<DisplayKind>("default");
