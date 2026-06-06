const fs = require('fs');

const updateRoute = (path) => {
  let content = fs.readFileSync(path, 'utf8');
  
  // Add Clerk import if not present
  if (!content.includes('@clerk/nextjs/server')) {
    content = 'import { auth } from "@clerk/nextjs/server";\n' + content;
  }

  // Remove passkey extraction and checks for GET requests
  content = content.replace(/const searchParams = req\.nextUrl\.searchParams;\n\s*const passkey = searchParams\.get\("passkey"\);\n\s*if \(passkey !== "wahola2026"\) {\n\s*return NextResponse\.json\(\{ error: "Unauthorized" \}, \{ status: 401 \}\);\n\s*}/g, 'const { userId } = await auth();\n    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });');

  // Replace passkey in POST/PUT/DELETE
  // E.g., const { ..., passkey } = await req.json();
  // if (passkey !== "wahola2026") ...
  content = content.replace(/const \{([^}]+)passkey,?([^}]*)\} = await req\.json\(\);/g, 'const {$1$2} = await req.json();');
  content = content.replace(/if \(passkey !== "wahola2026"\) {\n\s*return NextResponse\.json\(\{ error: "Unauthorized" \}, \{ status: 401 \}\);\n\s*}/g, 'const { userId } = await auth();\n    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });');
  content = content.replace(/if \(passkey !== "wahola2026"\) return NextResponse\.json\(\{ error: "Unauthorized" \}, \{ status: 401 \}\);/g, 'const { userId } = await auth();\n    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });');

  fs.writeFileSync(path, content);
}

const routes = [
  'app/api/analytics/route.ts',
  'app/api/leads/route.ts',
  'app/api/subscribers/route.ts',
  'app/api/blog/route.ts'
];

routes.forEach(updateRoute);
