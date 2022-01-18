cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs",
    "exports": {
        "default" : "bundle.js"
    }
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module",
    "exports": {
        "default" : "bundle.js"
    }
}
!EOF