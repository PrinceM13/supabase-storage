const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseApiKey: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";
const supabaseBucket: string = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "";
const supabaseFilePath: string = process.env.NEXT_PUBLIC_SUPABASE_FILE_PATH || "";

const config = {
  supabase: {
    url: supabaseUrl,
    apiKey: supabaseApiKey,
    bucket: supabaseBucket,
    filePath: supabaseFilePath
  }
};

export default config;
