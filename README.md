# SIAMI UNRIKA — Preview GitHub Pages

Preview statis untuk menguji alur SIAMI sebelum backend Hostinger dibuat.

## Penting
- Data preview disimpan di `localStorage` browser.
- Untuk menguji perpindahan Admin → Auditee → Auditor, gunakan browser dan domain GitHub Pages yang sama.
- Ini bukan sistem multi-user final. Login aman, database, upload file sungguhan, permission, dan audit trail server akan dibuat pada backend Hostinger.
- Mulai dari `index.html`.

## Isolasi data
Versi GitHub Preview memakai key `siami_preview_*`, sehingga tidak menimpa data versi GitHub SIAMI lama pada browser yang sama.


## Master 25 Unit
Daftar unit audit AMI 2026 sudah dimuat otomatis pada `preview.js` dan tetap dapat diedit oleh Admin LPMI melalui `master-unit.html`.

## Versi 6 — 26 Auditee & Dua Form 1b
- 26 auditee: 20 program studi/program + 6 unit pendukung.
- Program studi/program: Form 1b 59 butir.
- Unit pendukung: Form 1b 25 butir.
- Sistem Informasi = Program Studi, Fakultas Teknik.
- Puskom = Unit Pendukung.
- Jenis Form 1b dipilih otomatis berdasarkan Master Auditee.
