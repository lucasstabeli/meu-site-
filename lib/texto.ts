/** Remove caracteres de controle (inclui quebras de linha) e espaços repetidos. */
export function singleLine(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Mantém quebras de linha, mas tira outros caracteres de controle. */
export function multiLine(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

/** "Barbearia do Zé" -> "barbeariadoze" (só a-z e 0-9). */
export function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
