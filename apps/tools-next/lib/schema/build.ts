import { z, ZodTypeAny, ZodObject } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Parse a single line like "name: string", "age: number min=0 max=120"
function parseLine(line: string): [string, string, string[]] | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const [fieldPart, ...rest] = trimmed.split(":");
  if (!rest.length) return null;

  const key = fieldPart.trim();
  const [typeRaw, ...constraints] = rest.join(":").split(/\s+/);
  return [key, typeRaw.trim(), constraints];
}

// Build a Zod schema for a single field
function buildFieldSchema(typeRaw: string, constraints: string[]): ZodTypeAny {
  switch (typeRaw.toLowerCase()) {
    case "string":
      return z.string();
    case "email":
      return z.string().email();
    case "number": {
      let schema = z.number();
      constraints.forEach((c) => {
        if (c.startsWith("min=")) schema = schema.min(Number(c.split("=")[1]));
        if (c.startsWith("max=")) schema = schema.max(Number(c.split("=")[1]));
      });
      return schema;
    }
    case "boolean":
      return z.boolean();
    case "enum": {
      const inside = constraints[0]?.match(/\(([^)]+)\)/);
      if (inside) {
        const values = inside[1].split("|").map((s) => s.trim());
        return z.enum(values as [string, ...string[]]);
      }
      return z.string();
    }
    default:
      return z.string();
  }
}

/**
 * Build a Zod schema object from a spec string
 */
export function buildZodFromSpec(spec: string): ZodObject<any> {
  const shape: Record<string, ZodTypeAny> = {};

  spec
    .split("\n")
    .map(parseLine)
    .filter((x): x is [string, string, string[]] => x !== null)
    .forEach(([key, typeRaw, constraints]) => {
      let schema = buildFieldSchema(typeRaw, constraints);

      if (constraints.includes("optional")) schema = schema.optional();

      shape[key] = schema;
    });

  return z.object(shape);
}

/**
 * Convert a Zod schema into JSON Schema
 */
export function toJsonSchema(zodSchema: ZodTypeAny) {
  return zodToJsonSchema(zodSchema, "GeneratedSchema");
}
