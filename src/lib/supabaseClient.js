import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jfmubwoqvbkpkcjocvmo.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbXVid29xdmJrcGtjam9jdm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzgyMjgsImV4cCI6MjEwNjExNDIyOH0.6dDUtiKOM3g3SfKPZDrYHArsdhlYFoobNaSehIKdmko";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
