/**
 * Parser CSV minimo, sin dependencias. Soporta campos entre comillas con
 * comas y comillas escapadas (""), que es lo que exporta cualquier planilla
 * (Excel, Google Sheets, Numbers) al guardar como CSV.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  // Normaliza saltos de linea de Windows antes de parsear.
  const input = text.replace(/\r\n/g, '\n');

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  // Ultimo campo/fila si el archivo no termina en salto de linea.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

export interface ProductCsvRow {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const EXPECTED_HEADERS = ['name', 'category', 'description', 'price', 'stock', 'image_url'];

/**
 * Convierte un CSV con encabezado `name,category,description,price,stock,image_url`
 * en filas de producto listas para insertar. Lanza si falta alguna columna
 * obligatoria o hay una fila con datos invalidos, indicando el numero de
 * linea para que sea facil de corregir en la planilla.
 */
export function parseProductsCsv(text: string): ProductCsvRow[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const missing = EXPECTED_HEADERS.filter((h) => !header.includes(h));
  if (missing.length > 0) {
    throw new Error(`Faltan columnas en el CSV: ${missing.join(', ')}`);
  }

  const idx = Object.fromEntries(EXPECTED_HEADERS.map((h) => [h, header.indexOf(h)]));

  return rows.slice(1).map((cells, i) => {
    const lineNumber = i + 2; // +1 por el encabezado, +1 por indice base 1
    const name = (cells[idx.name] ?? '').trim();
    if (!name) {
      throw new Error(`Línea ${lineNumber}: falta el nombre del producto`);
    }

    const price = Number((cells[idx.price] ?? '').trim());
    if (Number.isNaN(price) || price < 0) {
      throw new Error(`Línea ${lineNumber}: precio inválido ("${cells[idx.price]}")`);
    }

    const stock = Number((cells[idx.stock] ?? '0').trim() || '0');
    if (Number.isNaN(stock) || stock < 0) {
      throw new Error(`Línea ${lineNumber}: stock inválido ("${cells[idx.stock]}")`);
    }

    return {
      name,
      category: (cells[idx.category] ?? '').trim(),
      description: (cells[idx.description] ?? '').trim(),
      price,
      stock: Math.floor(stock),
      imageUrl: (cells[idx.image_url] ?? '').trim(),
    };
  });
}
