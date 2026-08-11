# SIAMI UNRIKA — Preview GitHub Pages

Preview statis untuk menguji alur SIAMI sebelum backend Hostinger dibuat.

## Penting
- Data preview disimpan di `localStorage` browser.
- Untuk menguji perpindahan Admin → Auditee → Auditor, gunakan browser dan domain GitHub Pages yang sama.
- Ini bukan sistem multi-user final. Login aman, database, upload file sungguhan, permission, dan audit trail server akan dibuat pada backend Hostinger.
- Mulai dari `index.html`.

## Isolasi data
Versi GitHub Preview memakai key `siami_preview_*`, sehingga tidak menimpa data versi GitHub SIAMI lama pada browser yang sama.
