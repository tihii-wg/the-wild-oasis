import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qiaysrzbsxpcwybjzdwd.supabase.co";
const supabaseKey =
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYXlzcnpic3hwY3d5Ymp6ZHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMDU5MTksImV4cCI6MjA1MzU4MTkxOX0
    .Mng1aX4KzvFQE6aLwNHEuI3xuTxfPFIhu1vi9NKy - _0;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
