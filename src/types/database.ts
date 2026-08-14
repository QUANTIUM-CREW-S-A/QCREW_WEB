/**
 * Tipos de la base de datos de Supabase.
 *
 * Verificado contra el esquema real. Se mantiene a mano a proposito: las
 * columnas status / priority / sender son `text` con CHECK constraint, asi
 * que los tipos generados las dan como `string`. Aqui las estrechamos a
 * uniones literales para que TypeScript detecte valores invalidos.
 *
 * Si cambias el esquema, compara con:
 *   supabase gen types typescript --project-id cthrohfmggekiepznfyh
 */

export type TestimonialStatusRow = 'pending' | 'approved' | 'rejected';
export type ConversationStatusRow = 'unread' | 'read' | 'responded';
export type PriorityRow = 'low' | 'medium' | 'high' | 'urgent';
export type SenderRow = 'client' | 'admin';

// Ojo: deben ser `type` y no `interface`. Un interface no es asignable a
// Record<string, unknown>, y supabase-js exige eso para inferir Insert/Update.
export type TestimonialRow = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  category: string;
  image_url: string;
  status: TestimonialStatusRow;
  featured: boolean;
  admin_notes: string;
  approved_at: string | null;
  approved_by: string;
  created_at: string;
  updated_at: string;
}

export type ConversationRow = {
  id: string;
  user_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: ConversationStatusRow;
  priority: PriorityRow;
  tags: string[];
  notes: string;
  last_message: string;
  created_at: string;
  updated_at: string;
}

export type MessageRow = {
  id: string;
  conversation_id: string;
  text: string;
  sender: SenderRow;
  created_at: string;
}

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export interface Database {
  // Permite que createClient infiera las opciones correctas de PostgREST
  __InternalSupabase: {
    PostgrestVersion: '14.15';
  };
  public: {
    Tables: {
      testimonials: Table<TestimonialRow>;
      conversations: Table<ConversationRow>;
      messages: Table<MessageRow>;
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: {
        Args: never;
        Returns: boolean;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
