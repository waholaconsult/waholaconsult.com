const fs = require('fs');
let content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Add import
content = content.replace(
  'import { useState, useEffect } from "react";',
  'import { useState, useEffect } from "react";\nimport { UserButton } from "@clerk/nextjs";'
);

// Remove state variables
content = content.replace(/const \[password, setPassword\] = useState\(""\);\n/, '');
content = content.replace(/const \[isAuthenticated, setIsAuthenticated\] = useState\(false\);\n/, '');
content = content.replace(/const \[passkey\] = useState\("wahola2026"\);\n/, '');
content = content.replace(/const \[error, setError\] = useState\(""\);\n/, '');

// Remove handleLogin
content = content.replace(/const handleLogin = [\s\S]*?};\n/, '');

// Remove useEffect for auth
content = content.replace(/useEffect\(\(\) => {\n\s*const isAuthed = sessionStorage\.getItem\("admin_auth"\) === "true";\n\s*if \(isAuthed\) {\n\s*setIsAuthenticated\(true\);\n\s*}\n\s*}, \[\]\);\n/, '');

// Update fetchData
content = content.replace(/if \(!isAuthenticated\) return;\n/, '');
content = content.replace(/\?passkey=\$\{passkey\}/g, '');
content = content.replace(/, \[isAuthenticated\]\)/g, ', [])');

// Update handlers (remove passkey from body)
content = content.replace(/passkey,\n/g, '');
content = content.replace(/passkey \}\)/g, '})');
content = content.replace(/&passkey=\$\{passkey\}/g, '');

// Remove login screen
content = content.replace(/if \(!isAuthenticated\) {[\s\S]*?return \([\s\S]*?<\/[a-z]+>\n\s*\);\n\s*}\n/, '');

// Replace logout button with UserButton
content = content.replace(
  /<button[\s\S]*?Log Out\n\s*<\/button>/,
  '<UserButton />'
);

fs.writeFileSync('app/admin/page.tsx', content);
