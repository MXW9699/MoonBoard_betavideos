const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxwlffbkwejpeyretvut.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4d2xmZmJrd2VqcGV5cmV0dnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MTA0NzUsImV4cCI6MjAxNDk4NjQ3NX0.Lir93Tv8EYYo19SxqW123tGkxe3EBRm2TI3yb6zN9GQ';
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

module.exports = supabase;
