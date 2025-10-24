const supabaseUrl = 'https://bfdsyleyhyeuvxkzrlck.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZHN5bGV5aHlldXZ4a3pybGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMzA4MTIsImV4cCI6MjA3MzkwNjgxMn0.NZKdzZkBcDJvUMvcHexjPxyDF7Qj-WddtoETZlZDDmk';

const { createClient } = window.supabase;

export const supabase = createClient(supabaseUrl, supabaseKey);