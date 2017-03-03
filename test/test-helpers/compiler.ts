import {
  precompile as glimmerPrecompile,
  PrecompileOptions
} from "@glimmer/compiler";
import { 
  TemplateJavascript,
  TemplateMeta as GlimmerTemplateMeta
} from "@glimmer/wire-format";

export interface TemplateMeta extends GlimmerTemplateMeta {
  specifier: string;
}

export function precompile(template: string, options: PrecompileOptions<TemplateMeta>): TemplateJavascript {
  return glimmerPrecompile(template, options);
}
